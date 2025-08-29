import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface ReCAPTCHAProviderProps {
  children: React.ReactNode;
}

export function ReCAPTCHAProvider({ children }: ReCAPTCHAProviderProps) {
  // Get reCAPTCHA key from environment variables or use default
  const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LfbbbcrAAAAAKi179-oSlNS-pBnbLfuuxLPwwjN';

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'body',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
