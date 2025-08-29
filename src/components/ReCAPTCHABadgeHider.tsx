import { useEffect } from 'react';

export function ReCAPTCHABadgeHider() {
  useEffect(() => {
    // Hide reCAPTCHA badge after component mounts
    const hideBadge = () => {
      const badge = document.querySelector('.grecaptcha-badge');
      if (badge) {
        (badge as HTMLElement).style.visibility = 'hidden';
        (badge as HTMLElement).style.opacity = '0';
        (badge as HTMLElement).style.display = 'none';
      }
    };

    // Hide immediately
    hideBadge();

    // Also hide after a short delay to ensure script has loaded
    const timer = setTimeout(hideBadge, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}
