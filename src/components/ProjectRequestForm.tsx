import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { verifyRecaptchaToken } from '../utils/recaptcha';
import { trackFormSubmission, trackButtonClick } from '../utils/analytics';

interface ProjectRequestFormProps {
  children: React.ReactNode;
}

export function ProjectRequestForm({ children }: ProjectRequestFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pricingType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not loaded');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha('form_submit');
      const isValid = await verifyRecaptchaToken(token);
      
      if (!isValid) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Инициализация EmailJS
      emailjs.init("RD9DdON7C7qrN5ymR"); // Ваш Public Key

      const templateParams = {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email,
        pricing_type: formData.pricingType,
        message: `New request from DREAM DIGITAL website:
        
Name/Company: ${formData.name}
Phone/WhatsApp: ${formData.phone}
Email: ${formData.email || 'Not provided'}
Pricing Type: ${formData.pricingType || 'Not selected'}

Date: ${new Date().toLocaleString('en-US')}`
      };

      await emailjs.send(
        'service_nmiednf', // Ваш Service ID
        'template_elpmtff', // Ваш Template ID
        templateParams
      );

      // Сохраняем заявку в localStorage для админ панели
      const newLead = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        pricingType: formData.pricingType,
        date: new Date().toISOString(),
        status: 'new' as const
      };

      const existingLeads = localStorage.getItem('dream_digital_leads');
      const leads = existingLeads ? JSON.parse(existingLeads) : [];
      leads.push(newLead);
      localStorage.setItem('dream_digital_leads', JSON.stringify(leads));

      // Track form submission for analytics
      const analyticsData = localStorage.getItem('dream_digital_analytics');
      if (analyticsData) {
        const analytics = JSON.parse(analyticsData);
        analytics.totalSubmissions += 1;
        analytics.lastSubmissionDate = new Date().toISOString();
        analytics.conversionRate = analytics.totalPageViews > 0 ? (analytics.totalSubmissions / analytics.totalPageViews) * 100 : 0;
        localStorage.setItem('dream_digital_analytics', JSON.stringify(analytics));
      }

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', pricingType: '' });
      
      // Track successful form submission
      trackFormSubmission('project_request');
      
      // Закрыть модальное окно через 3 секунды
      setTimeout(() => {
        setSubmitStatus('idle');
        const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
        if (dialog) {
          dialog.click();
        }
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent 
        className="max-w-lg w-full p-0 border-4 overflow-hidden"
        style={{ 
          backgroundColor: '#000000',
          borderColor: '#00FFFF',
          boxShadow: `0 0 50px #00FFFF60`
        }}
      >
        {/* Hidden accessibility components */}
        <DialogTitle className="sr-only">
          Project Request Form - Your New Website Starts Here
        </DialogTitle>
        <DialogDescription className="sr-only">
          Submit your project requirements for fast delivery, modern design, and full support.
        </DialogDescription>

        {/* Form Header */}
        <div 
          className="relative p-8 border-b-4"
          style={{ 
            backgroundColor: '#F5F5F5',
            borderBottomColor: '#00FFFF'
          }}
        >
          <div className="text-center">
            <h3 
              className="text-3xl font-black tracking-wide mb-2"
              style={{ 
                fontFamily: 'monospace',
                color: '#000000'
              }}
            >
              Your New Website Starts Here
            </h3>
            <p 
              className="text-sm opacity-70"
              style={{ 
                color: '#717182',
                fontFamily: 'monospace'
              }}
            >
              Fast delivery, modern design, full support.
            </p>
          </div>
          
          {/* Corner Kanji */}
          <span 
            className="absolute top-4 right-4 text-2xl"
            style={{ 
              color: '#FF0033',
              textShadow: '0 0 10px #FF0033'
            }}
          >
            力
          </span>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div 
              className="mb-6 p-4 border-2 text-center"
              style={{ 
                backgroundColor: '#00FFFF10',
                borderColor: '#00FFFF',
                color: '#00FFFF'
              }}
            >
              <div className="text-lg font-black mb-2">✓ REQUEST SENT!</div>
              <div className="text-sm">We'll contact you soon</div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div 
              className="mb-6 p-4 border-2 text-center"
              style={{ 
                backgroundColor: '#FF003310',
                borderColor: '#FF0033',
                color: '#FF0033'
              }}
            >
              <div className="text-lg font-black mb-2">✗ SUBMISSION ERROR</div>
              <div className="text-sm">Try again or contact us directly</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name/Company Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="name"
                className="font-black tracking-wide"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#F5F5F5'
                }}
              >
                NAME / COMPANY *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                disabled={isSubmitting}
                className="border-2 bg-transparent font-black tracking-wide"
                style={{ 
                  fontFamily: 'monospace',
                  borderColor: '#00FFFF',
                  color: '#F5F5F5',
                  boxShadow: `0 0 10px #00FFFF20`
                }}
                placeholder="Enter your name or company"
              />
            </div>

            {/* Phone/WhatsApp Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="phone"
                className="font-black tracking-wide"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#F5F5F5'
                }}
              >
                PHONE / WHATSAPP *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                disabled={isSubmitting}
                className="border-2 bg-transparent font-black tracking-wide"
                style={{ 
                  fontFamily: 'monospace',
                  borderColor: '#FF0033',
                  color: '#F5F5F5',
                  boxShadow: `0 0 10px #FF003320`
                }}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Email Field (Optional) */}
            <div className="space-y-2">
              <Label 
                htmlFor="email"
                className="font-black tracking-wide"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#717182'
                }}
              >
                EMAIL (OPTIONAL)
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isSubmitting}
                className="border-2 bg-transparent font-black tracking-wide"
                style={{ 
                  fontFamily: 'monospace',
                  borderColor: '#717182',
                  color: '#F5F5F5',
                  boxShadow: `0 0 5px #71718220`
                }}
                placeholder="your.email@domain.com"
              />
            </div>

            {/* Pricing Type Dropdown */}
            <div className="space-y-2">
              <Label 
                className="font-black tracking-wide"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#F5F5F5'
                }}
              >
                PRICING TYPE (OPTIONAL)
              </Label>
              <Select 
                onValueChange={(value) => handleInputChange('pricingType', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger 
                  className="border-2 bg-transparent font-black tracking-wide"
                  style={{ 
                    fontFamily: 'monospace',
                    borderColor: '#00FFFF',
                    color: '#F5F5F5',
                    boxShadow: `0 0 10px #00FFFF20`
                  }}
                >
                  <SelectValue placeholder="Select pricing option" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF',
                    border: '2px solid'
                  }}
                >
                  <SelectItem 
                    value="lite"
                    className="font-black tracking-wide"
                    style={{ 
                      fontFamily: 'monospace',
                      color: '#F5F5F5'
                    }}
                  >
                    Lite - $300
                  </SelectItem>
                  <SelectItem 
                    value="standard"
                    className="font-black tracking-wide"
                    style={{ 
                      fontFamily: 'monospace',
                      color: '#F5F5F5'
                    }}
                  >
                    Standard - $700
                  </SelectItem>
                  <SelectItem 
                    value="pro"
                    className="font-black tracking-wide"
                    style={{ 
                      fontFamily: 'monospace',
                      color: '#F5F5F5'
                    }}
                  >
                    Pro - $1500+
                  </SelectItem>
                  <SelectItem 
                    value="custom"
                    className="font-black tracking-wide"
                    style={{ 
                      fontFamily: 'monospace',
                      color: '#F5F5F5'
                    }}
                  >
                    Custom (Individual)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 border-4 font-black tracking-wide transition-all duration-300 hover:scale-105 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                fontFamily: 'monospace',
                backgroundColor: 'transparent',
                borderColor: '#00FFFF',
                color: '#00FFFF',
                boxShadow: `0 0 20px #00FFFF40`,
                textShadow: `0 0 10px #00FFFF`
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow = `0 0 30px #00FFFF80, inset 0 0 30px #00FFFF20`;
                  e.currentTarget.style.backgroundColor = '#00FFFF10';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow = `0 0 20px #00FFFF40`;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                  SENDING...
                </>
              ) : (
                <>
                  SUBMIT REQUEST
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </>
              )}
            </button>

            {/* Trust Note */}
            <p 
              className="text-xs text-center opacity-60 mt-4"
              style={{ 
                color: '#717182',
                fontFamily: 'monospace'
              }}
            >
              We never share your information with third parties.
            </p>
          </form>
        </div>

        {/* Corner Accents */}
        <div 
          className="absolute top-0 left-0 w-6 h-6"
          style={{ backgroundColor: '#FF0033' }}
        ></div>
        <div 
          className="absolute top-0 right-0 w-6 h-6"
          style={{ backgroundColor: '#00FFFF' }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-6 h-6"
          style={{ backgroundColor: '#00FFFF' }}
        ></div>
        <div 
          className="absolute bottom-0 right-0 w-6 h-6"
          style={{ backgroundColor: '#FF0033' }}
        ></div>
      </DialogContent>
    </Dialog>
  );
}