import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { CATEGORIES } from '../../data/categories';
import { JHARKHAND_DISTRICTS } from '../../data/districts';
import { ChallengeApi } from '../../api/challenge.api';

export const ChallengesPage = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const districtFilter = searchParams.get('district') || '';
  const categoryFilter = searchParams.get('category') || '';
  const searchKeyword = searchParams.get('search') || '';

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (districtFilter) params.district = districtFilter;
        if (categoryFilter) params.category = categoryFilter;
        if (searchKeyword) params.search = searchKeyword;

        const res = await ChallengeApi.getAll(params);
        if (res.success && res.data) {
          setChallenges(res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load challenges');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [districtFilter, categoryFilter, searchKeyword]);

  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', marginBottom: '8px' }}>
            {isHi ? 'झारखंड सामाजिक चुनौतियां फीड' : 'Societal Challenges Feed'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            {isHi ? 'नागरिकों द्वारा दर्ज की गई लाइव समस्याएं जिन्हें आरएंडडी समाधानों की आवश्यकता है' : 'Live crowdsourced challenges requiring University R&D solutions and Industry CSR support'}
          </p>
        </div>

        {/* Filter Bar */}
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
              {isHi ? 'जिला' : 'District'}
            </label>
            <select
              value={districtFilter}
              onChange={(e) => handleFilterChange('district', e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
            >
              <option value="">{isHi ? 'सभी 24 जिले' : 'All 24 Districts'}</option>
              {JHARKHAND_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
              {isHi ? 'प्रक्षेत्र' : 'Category'}
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
            >
              <option value="">{isHi ? 'सभी प्रक्षेत्र' : 'All Categories'}</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{isHi ? c.nameHi : c.nameEn}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
              {isHi ? 'खोजें' : 'Search Keywords'}
            </label>
            <input
              type="text"
              placeholder={isHi ? 'कीवर्ड दर्ज करें...' : 'Type keywords...'}
              value={searchKeyword}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
            />
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#1D4ED8', fontWeight: '700' }}>
            {isHi ? 'चुनौतियां लोड हो रही हैं...' : 'Loading challenges...'}
          </div>
        ) : error ? (
          <div style={{ background: '#FEF2F2', padding: '20px', borderRadius: '12px', color: '#DC2626', fontWeight: '700', textAlign: 'center' }}>
            {error}
          </div>
        ) : challenges.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
            {isHi ? 'कोई चुनौती नहीं मिली।' : 'No societal challenges found matching your filter criteria.'}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {challenges.map((c) => (
              <div
                key={c._id || c.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <StatusBadge status={c.status} />
                    <PriorityBadge priority={c.priority} />
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 10px 0', lineHeight: '1.3' }}>
                    {c.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: '#475569', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                    {c.description}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', display: 'flex', justifyContent: 'space-between', marginBottom: '16px', padding: '10px', background: '#F8FAFC', borderRadius: '8px' }}>
                    <span>📍 {c.district || 'Ranchi'}</span>
                    <span>🤝 {c.facedCount || 0} {isHi ? 'प्रभावित' : 'Faced'}</span>
                  </div>

                  <button
                    onClick={() => navigate(`/challenges/${c._id || c.id}`)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#1D4ED8',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '800',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    {isHi ? 'विवरण एवं समाधान →' : 'View Details & Solutions →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
