import { BrutalistButton } from './BrutalistButton';
import { NeonEnsoCircle } from './NeonEnsoCircle';
import { ProjectRequestForm } from './ProjectRequestForm';

export function FinalCTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-black"></div>
        <div className="w-1/2" style={{ backgroundColor: '#F5F5F5' }}></div>
      </div>

      {/* Background Neon Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <NeonEnsoCircle 
          className="absolute top-20 left-20" 
          color="#FF0033" 
          size={100}
        />
        <NeonEnsoCircle 
          className="absolute top-32 right-32" 
          color="#00FFFF" 
          size={80}
        />
        <NeonEnsoCircle 
          className="absolute bottom-20 left-1/3" 
          color="#FF0033" 
          size={60}
        />
        <NeonEnsoCircle 
          className="absolute bottom-32 right-20" 
          color="#00FFFF" 
          size={90}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          {/* Glitch Headline */}
          <div className="relative mb-8">
            <h2 
              className="text-5xl md:text-7xl font-black tracking-tight leading-tight"
              style={{ 
                fontFamily: 'monospace',
                color: '#F5F5F5',
                textShadow: `
                  0 0 10px #00FFFF,
                  0 0 20px #00FFFF,
                  0 0 30px #00FFFF
                `
              }}
            >
              Launch Your Website
            </h2>
            <h2 
              className="text-5xl md:text-7xl font-black tracking-tight leading-tight mt-4"
              style={{ 
                fontFamily: 'monospace',
                color: '#000000',
                textShadow: `
                  0 0 10px #FF0033,
                  0 0 20px #FF0033
                `
              }}
            >
              Tomorrow — from $300
            </h2>

            {/* Glitch Effect Layer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 animate-pulse"
              style={{
                background: `linear-gradient(45deg, #FF0033, transparent, #00FFFF, transparent)`,
                mixBlendMode: 'overlay'
              }}
            ></div>
          </div>

          {/* Subheadline with Kanji */}
          <div className="mb-12">
            <span 
              className="text-4xl tracking-widest"
              style={{ 
                color: '#FF0033',
                textShadow: `0 0 10px #FF0033`
              }}
            >
              力 • 光
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <ProjectRequestForm>
            <BrutalistButton
              variant="primary"
              glowColor="#00FFFF"
            >
              START PROJECT
            </BrutalistButton>
          </ProjectRequestForm>
        </div>
      </div>
    </section>
  );
}