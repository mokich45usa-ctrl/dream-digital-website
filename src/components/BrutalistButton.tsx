import { forwardRef } from 'react';

interface BrutalistButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  glowColor: string;
  onClick?: () => void;
}

export const BrutalistButton = forwardRef<HTMLButtonElement, BrutalistButtonProps>(
  function BrutalistButton({ children, variant, glowColor, onClick }, ref) {
  const isPrimary = variant === 'primary';
  const isViewPricing = children === 'VIEW PRICING';
  
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`
        relative px-8 py-4 font-black tracking-wider uppercase
        border-2 transition-all duration-300 group
        ${isPrimary 
          ? 'bg-black text-white border-white hover:bg-white hover:text-black' 
          : 'bg-transparent border-black hover:bg-black hover:text-white'
        }
        ${isViewPricing ? 'view-pricing-button' : ''}
      `}
      style={{
        fontFamily: 'monospace',
        boxShadow: `
          0 0 0 transparent,
          inset 0 0 0 transparent
        `,
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `
          0 0 20px ${glowColor},
          0 0 40px ${glowColor},
          inset 0 0 20px ${glowColor}40
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `
          0 0 0 transparent,
          inset 0 0 0 transparent
        `;
      }}
    >
      {/* Top-left corner accent */}
      <div 
        className="absolute -top-1 -left-1 w-4 h-4 transition-all duration-300 group-hover:w-6 group-hover:h-6"
        style={{ backgroundColor: glowColor }}
      ></div>
      
      {/* Bottom-right corner accent */}
      <div 
        className="absolute -bottom-1 -right-1 w-4 h-4 transition-all duration-300 group-hover:w-6 group-hover:h-6"
        style={{ backgroundColor: glowColor }}
      ></div>
      
      <span className="relative z-10">{children}</span>
    </button>
  );
});