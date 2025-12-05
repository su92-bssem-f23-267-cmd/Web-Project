import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const category = searchParams.get('category')

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query required' },
        { status: 400 }
      )
    }

    const where = {
      status: 'active',
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { author: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ],
      ...(category && { category })
    }

    const results = await prisma.book.findMany({
      where,
      take: 20,
      select: {
        id: true,
        title: true,
        slug: true,
        author: true,
        price: true,
        coverImage: true,
        category: true
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        results,
        count: results.length
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    )
  }
}
