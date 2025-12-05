import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request) {
  try {
    const user = getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const [
      topSellingBooks,
      ordersByStatus,
      newUsersCount,
      recentOrders
    ] = await Promise.all([
      prisma.orderItem.groupBy({
        by: ['bookId', 'title'],
        _sum: { quantity: true },
        _count: true,
        orderBy: { _sum: { quantity: 'desc' } },
        take: 10
      }),
      prisma.order.groupBy({
        by: ['orderStatus'],
        _count: true
      }),
      prisma.user.count({
        where: { createdAt: { gte: startDate } }
      }),
      prisma.order.findMany({
        where: { createdAt: { gte: startDate } },
        orderBy: { createdAt: 'asc' },
        select: {
          createdAt: true,
          totalAmount: true,
          orderStatus: true
        }
      })
    ])

    const salesByDay = {}
    recentOrders.forEach(order => {
      const date = order.createdAt.toISOString().split('T')[0]
      if (!salesByDay[date]) {
        salesByDay[date] = { date, orders: 0, revenue: 0 }
      }
      salesByDay[date].orders++
      salesByDay[date].revenue += order.totalAmount
    })

    return NextResponse.json({
      success: true,
      data: {
        salesByDay: Object.values(salesByDay),
        topSellingBooks: topSellingBooks.map(item => ({
          bookId: item.bookId,
          title: item.title,
          totalSold: item._sum.quantity,
          orderCount: item._count
        })),
        ordersByStatus: ordersByStatus.map(item => ({
          status: item.orderStatus,
          count: item._count
        })),
        newUsersCount
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
