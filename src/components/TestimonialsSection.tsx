import { NeonEnsoCircle } from './NeonEnsoCircle';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      company: "TechFlow",
      avatar: "SC",
      review: "DREAM delivered our landing page in 48 hours. The neon aesthetics perfectly captured our brand's futuristic vision.",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      company: "Urban Ventures", 
      avatar: "MR",
      review: "Exceptional quality and transparent pricing. The team understood our minimalist requirements perfectly.",
      rating: 5
    },
    {
      id: 3,
      name: "Yuki Tanaka",
      company: "Zen Studios",
      avatar: "YT", 
      review: "The perfect balance of brutalism and elegance. Our conversion rates increased by 300% after launch.",
      rating: 5
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background Neon Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <NeonEnsoCircle 
          className="absolute top-20 right-24" 
          color="#FF0033" 
          size={80}
        />
        <NeonEnsoCircle 
          className="absolute bottom-16 left-16" 
          color="#00FFFF" 
          size={60}
        />
      </div>

      {/* VHS Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            )
          `
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
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
            TESTIMONIALS
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="relative group"
            >
              {/* Brutalist Card with Neon Outline */}
              <div 
                className="relative p-8 border-2 transition-all duration-500 hover:scale-105"
                style={{ 
                  backgroundColor: 'transparent',
                  borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                  boxShadow: `
                    0 0 20px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}40,
                    inset 0 0 20px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}10
                  `
                }}
              >
                {/* Red Kanji Stamp in Corner */}
                <div 
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-lg font-black border-2 rotate-12"
                  style={{ 
                    backgroundColor: 'transparent',
                    borderColor: '#FF0033',
                    color: '#FF0033',
                    textShadow: `0 0 10px #FF0033`
                  }}
                >
                  力
                </div>

                {/* Client Avatar */}
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 flex items-center justify-center text-lg font-black border-2 mr-4"
                    style={{ 
                      backgroundColor: '#F5F5F5',
                      borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                      color: '#000000'
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div 
                      className="text-lg font-black tracking-wide"
                      style={{ 
                        fontFamily: 'monospace',
                        color: '#F5F5F5'
                      }}
                    >
                      {testimonial.name}
                    </div>
                    <div 
                      className="text-sm opacity-70"
                      style={{ 
                        color: index % 2 === 0 ? '#FF0033' : '#00FFFF'
                      }}
                    >
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <span 
                      key={starIndex}
                      className="text-xl mr-1"
                      style={{ 
                        color: '#FF0033',
                        textShadow: `0 0 5px #FF0033`
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review Text */}
                <p 
                  className="text-sm leading-relaxed"
                  style={{ 
                    color: '#F5F5F5',
                    opacity: 0.9
                  }}
                >
                  "{testimonial.review}"
                </p>

                {/* Bottom Accent Line */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-1 group-hover:h-2 transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(90deg, ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}, transparent)`,
                    boxShadow: `0 0 10px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}`
                  }}
                ></div>
              </div>

              {/* VHS Texture Overlay on Card */}
              <div 
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 3px,
                      rgba(255, 255, 255, 0.1) 3px,
                      rgba(255, 255, 255, 0.1) 6px
                    )
                  `
                }}
              ></div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}