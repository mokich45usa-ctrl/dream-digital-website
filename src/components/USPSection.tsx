import { NeonEnsoCircle } from './NeonEnsoCircle';

export function USPSection() {
  const uspItems = [
    {
      title: "72h Delivery",
      description: "Lightning fast turnaround for your digital presence"
    },
    {
      title: "Fixed Price from $300",
      description: "Transparent pricing with no hidden surprises"
    },
    {
      title: "SEO & Ad-ready",
      description: "Optimized for search engines and advertising platforms"
    },
    {
      title: "Ongoing Support",
      description: "Continuous maintenance and updates included"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2" style={{ backgroundColor: '#F5F5F5' }}></div>
        <div className="w-1/2 bg-black"></div>
      </div>

      {/* Background Neon Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <NeonEnsoCircle 
          className="absolute top-10 left-10" 
          color="#00FFFF" 
          size={60}
        />
        <NeonEnsoCircle 
          className="absolute bottom-10 right-16" 
          color="#FF0033" 
          size={80}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16 max-sm:mb-8">
          <div className="mb-4 max-sm:mb-2">
            <span 
              className="text-4xl max-sm:text-2xl tracking-widest opacity-70"
              style={{ color: '#FF0033' }}
            >
              力
            </span>
          </div>
          <h2 
            className="text-6xl max-sm:text-3xl font-black tracking-tight mb-4 max-sm:mb-2"
            style={{ 
              fontFamily: 'monospace',
              color: '#F5F5F5',
              textShadow: `
                0 0 10px #FF0033,
                0 0 20px #FF0033
              `
            }}
          >
            WHY DREAM
          </h2>
        </div>

        {/* USP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-sm:gap-4">
          {uspItems.map((item, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Neon Frame */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(45deg, #FF0033, #00FFFF)`,
                  padding: '2px',
                  borderRadius: '0'
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{ backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#000000' }}
                ></div>
              </div>

              {/* Card Content */}
              <div 
                className={`relative z-10 p-8 max-sm:p-4 border-2 transition-all duration-300 group-hover:border-transparent h-[320px] max-sm:h-[200px] flex flex-col justify-between`}
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#000000',
                  borderColor: index % 2 === 0 ? '#000000' : '#F5F5F5'
                }}
              >
                {/* Enhanced Animated Enso Circle */}
                <div className="mb-6 max-sm:mb-3 flex justify-center">
                  <div className="relative max-sm:scale-75">
                    <NeonEnsoCircle 
                      color={index % 2 === 0 ? "#FF0033" : "#00FFFF"} 
                      size={60}
                      enhanced={true}
                    />
                  </div>
                </div>

                <h3 
                  className="text-xl max-sm:text-lg font-black tracking-wide mb-4 max-sm:mb-2"
                  style={{ 
                    fontFamily: 'monospace',
                    color: index % 2 === 0 ? '#000000' : '#F5F5F5'
                  }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-sm max-sm:text-xs leading-relaxed max-sm:leading-snug"
                  style={{ 
                    color: index % 2 === 0 ? '#717182' : '#F5F5F5'
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}