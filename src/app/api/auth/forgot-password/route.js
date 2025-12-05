import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request) {
  try {
    const { email } = await request.json()

    const user = await prisma.user.findUnique({ where: { email } })
    
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If email exists, password reset link has been sent'
      })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetExpire = new Date(Date.now() + 3600000)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetExpire
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Password reset link sent to your email',
      data: { resetToken }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
