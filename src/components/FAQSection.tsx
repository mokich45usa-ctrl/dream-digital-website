import { useState } from 'react';
import { NeonEnsoCircle } from './NeonEnsoCircle';

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How fast can you deliver my website?",
      answer: "Most projects are completed within 48-72 hours. Simple landing pages can be delivered in as little as 24 hours."
    },
    {
      id: 2,
      question: "What's included in the fixed price?",
      answer: "Design, development, mobile optimization, basic SEO, hosting setup, and 30 days of support are all included in our fixed pricing."
    },
    {
      id: 3,
      question: "Do you provide ongoing maintenance?", 
      answer: "Yes! We offer monthly maintenance packages starting at $50/month including updates, security monitoring, and content changes."
    },
    {
      id: 4,
      question: "Can you work with my existing brand?",
      answer: "Absolutely. We can work with your existing brand guidelines or help create new branding that aligns with your vision."
    },
    {
      id: 5,
      question: "What if I need revisions?",
      answer: "We include 2 rounds of revisions in all packages. Additional revisions are available at $50 per round."
    },
    {
      id: 6,
      question: "Do you build e-commerce websites?",
      answer: "Yes, our Premium package includes full e-commerce functionality with payment processing, inventory management, and more."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Background Neon Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <NeonEnsoCircle 
          className="absolute top-20 left-16" 
          color="#FF0033" 
          size={70}
        />
        <NeonEnsoCircle 
          className="absolute bottom-24 right-20" 
          color="#00FFFF" 
          size={90}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span 
              className="text-4xl tracking-widest opacity-70"
              style={{ color: '#FF0033' }}
            >
              力 • 光
            </span>
          </div>
          <h2 
            className="text-6xl font-black tracking-tight mb-4"
            style={{ 
              fontFamily: 'monospace',
              color: '#000000'
            }}
          >
            FAQ
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id}>
              {/* Kanji Accent Between Questions */}
              {index > 0 && (
                <div className="text-center py-4">
                  <span 
                    className="text-2xl opacity-50"
                    style={{ color: '#FF0033' }}
                  >
                    {index % 2 === 0 ? '力' : '光'}
                  </span>
                </div>
              )}

              {/* FAQ Item */}
              <div 
                className="relative border-2 transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  backgroundColor: openFAQ === faq.id ? '#000000' : 'transparent',
                  borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                  boxShadow: openFAQ === faq.id 
                    ? `0 0 30px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}60`
                    : `0 0 10px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}30`
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between group"
                >
                  <h3 
                    className="text-xl font-black tracking-wide pr-4"
                    style={{ 
                      fontFamily: 'monospace',
                      color: openFAQ === faq.id ? '#F5F5F5' : '#000000'
                    }}
                  >
                    {faq.question}
                  </h3>
                  
                  {/* Plus/Minus Icon */}
                  <div 
                    className={`w-8 h-8 flex items-center justify-center border-2 transition-all duration-300 ${
                      openFAQ === faq.id ? 'rotate-45' : ''
                    }`}
                    style={{ 
                      backgroundColor: openFAQ === faq.id ? '#F5F5F5' : (index % 2 === 0 ? '#FF0033' : '#00FFFF'),
                      borderColor: openFAQ === faq.id ? (index % 2 === 0 ? '#FF0033' : '#00FFFF') : '#F5F5F5',
                      color: openFAQ === faq.id ? (index % 2 === 0 ? '#FF0033' : '#00FFFF') : '#F5F5F5'
                    }}
                  >
                    <span className="text-xl font-black">+</span>
                  </div>
                </button>

                {/* Answer */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ${
                    openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    {/* Glowing Divider */}
                    <div 
                      className="w-full h-px mb-4"
                      style={{ 
                        backgroundColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                        boxShadow: `0 0 10px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}`
                      }}
                    ></div>
                    
                    <p 
                      className="text-lg leading-relaxed"
                      style={{ 
                        color: openFAQ === faq.id ? '#F5F5F5' : '#717182'
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Corner Accents */}
                <div 
                  className="absolute top-0 left-0 w-4 h-4 transition-all duration-300"
                  style={{ 
                    backgroundColor: openFAQ === faq.id ? '#F5F5F5' : (index % 2 === 0 ? '#FF0033' : '#00FFFF')
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 right-0 w-4 h-4 transition-all duration-300"
                  style={{ 
                    backgroundColor: openFAQ === faq.id ? '#F5F5F5' : (index % 2 === 0 ? '#FF0033' : '#00FFFF')
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p 
            className="text-lg mb-6"
            style={{ color: '#717182' }}
          >
            Still have questions? Let's talk.
          </p>
          <div 
            className="inline-flex items-center space-x-4 px-8 py-4 border-2 cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#000000',
              borderColor: '#00FFFF',
              boxShadow: `0 0 20px #00FFFF40`
            }}
          >
            <span 
              className="text-lg font-black tracking-wide"
              style={{ 
                fontFamily: 'monospace',
                color: '#F5F5F5'
              }}
            >
              CONTACT US
            </span>
            <span 
              className="text-xl"
              style={{ 
                color: '#FF0033',
                textShadow: `0 0 10px #FF0033`
              }}
            >
              力
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}