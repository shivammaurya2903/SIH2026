import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const SpeechInput = ({ value, onChange, placeholder = '', rows = 4 }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsListening(true);
        setStatusMsg(isHi ? 'सुन रहा हूँ... बोलिए ⏹' : 'Listening... speak now ⏹');
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          const updatedValue = value ? `${value} ${transcript}` : transcript;
          onChange(updatedValue);
          setStatusMsg(isHi ? 'वाक् विवरण में जोड़ा गया ✓' : 'Speech added to description ✓');
        }
      };

      rec.onerror = (event) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setStatusMsg(isHi ? 'माइक्रोफ़ोन अनुमति अस्वीकृत।' : 'Microphone permission denied.');
        } else {
          setStatusMsg(isHi ? 'वाणी को समझने में असमर्थ। पुन: प्रयास करें।' : 'Unable to understand speech. Please try again.');
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    } else {
      setSupported(false);
    }
  }, [value, onChange, isHi]);

  const toggleListening = () => {
    if (!supported) {
      setStatusMsg(isHi ? 'यह ब्राउज़र वाक् इनपुट का समर्थन नहीं करता है।' : 'Speech input is not supported in this browser.');
      return;
    }

    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.lang = isHi ? 'hi-IN' : 'en-IN';
      recognition.start();
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: '10px',
          border: '1px solid #CBD5E1',
          fontSize: '14px',
          boxSizing: 'border-box',
          outline: 'none',
          resize: 'vertical',
          lineHeight: '1.5'
        }}
      />

      {/* Floating Microphone Action Button */}
      <button
        type="button"
        onClick={toggleListening}
        aria-label={isListening ? 'Stop listening' : 'Start speech to text'}
        title={isHi ? 'बोलकर दर्ज करें (हिंदी/अंग्रेजी)' : 'Speak to enter text'}
        style={{
          position: 'absolute',
          right: '12px',
          bottom: '16px',
          background: isListening ? '#EF4444' : '#EFF6FF',
          color: isListening ? '#FFFFFF' : '#1D4ED8',
          border: `1px solid ${isListening ? '#DC2626' : '#BFDBFE'}`,
          borderRadius: '20px',
          padding: '6px 12px',
          fontSize: '12px',
          fontWeight: '800',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: isListening ? '0 0 10px rgba(239, 68, 68, 0.4)' : 'none',
          transition: 'all 0.2s ease'
        }}
      >
        <span>{isListening ? '⏹' : '🎤'}</span>
        <span>{isListening ? (isHi ? 'रोकें' : 'Stop') : (isHi ? 'बोलें' : 'Speak')}</span>
      </button>

      {statusMsg && (
        <div style={{ fontSize: '11px', color: isListening ? '#EF4444' : '#64748B', marginTop: '4px', fontWeight: '700' }}>
          {statusMsg}
        </div>
      )}
    </div>
  );
};
