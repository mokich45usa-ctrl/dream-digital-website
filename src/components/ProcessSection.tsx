import { NeonEnsoCircle } from './NeonEnsoCircle';

export function ProcessSection() {
  const steps = [
    {
      id: 1,
      title: "Request",
      icon: "📝",
      description: "Share your vision and requirements with our team"
    },
    {
      id: 2,
      title: "Design",
      icon: "🎨", 
      description: "We create stunning mockups based on your brand"
    },
    {
      id: 3,
      title: "Build",
      icon: "⚡",
      description: "Development with cutting-edge technology"
    },
    {
      id: 4,
      title: "Launch",
      icon: "🚀",
      description: "Deploy your website and watch it perform"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2" style={{ backgroundColor: '#F5F5F5' }}></div>
        <div className="w-1/2 bg-black"></div>
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
            PROCESS
          </h2>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 hidden lg:block">
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(90deg, #FF0033, #00FFFF, #FF0033, #00FFFF)`,
                boxShadow: `0 0 20px #FF003360`
              }}
            ></div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className="relative text-center group"
              >
                {/* Step Number and Enso Circle */}
                <div className="relative mb-6 flex justify-center">
                  <div className="relative">
                    <NeonEnsoCircle 
                      color={index % 2 === 0 ? "#FF0033" : "#00FFFF"} 
                      size={120}
                    />
                    
                    {/* Step Number */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div 
                        className="w-12 h-12 flex items-center justify-center text-2xl font-black border-2"
                        style={{ 
                          backgroundColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                          borderColor: '#F5F5F5',
                          color: '#F5F5F5'
                        }}
                      >
                        {step.id}
                      </div>
                    </div>

                    {/* Icon */}
                    <div 
                      className="absolute -bottom-2 -right-2 w-8 h-8 flex items-center justify-center text-lg border-2"
                      style={{ 
                        backgroundColor: '#F5F5F5',
                        borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF'
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div 
                  className="p-6 border-2 transition-all duration-300 group-hover:scale-105"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? '#000000' : '#F5F5F5',
                    borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                    boxShadow: `0 0 20px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}40`
                  }}
                >
                  <h3 
                    className="text-2xl font-black tracking-wide mb-4"
                    style={{ 
                      fontFamily: 'monospace',
                      color: index % 2 === 0 ? '#F5F5F5' : '#000000'
                    }}
                  >
                    {step.title}
                  </h3>
                  
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ 
                      color: index % 2 === 0 ? '#F5F5F5' : '#717182'
                    }}
                  >
                    {step.description}
                  </p>

                  {/* Bottom Accent */}
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 group-hover:w-2/3 transition-all duration-300"
                    style={{ 
                      backgroundColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                      boxShadow: `0 0 10px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}`
                    }}
                  ></div>
                </div>

                {/* Arrow Connector (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div 
                      className="w-0 h-0 border-l-[15px] border-t-[10px] border-b-[10px]"
                      style={{ 
                        borderLeftColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                        borderTopColor: 'transparent',
                        borderBottomColor: 'transparent',
                        filter: `drop-shadow(0 0 5px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'})`
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Info */}
        <div className="text-center mt-16">
          <div 
            className="inline-flex items-center space-x-4 px-8 py-4 border-2"
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
              TOTAL TIMELINE:
            </span>
            <span 
              className="text-2xl font-black tracking-wide"
              style={{ 
                fontFamily: 'monospace',
                color: '#00FFFF',
                textShadow: `0 0 10px #00FFFF`
              }}
            >
              48-72 HOURS
            </span>
            <span 
              className="text-2xl"
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