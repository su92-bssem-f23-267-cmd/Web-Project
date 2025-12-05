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

    const [
      totalUsers,
      totalBooks,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
      topBooks,
      lowStockBooks
    ] = await Promise.all([
      prisma.user.count(),
      prisma.book.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: 'paid' }
      }),
      prisma.order.count({ where: { orderStatus: 'pending' } }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { fullName: true, email: true } },
          items: true
        }
      }),
      prisma.book.findMany({
        take: 5,
        orderBy: { reviewCount: 'desc' },
        select: {
          id: true,
          title: true,
          coverImage: true,
          price: true,
          rating: true,
          reviewCount: true
        }
      }),
      prisma.book.findMany({
        where: { stockQuantity: { lte: 10 } },
        take: 10,
        select: {
          id: true,
          title: true,
          stockQuantity: true,
          coverImage: true
        }
      })
    ])

    const last7Days = new Date()
    last7Days.setDate(last7Days.getDate() - 7)

    const salesGraph = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: last7Days },
        paymentStatus: 'paid'
      },
      _sum: { totalAmount: true },
      _count: true
    })

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalBooks,
          totalOrders,
          totalRevenue: totalRevenue._sum.totalAmount || 0,
          pendingOrders
        },
        recentOrders: recentOrders.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          customerName: order.user.fullName,
          customerEmail: order.user.email,
          totalAmount: order.totalAmount,
          itemCount: order.items.length,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          createdAt: order.createdAt
        })),
        topBooks,
        lowStockBooks,
        salesGraph: salesGraph.map(item => ({
          date: item.createdAt,
          revenue: item._sum.totalAmount,
          orders: item._count
        }))
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
