import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding templates...');

  const templates = [
    {
      name: 'Google Login',
      difficulty: 3,
      htmlContent: 'GoogleLogin',
      messageBody: 'Alert: Unrecognized device login attempt. Please verify your identity.'
    },
    {
      name: 'Meta (Facebook)',
      difficulty: 2,
      htmlContent: 'MetaLogin',
      messageBody: 'Your account will be suspended in 24 hours. Verify your account now.'
    },
    {
      name: 'Microsoft 365',
      difficulty: 3,
      htmlContent: 'MicrosoftLogin',
      messageBody: 'Your password requires immediate rotation to comply with security policy.'
    },
    {
      name: 'LinkedIn',
      difficulty: 2,
      htmlContent: 'LinkedInLogin',
      messageBody: 'You appeared in 14 new searches recently. View who is looking at your profile.'
    },
    {
      name: 'Apple ID',
      difficulty: 2,
      htmlContent: 'AppleLogin',
      messageBody: 'A purchase was made from an unrecognized device. Cancel transaction here.'
    },
    {
      name: 'Sony PlayStation',
      difficulty: 1,
      htmlContent: 'SonyLogin',
      messageBody: 'Your PS Plus subscription failed to renew.'
    },
    {
      name: 'M365 Defender (Whaling)',
      difficulty: 3,
      htmlContent: 'WhalingLogin',
      messageBody: 'Action Required: Your Executive Wire-Transfer Review is pending signature.'
    }
  ];

  // Upsert to prevent duplicate seeds on multiple runs
  const createdTemplates = [];
  for (const template of templates) {
    const existing = await prisma.template.findFirst({
      where: { name: template.name }
    });

    let t;
    if (!existing) {
      t = await prisma.template.create({
        data: template,
      });
      console.log(`Created template: ${template.name}`);
    } else {
      t = existing;
      console.log(`Template already exists: ${template.name}`);
    }
    createdTemplates.push(t);
  }

  // Seed some dummy campaigns for each vector
  const vectors = [
    { name: 'Phishing Campaign', type: 'EMAIL_PHISHING', targets: ['john@company.com', 'alice@company.com'] },
    { name: 'Smishing Test', type: 'SMISHING', targets: ['+1-555-0101', '+1-555-0102'] },
    { name: 'Vishing Internal', type: 'VISHING', targets: ['+1-555-9999'] },
    { name: 'Exec Whaling', type: 'WHALING', targets: ['cfo@company.com'] },
  ];

  for (const v of vectors) {
    const existingCampaign = await prisma.campaign.findFirst({
      where: { name: v.name }
    });

    if (!existingCampaign) {
      await prisma.campaign.create({
        data: {
          name: v.name,
          type: v.type,
          status: 'ACTIVE',
          templateId: createdTemplates[0].id, // Default to Google for simplicity in seed
          targetEmails: JSON.stringify(v.targets),
        }
      });
      console.log(`Created dummy campaign: ${v.name}`);
    }
  }

  console.log('Seeding finished.');
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
