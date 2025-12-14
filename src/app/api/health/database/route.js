import { NextResponse } from 'next/server'
import { prisma, testDatabaseConnection } from '@/lib/prisma'

export async function GET() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          success: false,
          error: 'DATABASE_URL environment variable is not set',
          message: 'Please set DATABASE_URL in Vercel environment variables'
        },
        { status: 500 }
      )
    }

    // Test database connection
    const connectionTest = await testDatabaseConnection()
    
    if (!connectionTest.success) {
      return NextResponse.json(
        {
          success: false,
          error: connectionTest.message,
          details: connectionTest.error,
          tip: 'Check your DATABASE_URL in Vercel environment variables. Make sure it includes ?sslmode=require for Neon database.'
        },
        { status: 500 }
      )
    }

    // Try a simple query
    const userCount = await prisma.user.count()

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      database: {
        connected: true,
        users: userCount,
        url: process.env.DATABASE_URL ? 'Set (hidden for security)' : 'Not set'
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        message: error.message,
        tip: 'Verify DATABASE_URL is correct in Vercel environment variables'
      },
      { status: 500 }
    )
  }
}

