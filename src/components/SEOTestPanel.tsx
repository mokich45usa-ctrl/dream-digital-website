import React, { useState, useEffect } from 'react';

export function SEOTestPanel() {
  const [seoData, setSeoData] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Получаем все мета теги
    const getMetaTags = () => {
      const metaTags = document.querySelectorAll('meta');
      const data: any = {};

      metaTags.forEach((tag) => {
        const name = tag.getAttribute('name') || tag.getAttribute('property') || 'unknown';
        const content = tag.getAttribute('content');
        const charset = tag.getAttribute('charset');
        
        if (content) {
          data[name] = content;
        }
        
        // Специально для charset
        if (charset) {
          data.charset = charset;
        }
      });

      // Получаем title
      data.title = document.title;

      // Получаем canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        data.canonical = canonical.getAttribute('href');
      }

      // Получаем JSON-LD
      const jsonLd = document.querySelector('script[type="application/ld+json"]');
      if (jsonLd) {
        try {
          data.jsonLd = JSON.parse(jsonLd.textContent || '{}');
        } catch (e) {
          data.jsonLd = 'Invalid JSON';
        }
      }

      setSeoData(data);
    };

    getMetaTags();
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 9999,
          padding: '10px 20px',
          backgroundColor: '#00FFFF',
          color: '#000000',
          border: '2px solid #00FFFF',
          borderRadius: '5px',
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
        }}
      >
        🔍 TEST SEO
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 10000,
        padding: '20px',
        overflow: 'auto',
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#00FFFF'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#00FFFF', margin: 0 }}>🔍 SEO TEST PANEL</h1>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}
        >
          ❌ CLOSE
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Primary Meta Tags */}
        <div style={{ border: '2px solid #00FFFF', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ color: '#00FFFF', marginTop: 0 }}>📋 PRIMARY META TAGS</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>Title:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData.title || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>Description:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData.description || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>Keywords:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData.keywords || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>Author:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData.author || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>Robots:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData.robots || '❌ Not found'}
            </div>
          </div>
        </div>

        {/* OpenGraph Tags */}
        <div style={{ border: '2px solid #00FFFF', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ color: '#00FFFF', marginTop: 0 }}>📘 OPENGRAPH TAGS</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>og:title:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['og:title'] || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>og:description:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['og:description'] || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>og:image:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['og:image'] || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>og:url:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['og:url'] || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>og:type:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['og:type'] || '❌ Not found'}
            </div>
          </div>
        </div>

        {/* Twitter Cards */}
        <div style={{ border: '2px solid #00FFFF', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ color: '#00FFFF', marginTop: 0 }}>🐦 TWITTER CARDS</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>twitter:card:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['twitter:card'] || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>twitter:title:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['twitter:title'] || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>twitter:description:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['twitter:description'] || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>twitter:image:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['twitter:image'] || '❌ Not found'}
            </div>
          </div>
        </div>

        {/* Technical SEO */}
        <div style={{ border: '2px solid #00FFFF', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ color: '#00FFFF', marginTop: 0 }}>⚙️ TECHNICAL SEO</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>Canonical URL:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData.canonical || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>Viewport:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData.viewport || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>Charset:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData.charset || '❌ Not found'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#FFFFFF' }}>Theme Color:</strong>
            <div style={{ backgroundColor: '#1a1a1a', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
              {seoData['theme-color'] || '❌ Not found'}
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <div style={{ border: '2px solid #00FFFF', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h2 style={{ color: '#00FFFF', marginTop: 0 }}>📊 JSON-LD STRUCTURED DATA</h2>
        <div style={{ backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '5px', overflow: 'auto', maxHeight: '300px' }}>
          <pre style={{ margin: 0, color: '#00FFFF' }}>
            {JSON.stringify(seoData.jsonLd, null, 2)}
          </pre>
        </div>
      </div>

      {/* SEO Score */}
      <div style={{ border: '2px solid #00FFFF', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h2 style={{ color: '#00FFFF', marginTop: 0 }}>📈 SEO SCORE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#1a1a1a', borderRadius: '5px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: seoData.title ? '#00FF00' : '#FF0000' }}>
              {seoData.title ? '✅' : '❌'}
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>Title Tag</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#1a1a1a', borderRadius: '5px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: seoData.description ? '#00FF00' : '#FF0000' }}>
              {seoData.description ? '✅' : '❌'}
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>Meta Description</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#1a1a1a', borderRadius: '5px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: seoData['og:title'] ? '#00FF00' : '#FF0000' }}>
              {seoData['og:title'] ? '✅' : '❌'}
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>OpenGraph</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#1a1a1a', borderRadius: '5px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: seoData['twitter:card'] ? '#00FF00' : '#FF0000' }}>
              {seoData['twitter:card'] ? '✅' : '❌'}
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>Twitter Cards</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#1a1a1a', borderRadius: '5px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: seoData.canonical ? '#00FF00' : '#FF0000' }}>
              {seoData.canonical ? '✅' : '❌'}
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>Canonical URL</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#1a1a1a', borderRadius: '5px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: seoData.jsonLd ? '#00FF00' : '#FF0000' }}>
              {seoData.jsonLd ? '✅' : '❌'}
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>Structured Data</div>
          </div>
        </div>
      </div>
    </div>
  );
}
