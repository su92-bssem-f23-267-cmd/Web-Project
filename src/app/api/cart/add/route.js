import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(request) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { bookId, quantity = 1 } = await request.json()

    const book = await prisma.book.findUnique({ where: { id: bookId } })
    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      )
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: user.userId }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.userId }
      })
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_bookId: {
          cartId: cart.id,
          bookId: bookId
        }
      }
    })

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity,
          subtotal: book.price * newQuantity
        }
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          bookId: bookId,
          quantity: quantity,
          price: book.price,
          subtotal: book.price * quantity
        }
      })
    }

    const items = await prisma.cartItem.findMany({
      where: { cartId: cart.id }
    })

    const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    await prisma.cart.update({
      where: { id: cart.id },
      data: { totalAmount, itemCount }
    })

    return NextResponse.json({
      success: true,
      message: 'Book added to cart',
      data: { cartId: cart.id, itemCount, totalAmount }
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add to cart' },
      { status: 500 }
    )
  }
}
