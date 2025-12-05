import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: user.userId },
      include: {
        items: {
          include: {
            book: {
              select: {
                id: true,
                title: true,
                coverImage: true,
                price: true,
                inStock: true
              }
            }
          }
        }
      }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.userId },
        include: { items: true }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        cartId: cart.id,
        items: cart.items.map(item => ({
          id: item.id,
          bookId: item.bookId,
          title: item.book.title,
          image: item.book.coverImage,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal
        })),
        itemCount: cart.itemCount,
        totalAmount: cart.totalAmount
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}
