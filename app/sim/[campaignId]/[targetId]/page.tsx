import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import SimulatorWrapper from '@/components/SimulatorWrapper';

// Import templates mappings
import GoogleLogin from '@/components/templates/GoogleLogin';
import MetaLogin from '@/components/templates/MetaLogin';
import MicrosoftLogin from '@/components/templates/MicrosoftLogin';
import LinkedInLogin from '@/components/templates/LinkedInLogin';
import AppleLogin from '@/components/templates/AppleLogin';
import SonyLogin from '@/components/templates/SonyLogin';
import WhalingLogin from '@/components/templates/WhalingLogin';

const TEMPLATE_COMPONENTS: Record<string, any> = {
  GoogleLogin,
  MetaLogin,
  MicrosoftLogin,
  LinkedInLogin,
  AppleLogin,
  SonyLogin,
  WhalingLogin
};

export default async function VictimSimulationRoute({ params }: { params: Promise<{ campaignId: string, targetId: string }> }) {
  const resolvedParams = await params;
  const { campaignId, targetId } = resolvedParams;

  // Verify the Campaign and Target validity securely
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: { template: true },
  });

  if (!campaign || campaign.status !== 'ACTIVE') {
    notFound(); // Only serve active simulations
  }

  const target = await prisma.target.findUnique({
    where: { id: targetId },
  });

  if (!target) {
    notFound();
  }

  // Load Component
  const Component = TEMPLATE_COMPONENTS[campaign.template.htmlContent || ''];

  if (!Component) {
    console.error(`Component mapping missing for template: ${campaign.template.htmlContent}`);
    notFound();
  }

  return (
    <SimulatorWrapper type={(campaign as any).type}>
      <Component campaignId={campaign.id} targetId={target.id} />
    </SimulatorWrapper>
  );
}
