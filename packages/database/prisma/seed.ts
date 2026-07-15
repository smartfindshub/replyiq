import { PrismaClient, OrganizationStatus, UserRole, UserStatus, BusinessStatus, BusinessDomainStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const organization = await prisma.organization.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'ReplyIQ Corp',
      status: OrganizationStatus.ACTIVE,
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: 'jan@replyiq.com' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      organizationId: organization.id,
      name: 'Janardhan Reddy',
      email: 'jan@replyiq.com',
      role: UserRole.OWNER,
      status: UserStatus.ACTIVE,
    },
  });

  const business = await prisma.business.upsert({
    where: { id: '00000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000003',
      organizationId: organization.id,
      name: 'ReplyIQ',
      industry: 'SaaS / AI',
      status: BusinessStatus.ACTIVE,
    },
  });

  const domain = await prisma.businessDomain.upsert({
    where: { domain: 'replyiq.com' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000004',
      businessId: business.id,
      domain: 'replyiq.com',
      isPrimary: true,
      status: BusinessDomainStatus.VERIFIED,
      verifiedAt: new Date(),
    },
  });

  console.log('Seeded:');
  console.log(`  Organization: ${organization.name} (${organization.id})`);
  console.log(`  User:         ${owner.name} (${owner.email})`);
  console.log(`  Business:     ${business.name} (${business.id})`);
  console.log(`  Domain:       ${domain.domain}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
