import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { JharkhandMapCard } from '../../components/landing/JharkhandMapCard';
import { StakeholderQuickCards } from '../../components/landing/StakeholderQuickCards';
import { ChallengeGapSection } from '../../components/landing/ChallengeGapSection';
import { WorkflowSection } from '../../components/landing/WorkflowSection';
import { FourStakeholdersSection } from '../../components/landing/FourStakeholdersSection';
import { ReportJourneySection } from '../../components/landing/ReportJourneySection';
import { AIIntelligenceSection } from '../../components/landing/AIIntelligenceSection';
import { CategoriesSection } from '../../components/landing/CategoriesSection';
import { UniversityIndustrySection } from '../../components/landing/UniversityIndustrySection';
import { IllustrativeJourneySection } from '../../components/landing/IllustrativeJourneySection';
import { WhySamadhanSetuSection } from '../../components/landing/WhySamadhanSetuSection';
import { TrustSection } from '../../components/landing/TrustSection';
import { FinalCTASection } from '../../components/landing/FinalCTASection';

import { useLanguage } from '../../i18n/LanguageContext';
import { ChallengeApi } from '../../api/challenge.api';
import { AnalyticsApi } from '../../api/analytics.api';

export const LandingPage = () => {
  const { t } = useLanguage();

  const [stats, setStats] = useState({ challengesCount: 1248, projectsCount: 156 });

  useEffect(() => {
    const fetchLandingStats = async () => {
      try {
        const [analyticsRes] = await Promise.all([
          AnalyticsApi.getOverview().catch(() => ({ success: false }))
        ]);
        if (analyticsRes.success && analyticsRes.data) {
          setStats({
            challengesCount: analyticsRes.data.totalChallenges || 1248,
            projectsCount: analyticsRes.data.activeProjects || 156
          });
        }
      } catch (err) {
        console.warn('Landing stats fetch warning:', err.message);
      }
    };

    fetchLandingStats();
  }, []);

  return (
    <PageContainer>
      {/* Hero Section — Restored previous clean light design with Image 2 visual hierarchy */}
      <section style={{ background: '#F8FAFC', padding: '60px 0 40px 0' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}
        >
          {/* Hero Left Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span
              style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                padding: '6px 14px',
                background: '#FEF3C7',
                color: '#B45309',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '900',
                letterSpacing: '0.5px'
              }}
            >
              {t('hero.badge', 'JHARKHAND • SIH 2026')}
            </span>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: '900',
                color: '#0F172A',
                lineHeight: '1.15',
                letterSpacing: '-0.5px',
                margin: 0
              }}
            >
              {t('hero.titleLine1', 'Your Problem')}<br />
              {t('hero.titleLine2', 'Can Become')}<br />
              <span style={{ color: '#1D4ED8' }}>{t('hero.titleLine3', 'a Solution.')}</span>
            </h1>

            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.7', margin: 0 }}>
              {t('hero.subtitle', 'Report a problem in your area. Help government understand it. Connect with universities and industries to build real solutions for all 24 Jharkhand districts.')}
            </p>

            {/* Supporting Message Card */}
            <div
              style={{
                background: '#EFF6FF',
                borderLeft: '4px solid #1D4ED8',
                borderRadius: '8px',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#1E4ED8',
                lineHeight: '1.5'
              }}
            >
              💡 {t('hero.quoteCard', 'One problem can become a research project. One research project can become a deployed solution.')}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '4px' }}>
              <Link
                to="/citizen/report"
                style={{
                  padding: '14px 28px',
                  background: '#1D4ED8',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(29, 78, 216, 0.3)'
                }}
              >
                {t('hero.reportCta', '📄 Report a Problem')}
              </Link>

              <Link
                to="/challenges"
                style={{
                  padding: '14px 28px',
                  background: '#FFFFFF',
                  color: '#1D4ED8',
                  border: '1.5px solid #BFDBFE',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '15px',
                  textDecoration: 'none'
                }}
              >
                {t('hero.exploreCta', '🔎 Explore Challenges')}
              </Link>
            </div>

            {/* Stakeholder Quick Cards */}
            <StakeholderQuickCards />
          </div>

          {/* Hero Right — Clean White Jharkhand Map Card */}
          <div>
            <JharkhandMapCard stats={stats} />
          </div>
        </div>
      </section>

      {/* Storytelling & Content Sections */}
      <ChallengeGapSection />
      <WorkflowSection />
      <FourStakeholdersSection />
      <ReportJourneySection />
      <AIIntelligenceSection />
      <CategoriesSection />
      <UniversityIndustrySection />
      <IllustrativeJourneySection />
      <WhySamadhanSetuSection />
      <TrustSection />
      <FinalCTASection />
    </PageContainer>
  );
};
