import { NeonEnsoCircle } from './NeonEnsoCircle';
import { BrutalistButton } from './BrutalistButton';
import { ProjectRequestForm } from './ProjectRequestForm';

export function PricingSection() {
  const packages = [
    {
      name: "Lite",
      price: "$300",
      description: "1-page landing",
      features: ["Single landing page", "Mobile responsive", "Basic SEO", "72h delivery"]
    },
    {
      name: "Standard", 
      price: "$700",
      description: "3–5 pages",
      features: ["Multi-page website", "Contact forms", "Analytics setup", "7 days support"]
    },
    {
      name: "Pro",
      price: "$1500+",
      description: "corporate",
      features: ["Custom design", "CMS integration", "Advanced SEO", "Admin panel"]
    },
    {
      name: "Custom",
      price: "$2500+", 
      description: "custom, e-commerce",
      features: ["E-commerce ready", "Custom functionality", "Full branding", "Multi-language"]
    }
  ];

  return (
    <section id="pricing-section" className="relative py-24 overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2" style={{ backgroundColor: '#F5F5F5' }}></div>
        <div className="w-1/2 bg-black"></div>
      </div>

      {/* Background Neon Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <NeonEnsoCircle 
          className="absolute top-20 right-20" 
          color="#FF0033" 
          size={100}
        />
        <NeonEnsoCircle 
          className="absolute bottom-32 left-32" 
          color="#00FFFF" 
          size={70}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span 
              className="text-4xl tracking-widest opacity-70"
              style={{ color: '#FF0033' }}
            >
              光
            </span>
          </div>
          <h2 
            className="text-6xl font-black tracking-tight mb-4"
            style={{ 
              fontFamily: 'monospace',
              color: '#F5F5F5',
              textShadow: `
                0 0 10px #FF0033,
                0 0 20px #FF0033
              `
            }}
          >
            PRICING
          </h2>
        </div>

        {/* Main Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Glowing Enso Accent */}
              <div className="absolute -top-4 -right-4 z-20">
                <NeonEnsoCircle 
                  color={index % 2 === 0 ? "#00FFFF" : "#FF0033"} 
                  size={40}
                />
              </div>

              {/* Package Card */}
              <div 
                className="relative p-8 border-2 transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#000000' : '#F5F5F5',
                  borderColor: index % 2 === 0 ? '#00FFFF' : '#FF0033',
                  boxShadow: `0 0 20px ${index % 2 === 0 ? '#00FFFF' : '#FF0033'}40`
                }}
              >
                <div className="text-center mb-6">
                  <h3 
                    className="text-2xl font-black tracking-wide mb-2"
                    style={{ 
                      fontFamily: 'monospace',
                      color: index % 2 === 0 ? '#F5F5F5' : '#000000'
                    }}
                  >
                    {pkg.name}
                  </h3>
                  <div 
                    className="text-4xl font-black mb-2"
                    style={{ 
                      fontFamily: 'monospace',
                      color: index % 2 === 0 ? '#00FFFF' : '#FF0033'
                    }}
                  >
                    {pkg.price}
                  </div>
                  <p 
                    className="text-sm opacity-70"
                    style={{ 
                      color: index % 2 === 0 ? '#F5F5F5' : '#717182'
                    }}
                  >
                    {pkg.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-center text-sm"
                      style={{ 
                        color: index % 2 === 0 ? '#F5F5F5' : '#000000'
                      }}
                    >
                      <span 
                        className="w-2 h-2 mr-3 block"
                        style={{ 
                          backgroundColor: index % 2 === 0 ? '#00FFFF' : '#FF0033'
                        }}
                      ></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <ProjectRequestForm>
                  <BrutalistButton
                    variant={index % 2 === 0 ? "primary" : "secondary"}
                    glowColor={index % 2 === 0 ? "#00FFFF" : "#FF0033"}
                  >
                    Choose {pkg.name}
                  </BrutalistButton>
                </ProjectRequestForm>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}