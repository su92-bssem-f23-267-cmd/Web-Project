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

    const { items, shippingAddress, paymentMethod } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      )
    }

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shippingCost = 200
    const totalAmount = subtotal + shippingCost

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    const order = await prisma.order.create({
      data: {
        userId: user.userId,
        orderNumber,
        subtotal,
        shippingCost,
        totalAmount,
        paymentMethod,
        shippingAddress,
        items: {
          create: items.map(item => ({
            bookId: item.bookId,
            title: item.title,
            image: item.image || '',
            author: item.author || '',
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity
          }))
        }
      },
      include: { items: true }
    })

    await prisma.cart.deleteMany({
      where: { userId: user.userId }
    })

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus
      }
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
