import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        displayOrder: true,
        _count: {
          select: { books: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: categories.map(cat => ({
        ...cat,
        bookCount: cat._count.books
      }))
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
