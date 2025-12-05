import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function DELETE(request, { params }) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { itemId } = params

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId }
    })

    await prisma.cartItem.delete({
      where: { id: itemId }
    })

    const items = await prisma.cartItem.findMany({
      where: { cartId: item.cartId }
    })

    const totalAmount = items.reduce((sum, i) => sum + i.subtotal, 0)
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

    await prisma.cart.update({
      where: { id: item.cartId },
      data: { totalAmount, itemCount }
    })

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to remove item' },
      { status: 500 }
    )
  }
}
