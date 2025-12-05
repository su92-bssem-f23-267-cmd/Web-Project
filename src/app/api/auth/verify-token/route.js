import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request) {
  try {
    const user = getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        userId: user.userId,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Token verification failed' },
      { status: 401 }
    )
  }
}
