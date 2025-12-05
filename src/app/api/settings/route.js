import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst()

    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Settings not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        siteName: settings.siteName,
        tagline: settings.tagline,
        logo: settings.logo,
        contact: settings.contact,
        social: settings.social,
        about: settings.about
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}
