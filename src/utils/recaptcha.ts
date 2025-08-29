export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    return token && token.length > 0;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function verifyRecaptchaOnServer(token: string): Promise<boolean> {
  try {
    const SECRET_KEY = '6LfbbbcrAAAAAE-S31GWTt1aJKVuO3US2zoWjldD'; // Your Secret Key
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${SECRET_KEY}&response=${token}`,
    });
    
    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA API error:', error);
    return false;
  }
}
