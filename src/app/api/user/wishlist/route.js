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

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.userId },
      include: {
        books: {
          select: {
            id: true,
            title: true,
            author: true,
            price: true,
            coverImage: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: wishlist?.books || []
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}
