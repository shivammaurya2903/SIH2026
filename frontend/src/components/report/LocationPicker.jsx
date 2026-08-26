import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const LocationPicker = ({ locationData, onLocationChange }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleGetCurrentLocation = () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!navigator.geolocation) {
      setErrorMsg(isHi ? 'यह ब्राउज़र लाइव स्थान का समर्थन नहीं करता है।' : 'Live location is not supported by this browser.');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);

        onLocationChange({
          ...locationData,
          latitude: lat,
          longitude: lng
        });

        setLoading(false);
        setSuccessMsg(isHi ? `स्थान सफलतापूर्वक कैप्चर किया गया (अक्षांश: ${lat}, देशांतर: ${lng})` : `Location captured successfully (Lat: ${lat}, Lng: ${lng})`);
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg(isHi ? 'स्थान की अनुमति अस्वीकृत कर दी गई थी। आप मैन्युअल रूप से विवरण दर्ज कर सकते हैं।' : 'Location permission was denied. You can enter the location manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg(isHi ? 'आपकी वर्तमान स्थिति निर्धारित करने में असमर्थ।' : 'Unable to determine your location.');
            break;
          case error.TIMEOUT:
            setErrorMsg(isHi ? 'स्थान अनुरोध का समय समाप्त हो गया। कृपया पुन: प्रयास करें।' : 'Location request timed out. Please try again.');
            break;
          default:
            setErrorMsg(isHi ? 'स्थान प्राप्त करने में असमर्थ।' : 'Unable to retrieve location.');
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A' }}>
          📍 {isHi ? 'लाइव स्थान (जीपीएस)' : 'Live Location Intelligence (GPS)'}
        </div>
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={loading}
          style={{
            padding: '8px 14px',
            background: loading ? '#CBD5E1' : '#EFF6FF',
            color: loading ? '#64748B' : '#1D4ED8',
            border: '1px solid #BFDBFE',
            borderRadius: '8px',
            fontWeight: '800',
            fontSize: '13px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {loading
            ? (isHi ? 'स्थान का पता लगाया जा रहा है...' : 'Detecting your location...')
            : (isHi ? '📍 मेरे वर्तमान स्थान का उपयोग करें' : '📍 Use My Current Location')}
        </button>
      </div>

      {successMsg && (
        <div style={{ padding: '10px 14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#059669', fontSize: '12px', fontWeight: '800', marginBottom: '12px' }}>
          ✓ {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '12px', fontWeight: '700', marginBottom: '12px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Lat & Long Coordinate Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748B', marginBottom: '4px' }}>
            {isHi ? 'अक्षांश (Latitude)' : 'Latitude'}
          </label>
          <input
            type="text"
            readOnly
            value={locationData.latitude || ''}
            placeholder="23.3441"
            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#FFFFFF' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748B', marginBottom: '4px' }}>
            {isHi ? 'देशांतर (Longitude)' : 'Longitude'}
          </label>
          <input
            type="text"
            readOnly
            value={locationData.longitude || ''}
            placeholder="85.3096"
            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#FFFFFF' }}
          />
        </div>
      </div>
    </div>
  );
};
