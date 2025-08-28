import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from './ui/dialog';

export function PortfolioSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const portfolioItems = [
    {
      id: 1,
      title: "Tech Startup",
      category: "Landing Page",
      image: "https://images.unsplash.com/photo-1730993872148-83acdfb597e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwbW9ja3VwJTIwbGFwdG9wfGVufDF8fHx8MTc1NjI1OTc2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Modern SaaS platform with clean design",
      detailedDescription: "A comprehensive SaaS platform designed for modern tech startups. Features clean, minimalist interface with powerful backend integration. Built with React, TypeScript, and optimized for performance.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      deliveryTime: "48 hours",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Analytics Integration"],
      projectUrl: "techstartup.demo"
    },
    {
      id: 2,
      title: "Mobile App",
      category: "UI/UX Design", 
      image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzU2MTg1MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Intuitive mobile experience design",
      detailedDescription: "Complete mobile app UI/UX design with focus on user experience and intuitive navigation. Includes prototyping, user journey mapping, and responsive mobile-first approach.",
      technologies: ["Figma", "Prototyping", "User Research", "Mobile Design"],
      deliveryTime: "72 hours",
      features: ["Mobile-First", "User Testing", "Interactive Prototypes", "Design System"],
      projectUrl: "mobileapp.demo"
    },
    {
      id: 3,
      title: "E-commerce",
      category: "Full Website",
      image: "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1NjE3MTczMnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Conversion-optimized online store",
      detailedDescription: "Full-featured e-commerce website with payment integration, inventory management, and conversion optimization. Built for maximum sales performance and user satisfaction.",
      technologies: ["React", "Stripe", "MongoDB", "Express.js"],
      deliveryTime: "96 hours",
      features: ["Payment Integration", "Inventory System", "Admin Dashboard", "Mobile Optimized"],
      projectUrl: "ecommerce.demo"
    },
    {
      id: 4,
      title: "Corporate",
      category: "Brand Identity",
      image: "https://images.unsplash.com/photo-1610387695018-3a90bf21c575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1NjIxODU5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Professional corporate presence",
      detailedDescription: "Complete corporate brand identity and website design. Includes logo design, brand guidelines, and professional website that establishes trust and credibility.",
      technologies: ["Brand Design", "WordPress", "SEO", "Analytics"],
      deliveryTime: "120 hours",
      features: ["Brand Guidelines", "Logo Design", "Corporate Website", "SEO Setup"],
      projectUrl: "corporate.demo"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-black"></div>
        <div className="w-1/2" style={{ backgroundColor: '#F5F5F5' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-8">
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
              color: '#F5F5F5',
              textShadow: `
                0 0 10px #FF0033,
                0 0 20px #FF0033
              `
            }}
          >
            PORTFOLIO
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-4">
          {portfolioItems.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Brutalist Frame with Neon Edges */}
                  <div 
                    className={`relative overflow-hidden border-4 transition-all duration-500 ${
                      hoveredCard === item.id ? 'scale-105' : ''
                    }`}
                    style={{ 
                      backgroundColor: '#F5F5F5',
                      borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                      boxShadow: hoveredCard === item.id 
                        ? `0 0 30px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}80, inset 0 0 30px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}20`
                        : `0 0 10px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}40`
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-64 sm:h-40 object-cover transition-all duration-500 ${
                          hoveredCard === item.id ? 'scale-110 brightness-110' : ''
                        }`}
                      />
                      
                      {/* Glitch Flicker Effect */}
                      {hoveredCard === item.id && (
                        <div 
                          className="absolute inset-0 opacity-20 animate-pulse"
                          style={{
                            background: `linear-gradient(45deg, #FF0033, transparent, #00FFFF, transparent)`,
                            mixBlendMode: 'overlay'
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Content Overlay */}
                    <div className="p-6 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="text-sm tracking-wide"
                          style={{ 
                            color: '#717182',
                            fontFamily: 'monospace'
                          }}
                        >
                          {item.category}
                        </span>
                        <span 
                          className="text-2xl"
                          style={{ 
                            color: '#FF0033',
                            textShadow: `0 0 10px #FF0033`
                          }}
                        >
                          光
                        </span>
                      </div>
                      
                      <h3 
                        className="text-2xl sm:text-xl font-black tracking-wide mb-2"
                        style={{ 
                          fontFamily: 'monospace',
                          color: '#000000'
                        }}
                      >
                        {item.title}
                      </h3>
                      
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: '#717182' }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Corner Accent */}
                    <div 
                      className={`absolute top-0 right-0 w-0 h-0 transition-all duration-300 ${
                        hoveredCard === item.id ? 'border-l-[30px] border-b-[30px]' : 'border-l-[20px] border-b-[20px]'
                      }`}
                      style={{ 
                        borderLeftColor: 'transparent',
                        borderBottomColor: index % 2 === 0 ? '#FF0033' : '#00FFFF'
                      }}
                    ></div>
                  </div>

                  {/* Neon Edge Glow */}
                  {hoveredCard === item.id && (
                    <div 
                      className="absolute inset-0 border-4 pointer-events-none"
                      style={{ 
                        borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                        filter: `blur(10px)`,
                        opacity: 0.7
                      }}
                    ></div>
                  )}
                </div>
              </DialogTrigger>

              {/* Modal Content */}
              <DialogContent 
                className="max-w-4xl w-full p-0 border-4 overflow-hidden max-h-[90vh] overflow-y-auto"
                style={{ 
                  backgroundColor: '#000000',
                  borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                  boxShadow: `0 0 50px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}60`
                }}
              >
                {/* Hidden accessibility components */}
                <DialogTitle className="sr-only">
                  {item.title} - {item.category}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {item.detailedDescription}
                </DialogDescription>

                {/* Modal Header */}
                <div 
                  className="relative p-8 border-b-4"
                  style={{ 
                    backgroundColor: '#F5F5F5',
                    borderBottomColor: index % 2 === 0 ? '#FF0033' : '#00FFFF'
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span 
                        className="text-sm tracking-wide mb-2 block"
                        style={{ 
                          color: '#717182',
                          fontFamily: 'monospace'
                        }}
                      >
                        {item.category}
                      </span>
                      <h3 
                        className="text-4xl font-black tracking-wide"
                        style={{ 
                          fontFamily: 'monospace',
                          color: '#000000'
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <span 
                      className="text-4xl"
                      style={{ 
                        color: '#FF0033',
                        textShadow: `0 0 15px #FF0033`
                      }}
                    >
                      力
                    </span>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Project Image */}
                    <div className="relative">
                      <div 
                        className="border-4 overflow-hidden"
                        style={{ 
                          borderColor: index % 2 === 0 ? '#00FFFF' : '#FF0033',
                          boxShadow: `0 0 20px ${index % 2 === 0 ? '#00FFFF' : '#FF0033'}40`
                        }}
                      >
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <h4 
                          className="text-xl font-black tracking-wide mb-3"
                          style={{ 
                            fontFamily: 'monospace',
                            color: '#F5F5F5'
                          }}
                        >
                          ABOUT PROJECT
                        </h4>
                        <p 
                          className="leading-relaxed"
                          style={{ color: '#F5F5F5' }}
                        >
                          {item.detailedDescription}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 
                          className="text-lg font-black tracking-wide mb-3"
                          style={{ 
                            fontFamily: 'monospace',
                            color: index % 2 === 0 ? '#FF0033' : '#00FFFF'
                          }}
                        >
                          TECHNOLOGIES
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1 border-2 text-sm font-black tracking-wide"
                              style={{ 
                                fontFamily: 'monospace',
                                backgroundColor: 'transparent',
                                borderColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                                color: '#F5F5F5'
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 
                          className="text-lg font-black tracking-wide mb-3"
                          style={{ 
                            fontFamily: 'monospace',
                            color: '#F5F5F5'
                          }}
                        >
                          KEY FEATURES
                        </h4>
                        <div className="space-y-2">
                          {item.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center">
                              <span 
                                className="w-2 h-2 mr-3"
                                style={{ 
                                  backgroundColor: index % 2 === 0 ? '#FF0033' : '#00FFFF',
                                  boxShadow: `0 0 10px ${index % 2 === 0 ? '#FF0033' : '#00FFFF'}`
                                }}
                              ></span>
                              <span 
                                className="font-black tracking-wide text-sm"
                                style={{ 
                                  fontFamily: 'monospace',
                                  color: '#F5F5F5'
                                }}
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="pt-4 border-t-2" style={{ borderColor: '#717182' }}>
                        <div className="flex justify-between items-center">
                          <div>
                            <span 
                              className="block text-sm font-black tracking-wide"
                              style={{ 
                                fontFamily: 'monospace',
                                color: '#717182'
                              }}
                            >
                              DELIVERY TIME
                            </span>
                            <span 
                              className="text-lg font-black tracking-wide"
                              style={{ 
                                fontFamily: 'monospace',
                                color: index % 2 === 0 ? '#FF0033' : '#00FFFF'
                              }}
                            >
                              {item.deliveryTime}
                            </span>
                          </div>
                          <div className="text-right">
                            <span 
                              className="block text-sm font-black tracking-wide"
                              style={{ 
                                fontFamily: 'monospace',
                                color: '#717182'
                              }}
                            >
                              DEMO URL
                            </span>
                            <span 
                              className="text-lg font-black tracking-wide"
                              style={{ 
                                fontFamily: 'monospace',
                                color: '#F5F5F5'
                              }}
                            >
                              {item.projectUrl}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div 
                  className="absolute top-0 left-0 w-8 h-8"
                  style={{ backgroundColor: index % 2 === 0 ? '#FF0033' : '#00FFFF' }}
                ></div>
                <div 
                  className="absolute top-0 right-0 w-8 h-8"
                  style={{ backgroundColor: index % 2 === 0 ? '#00FFFF' : '#FF0033' }}
                ></div>
                <div 
                  className="absolute bottom-0 left-0 w-8 h-8"
                  style={{ backgroundColor: index % 2 === 0 ? '#00FFFF' : '#FF0033' }}
                ></div>
                <div 
                  className="absolute bottom-0 right-0 w-8 h-8"
                  style={{ backgroundColor: index % 2 === 0 ? '#FF0033' : '#00FFFF' }}
                ></div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}