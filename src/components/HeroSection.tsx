import { NeonEnsoCircle } from './NeonEnsoCircle';
import { BrutalistButton } from './BrutalistButton';
import { ProjectRequestForm } from './ProjectRequestForm';
import geometricSymbol from 'figma:asset/495c7378e982e565c1ceba87b3b69a00044b2e06.png';

export function HeroSection() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-black"></div>
        <div className="w-1/2" style={{ backgroundColor: '#F5F5F5' }}></div>
      </div>
      
      {/* Neon Enso Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <NeonEnsoCircle 
          className="absolute top-[456px] md:top-20 left-20" 
          color="#FF0033" 
          size={120}
        />
        <NeonEnsoCircle 
          className="absolute top-[574px] md:top-32 right-32" 
          color="#00FFFF" 
          size={80}
        />
        <NeonEnsoCircle 
          className="absolute top-[544px] md:bottom-40 left-1/3" 
          color="#FF0033" 
          size={60}
        />
        <NeonEnsoCircle 
          className="absolute top-[664px] md:bottom-20 right-20" 
          color="#00FFFF" 
          size={100}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-4xl">
          {/* DREAM Geometric Logo */}
          <div className="mb-8 opacity-85 flex justify-center">
            <div 
              className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 geometric-logo cursor-pointer"
            >
              <img 
                src={geometricSymbol} 
                alt="DREAM Logo" 
                className="w-full h-full object-contain transition-all duration-300 hover:brightness-125"
                style={{ 
                  filter: 'brightness(1.2) contrast(1.1)',
                  outline: 'none',
                  border: 'none',
                  WebkitAppearance: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                draggable="false"
                unselectable="on"
              />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="mb-12 leading-none">
            <span 
              className="block text-8xl md:text-9xl font-black tracking-tight"
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
              DREAM
            </span>
            <span 
              className="block text-6xl md:text-7xl font-black tracking-tight mt-4"
              style={{ 
                fontFamily: 'monospace',
                color: '#000000',
                textShadow: `
                  0 0 10px #FF0033,
                  0 0 20px #FF0033
                `
              }}
            >
              DIGITAL
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#717182' }}
          >
            Your website in 72 hours — starting at $300.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <ProjectRequestForm>
              <BrutalistButton 
                variant="primary" 
                glowColor="#00FFFF"
              >
                START PROJECT
              </BrutalistButton>
            </ProjectRequestForm>
            <BrutalistButton 
              variant="secondary" 
              glowColor="#FF0033"
              onClick={scrollToPricing}
            >
              VIEW PRICING
            </BrutalistButton>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)`
        }}
      ></div>
    </section>
  );
}