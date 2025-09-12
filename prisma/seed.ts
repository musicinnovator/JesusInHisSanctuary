import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sanctuarystudies.org' },
    update: {},
    create: {
      email: 'admin@sanctuarystudies.org',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('Created admin user:', adminUser)

  // Create sample donations for testing
  const sampleDonation = await prisma.donation.create({
    data: {
      userId: adminUser.id,
      amountCents: 2500, // $25.00
      currency: 'USD',
      frequency: 'ONE_TIME',
      method: 'STRIPE',
      status: 'SUCCEEDED',
      isAnonymous: false,
      donorName: 'John Doe',
      donorEmail: 'john@example.com',
      message: 'Thank you for your wonderful educational resources!',
      externalId: 'pi_test_1234567890',
    },
  })

  console.log('Created sample donation:', sampleDonation)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })