import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminEmail = 'admin@sanctuarystudies.org'
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin User',
        role: 'ADMIN',
      }
    })
    console.log('Admin user created:', adminEmail)
    console.log('Password: password (change this in production!)')
  } else {
    console.log('Admin user already exists')
  }

  // Create some sample donations for testing
  await prisma.donation.createMany({
    data: [
      {
        amount: 2500,
        frequency: 'ONE_TIME',
        method: 'STRIPE',
        status: 'SUCCEEDED',
        donorName: 'John Doe',
        donorEmail: 'john@example.com',
        externalId: 'pi_test_123',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
      {
        amount: 5000,
        frequency: 'MONTHLY',
        method: 'PAYPAL',
        status: 'SUCCEEDED',
        donorName: 'Jane Smith',
        donorEmail: 'jane@example.com',
        externalId: 'paypal_order_456',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        amount: 1000,
        frequency: 'ONE_TIME',
        method: 'STRIPE',
        status: 'SUCCEEDED',
        isAnonymous: true,
        externalId: 'pi_test_789',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
    ]
  })

  console.log('Sample donations created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })