import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { slug } = params

    const book = await prisma.book.findUnique({
      where: { slug },
      include: {
        categoryRel: true,
        authorRel: true,
      }
    })

    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: book
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch book' },
      { status: 500 }
    )
  }
}
