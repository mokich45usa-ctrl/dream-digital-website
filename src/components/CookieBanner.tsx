import React, { useState, useEffect } from 'react';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    functional: false
  });

  useEffect(() => {
    // Проверяем, есть ли уже сохраненное согласие
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
      } catch (e) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      functional: true
    };
    setConsent(newConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      functional: false
    };
    setConsent(newConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleToggleCookie = (type: keyof CookieConsent) => {
    if (type === 'necessary') return; // Необходимые cookies нельзя отключить
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#000000',
        borderTop: '2px solid #00FFFF',
        zIndex: 10000,
        padding: '20px',
        fontFamily: 'monospace',
        color: '#FFFFFF'
      }}
    >
      {!showSettings ? (
        // Основной баннер
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h3 style={{ color: '#00FFFF', margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>
                🍪 DREAM DIGITAL COOKIES
              </h3>
              <p style={{ margin: '0 0 15px 0', fontSize: '14px', lineHeight: '1.5' }}>
                Мы используем cookies для сохранения ваших настроек, анализа посещений сайта и обработки заявок. 
                Необходимые cookies всегда включены для работы сайта.
              </p>
              <div style={{ fontSize: '12px', color: '#888888' }}>
                Подробнее в{' '}
                <a 
                  href="/privacy-policy" 
                  style={{ color: '#00FFFF', textDecoration: 'underline' }}
                >
                  Политике конфиденциальности
                </a>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowSettings(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  color: '#00FFFF',
                  border: '2px solid #00FFFF',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                ⚙️ Настройки
              </button>
              
              <button
                onClick={handleRejectAll}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  color: '#FF6B6B',
                  border: '2px solid #FF6B6B',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                ❌ Отклонить
              </button>
              
              <button
                onClick={handleAcceptAll}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#00FFFF',
                  color: '#000000',
                  border: '2px solid #00FFFF',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                }}
              >
                ✅ Принять все
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Расширенные настройки
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#00FFFF', margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
              ⚙️ НАСТРОЙКИ COOKIES
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#888888',
                border: '1px solid #888888',
                borderRadius: '5px',
                fontFamily: 'monospace',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              ← Назад
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {/* Необходимые cookies */}
            <div style={{ border: '2px solid #00FFFF', padding: '15px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ color: '#00FFFF', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                  🔒 Необходимые
                </h4>
                <div style={{ color: '#00FF00', fontSize: '12px', fontWeight: 'bold' }}>
                  Всегда включены
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.4', color: '#CCCCCC' }}>
                Настройки согласия на cookies. Эти данные необходимы для работы системы согласия и не могут быть отключены.
              </p>
            </div>

            {/* Аналитические cookies */}
            <div style={{ border: '2px solid #00FFFF', padding: '15px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ color: '#00FFFF', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                  📊 Аналитические
                </h4>
                <label style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => handleToggleCookie('analytics')}
                    style={{ marginRight: '8px' }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                    {consent.analytics ? '✅ Включены' : '❌ Отключены'}
                  </span>
                </label>
              </div>
              <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.4', color: '#CCCCCC' }}>
                Наша собственная аналитика: статистика посещений, время на сайте, устройства и браузеры для улучшения сайта.
              </p>
            </div>

            {/* Функциональные cookies */}
            <div style={{ border: '2px solid #00FFFF', padding: '15px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ color: '#00FFFF', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                  ⚙️ Функциональные
                </h4>
                <label style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={consent.functional}
                    onChange={() => handleToggleCookie('functional')}
                    style={{ marginRight: '8px' }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                    {consent.functional ? '✅ Включены' : '❌ Отключены'}
                  </span>
                </label>
              </div>
              <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.4', color: '#CCCCCC' }}>
                Сохранение заявок пользователей, отправка форм через EmailJS, обработка обращений клиентов.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '12px', color: '#888888' }}>
              Выбранные настройки будут сохранены в вашем браузере
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={handleRejectAll}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  color: '#FF6B6B',
                  border: '2px solid #FF6B6B',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                ❌ Отклонить все
              </button>
              
              <button
                onClick={handleSaveSettings}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#00FFFF',
                  color: '#000000',
                  border: '2px solid #00FFFF',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                }}
              >
                💾 Сохранить настройки
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
