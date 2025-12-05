import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request, { params }) {
  try {
    const { id } = params

    const [reviews, avgRating] = await Promise.all([
      prisma.review.findMany({
        where: { bookId: id, isApproved: true },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { fullName: true, profilePicture: true }
          }
        }
      }),
      prisma.review.aggregate({
        where: { bookId: id, isApproved: true },
        _avg: { rating: true },
        _count: true
      })
    ])

    return NextResponse.json({
      success: true,
      data: {
        reviews: reviews.map(r => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          userName: r.user.fullName,
          createdAt: r.createdAt
        })),
        averageRating: avgRating._avg.rating || 0,
        totalReviews: avgRating._count
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request, { params }) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params
    const { rating, comment } = await request.json()

    await prisma.review.create({
      data: {
        bookId: id,
        userId: user.userId,
        rating,
        comment: comment || ''
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Review added successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add review' },
      { status: 500 }
    )
  }
}
