import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function PUT(request, { params }) {
  try {
    const user = getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const { id } = params
    const { orderStatus, trackingNumber } = await request.json()

    const updateData = { orderStatus }
    
    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber
    }

    if (orderStatus === 'shipped') {
      updateData.shippedAt = new Date()
    } else if (orderStatus === 'delivered') {
      updateData.deliveredAt = new Date()
    }

    await prisma.order.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const { id } = params

    await prisma.order.delete({ where: { id } })

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete order' },
      { status: 500 }
    )
  }
}
