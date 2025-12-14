import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

// Prisma Client configuration for Vercel/serverless
const prismaClientOptions = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
}

// Create Prisma Client instance
export const prisma = globalForPrisma.prisma || new PrismaClient(prismaClientOptions)

// In development, reuse the same instance across hot reloads
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Connection test helper
export async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    return { success: true, message: 'Database connected successfully' }
  } catch (error) {
    console.error('Database connection error:', error.message)
    return { 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    }
  }
}
