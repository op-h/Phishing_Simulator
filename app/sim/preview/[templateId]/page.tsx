import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import SimulatorWrapper from '@/components/SimulatorWrapper';

// Import templates
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

export default async function TemplatePreviewPage({ params, searchParams }: { params: Promise<{ templateId: string }>, searchParams: Promise<{ type?: string }> }) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  
  const template = await prisma.template.findUnique({
    where: { id: resolvedParams.templateId },
  });

  if (!template || !template.htmlContent) {
    notFound();
  }

  // Find corresponding React component securely
  const Component = TEMPLATE_COMPONENTS[template.htmlContent];
  
  if (!Component) {
    notFound();
  }

  const simType = resolvedSearch.type || 'EMAIL_PHISHING';
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000' }}>
      {/* SOC PREVIEW HEADER (Warning Banner) */}
      <div style={{ background: '#ff003c', color: '#fff', padding: '10px 20px', borderBottom: '2px solid #0b0c10', display: 'flex', justifyContent: 'space-between', zIndex: 9999, fontWeight: 'bold' }}>
        <span>SOC PREVIEW MODE (SAFE)</span>
        <span>Template: {template.name}</span>
      </div>
      
      {/* TEMPLATE RENDER */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {Component ? (
          <Component campaignId="PREVIEW" targetId="PREVIEW" />
        ) : (
          <div style={{ color: '#fff', padding: '40px', textAlign: 'center' }}>
            <h2>Component Error</h2>
            <p>Could not resolve component for template mapping: {template.htmlContent}</p>
          </div>
        )}
      </div>
    </div>
  );
}
