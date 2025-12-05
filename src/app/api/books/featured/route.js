import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      where: {
        status: 'active',
        featured: true
      },
      take: 8,
      orderBy: { rating: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        author: true,
        category: true,
        price: true,
        discountPrice: true,
        coverImage: true,
        rating: true
      }
    })

    return NextResponse.json({
      success: true,
      data: books
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured books' },
      { status: 500 }
    )
  }
}
