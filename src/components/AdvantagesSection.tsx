import { NeonEnsoCircle } from './NeonEnsoCircle';

export function AdvantagesSection() {
  const advantages = [
    {
      title: "Speed • Power",
      kanji: "力",
      description: "Lightning-fast delivery without compromising quality"
    },
    {
      title: "Transparency • Value", 
      kanji: "光",
      description: "Clear pricing and exceptional value for your investment"
    },
    {
      title: "Bold • Design",
      kanji: "力",
      description: "Striking visuals that make your brand unforgettable"
    },
    {
      title: "Ad-ready",
      kanji: "光", 
      description: "Optimized for conversions and advertising platforms"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background Neon Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <NeonEnsoCircle 
          className="absolute top-16 left-20" 
          color="#00FFFF" 
          size={90}
        />
        <NeonEnsoCircle 
          className="absolute bottom-20 right-32" 
          color="#FF0033" 
          size={70}
        />
        <NeonEnsoCircle 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
          color="#00FFFF" 
          size={50}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-8">
          <h2 
            className="text-6xl font-black tracking-tight mb-4"
            style={{ 
              fontFamily: 'monospace',
              color: '#F5F5F5',
              textShadow: `
                0 0 10px #00FFFF,
                0 0 20px #00FFFF
              `
            }}
          >
            ADVANTAGES
          </h2>
        </div>

        {/* Vertical Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-4">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Neon Sign Panel */}
              <div 
                className="relative p-8 sm:p-4 border-2 transition-all duration-500 hover:scale-105 min-h-[300px] sm:min-h-[200px] flex flex-col justify-between"
                style={{ 
                  backgroundColor: 'transparent',
                  borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                  boxShadow: `
                    0 0 20px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}60,
                    inset 0 0 20px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}20
                  `
                }}
              >
                {/* Kanji Accent with Enso Circle */}
                <div className="text-center mb-8 sm:mb-4">
                  <div className="relative inline-flex items-center justify-center">
                    <NeonEnsoCircle 
                      color={index % 2 === 0 ? "#FF0033" : "#00FFFF"} 
                      size={80}
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center text-3xl sm:text-2xl"
                      style={{ 
                        color: '#FF0033',
                        textShadow: `0 0 10px #FF0033`,
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {advantage.kanji}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6 sm:mb-3">
                  <h3 
                    className="text-xl sm:text-lg font-black tracking-wider leading-tight"
                    style={{ 
                      fontFamily: 'monospace',
                      color: '#F5F5F5',
                      textShadow: `0 0 10px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}`
                    }}
                  >
                    {advantage.title}
                  </h3>
                </div>

                {/* Description */}
                <p 
                  className="text-sm sm:text-xs leading-relaxed text-center opacity-80"
                  style={{ 
                    color: '#F5F5F5'
                  }}
                >
                  {advantage.description}
                </p>

                {/* Bottom Neon Accent Line */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 group-hover:w-full transition-all duration-500"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                    boxShadow: `0 0 10px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}`
                  }}
                ></div>
              </div>

              {/* Corner Accents */}
              <div 
                className="absolute -top-2 -left-2 w-6 h-6 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                style={{ backgroundColor: index % 2 === 0 ? '#FF0033' : '#00FFFF' }}
              ></div>
              <div 
                className="absolute -bottom-2 -right-2 w-6 h-6 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                style={{ backgroundColor: index % 2 === 0 ? '#FF0033' : '#00FFFF' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}