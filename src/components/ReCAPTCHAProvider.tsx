import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface ReCAPTCHAProviderProps {
  children: React.ReactNode;
}

export function ReCAPTCHAProvider({ children }: ReCAPTCHAProviderProps) {
  // Use different keys for development and production
  const SITE_KEY = process.env.NODE_ENV === 'production' 
    ? '6LfbbbcrAAAAAKi179-oSlNS-pBnbLfuuxLPwwjN' // Production key (update with your domain)
    : '6LfbbbcrAAAAAKi179-oSlNS-pBnbLfuuxLPwwjN'; // Development key

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
