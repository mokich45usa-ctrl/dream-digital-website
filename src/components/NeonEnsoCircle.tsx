interface NeonEnsoCircleProps {
  className?: string;
  color: string;
  size: number;
  enhanced?: boolean;
}

export function NeonEnsoCircle({ className, color, size, enhanced = false }: NeonEnsoCircleProps) {
  const enhancedAnimations = enhanced ? 'neon-enso-enhanced animate-pulse' : 'animate-pulse';
  
  return (
    <div className={`${className} ${enhanced ? 'group' : ''}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
        className={enhancedAnimations}
        style={{ 
          filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
          transition: 'all 0.5s ease-in-out'
        }}
      >
        {/* Enso Circle - intentionally incomplete for authenticity */}
        <path
          d="M 20 50 A 25 25 0 1 1 75 25"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M 75 25 A 25 25 0 0 1 20 50"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
        
        {/* Additional neon glow layers */}
        <path
          d="M 20 50 A 25 25 0 1 1 75 25"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}