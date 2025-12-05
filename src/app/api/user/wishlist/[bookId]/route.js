import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(request, { params }) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { bookId } = params

    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.userId }
    })

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: {
          userId: user.userId,
          bookIds: [bookId]
        }
      })
    } else {
      if (wishlist.bookIds.includes(bookId)) {
        return NextResponse.json(
          { success: false, error: 'Book already in wishlist' },
          { status: 409 }
        )
      }

      await prisma.wishlist.update({
        where: { id: wishlist.id },
        data: {
          bookIds: [...wishlist.bookIds, bookId]
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Book added to wishlist'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { bookId } = params

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.userId }
    })

    if (wishlist) {
      await prisma.wishlist.update({
        where: { id: wishlist.id },
        data: {
          bookIds: wishlist.bookIds.filter(id => id !== bookId)
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Book removed from wishlist'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}
