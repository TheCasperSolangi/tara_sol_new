"use client"
import { useState } from 'react';
import { Shield, CheckCircle, Zap, Award, Clock, Users, Package, X, Send, Sparkle } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext';

// Modal Component
const InquiryModal = ({ isOpen, onClose, serviceType }) => {
  const {t }= useLocalization();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+92',
    phoneNumber: '',
    projectIdea: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [phoneError, setPhoneError] = useState(''); // Added for phone validation errors
  const countries = [
    {"country": "Pakistan", "code": "+92", "flag": "🇵🇰", "pattern": /^0[0-9]{10}$/,  "placeholder": "0304 2441491", "example": "03042441491", "removeLeadingZero": true},
    {"country": "United States", "code": "+1", "flag": "🇺🇸", "pattern": /^[0-9]{10}$/, "placeholder": "202 555 0123", "example": "2025550123"},
    {"country": "United Kingdom", "code": "+44", "flag": "🇬🇧", "pattern": /^[0-9]{10,11}$/, "placeholder": "20 7123 4567", "example": "2071234567", "removeLeadingZero": true},
    {"country": "India", "code": "+91", "flag": "🇮🇳", "pattern": /^[0-9]{10}$/, "placeholder": "98 7654 3210", "example": "9876543210"},
    {"country": "United Arab Emirates", "code": "+971", "flag": "🇦🇪", "pattern": /^[0-9]{9}$/, "placeholder": "50 123 4567", "example": "501234567"},
    {"country": "Saudi Arabia", "code": "+966", "flag": "🇸🇦", "pattern": /^[0-9]{9}$/, "placeholder": "55 123 4567", "example": "551234567"},
    {"country": "Canada", "code": "+1", "flag": "🇨🇦", "pattern": /^[0-9]{10}$/, "placeholder": "204 555 0123", "example": "2045550123"},
    {"country": "Australia", "code": "+61", "flag": "🇦🇺", "pattern": /^[0-9]{10}$/, "placeholder": "412 345 678", "example": "0412345678", "removeLeadingZero": true},
    {"country": "Germany", "code": "+49", "flag": "🇩🇪", "pattern": /^[0-9]{10,11}$/, "placeholder": "151 12345678", "example": "15112345678", "removeLeadingZero": true},
    {"country": "France", "code": "+33", "flag": "🇫🇷", "pattern": /^[0-9]{10}$/, "placeholder": "6 12 34 56 78", "example": "0612345678", "removeLeadingZero": true},
    {"country": "China", "code": "+86", "flag": "🇨🇳", "pattern": /^[0-9]{11}$/, "placeholder": "131 2345 6789", "example": "13123456789"},
    {"country": "Japan", "code": "+81", "flag": "🇯🇵", "pattern": /^[0-9]{10,11}$/, "placeholder": "90 1234 5678", "example": "9012345678", "removeLeadingZero": true},
    {"country": "South Korea", "code": "+82", "flag": "🇰🇷", "pattern": /^[0-9]{9,10}$/, "placeholder": "10 1234 5678", "example": "1012345678"},
    {"country": "Singapore", "code": "+65", "flag": "🇸🇬", "pattern": /^[0-9]{8}$/, "placeholder": "8123 4567", "example": "81234567"},
    {"country": "Malaysia", "code": "+60", "flag": "🇲🇾", "pattern": /^[0-9]{9,10}$/, "placeholder": "12 345 6789", "example": "123456789", "removeLeadingZero": true},
    {"country": "Turkey", "code": "+90", "flag": "🇹🇷", "pattern": /^[0-9]{10}$/, "placeholder": "501 234 5678", "example": "5012345678", "removeLeadingZero": true},
    {"country": "Egypt", "code": "+20", "flag": "🇪🇬", "pattern": /^[0-9]{10}$/, "placeholder": "10 1234 5678", "example": "1012345678", "removeLeadingZero": true},
    {"country": "South Africa", "code": "+27", "flag": "🇿🇦", "pattern": /^[0-9]{9}$/, "placeholder": "71 123 4567", "example": "711234567", "removeLeadingZero": true},
    {"country": "Brazil", "code": "+55", "flag": "🇧🇷", "pattern": /^[0-9]{10,11}$/, "placeholder": "11 91234 5678", "example": "11912345678"},
    {"country": "Mexico", "code": "+52", "flag": "🇲🇽", "pattern": /^[0-9]{10}$/, "placeholder": "55 1234 5678", "example": "5512345678"}
  ];

  // Get selected country details
  const selectedCountry = countries.find(c => c.code === formData.countryCode) || countries[0];

  // Phone number formatting function
  const formatPhoneNumber = (value, countryCode) => {
    const country = countries.find(c => c.code === countryCode) || countries[0];
    let numbers = value.replace(/\D/g, '');
    
    // Apply country-specific formatting
    switch (countryCode) {
      case '+1': // US/Canada
        if (numbers.length > 3 && numbers.length <= 6) {
          return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
        } else if (numbers.length > 6) {
          return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
        }
        return numbers;
      case '+44': // UK
        if (numbers.length > 4 && numbers.length <= 7) {
          return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
        } else if (numbers.length > 7) {
          return `${numbers.slice(0, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7, 11)}`;
        }
        return numbers;
      case '+92': // Pakistan
        if (numbers.length > 4) {
          return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
        }
        return numbers;
      case '+91': // India
        if (numbers.length > 5) {
          return `${numbers.slice(0, 5)} ${numbers.slice(5, 10)}`;
        }
        return numbers;
      default:
        // Default formatting for other countries
        if (numbers.length > 4) {
          const chunks = [];
          for (let i = 0; i < numbers.length; i += 4) {
            chunks.push(numbers.slice(i, i + 4));
          }
          return chunks.join(' ');
        }
        return numbers;
    }
  };

  // Phone number validation function
  const validatePhoneNumber = (phoneNumber, countryCode) => {
    const country = countries.find(c => c.code === countryCode) || countries[0];
    
    // Remove all non-digit characters for validation
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    if (!cleanNumber) {
      return { isValid: false, error: t('customSolutionsModalPhoneRequired') || 'Phone number is required' };
    }
    
    if (!country.pattern.test(cleanNumber)) {
      return { 
        isValid: false, 
        error: t('customSolutionsModalPhoneInvalid') || `Invalid phone number format for ${country.country}. Example: ${country.example}` 
      };
    }
    
    return { isValid: true, error: '' };
  };

  // Handle phone number input change with formatting
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value, formData.countryCode);
    
    setFormData(prev => ({
      ...prev,
      phoneNumber: formattedValue
    }));
    
    // Clear error when user starts typing
    if (phoneError) {
      const validation = validatePhoneNumber(formattedValue, formData.countryCode);
      if (validation.isValid) {
        setPhoneError('');
      }
    }
  };

  // Handle country code change
  const handleCountryCodeChange = (code) => {
    const newFormatted = formatPhoneNumber(formData.phoneNumber.replace(/\D/g, ''), code);
    const validation = validatePhoneNumber(newFormatted, code);
    
    setFormData(prev => ({
      ...prev,
      countryCode: code,
      phoneNumber: newFormatted
    }));
    
    if (!validation.isValid) {
      setPhoneError(validation.error);
    } else {
      setPhoneError('');
    }
    setShowCountryDropdown(false);
    setSearchCountry('');
  };


  const filteredCountries = countries.filter(country => 
    country.country.toLowerCase().includes(searchCountry.toLowerCase()) ||
    country.code.includes(searchCountry)
  );

  // Validate all form fields before submission
  const validateForm = () => {
    // Validate phone number
    const phoneValidation = validatePhoneNumber(formData.phoneNumber, formData.countryCode);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error);
      return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError(t('customSolutionsModalEmailInvalid') || 'Please enter a valid email address');
      return false;
    }
    
    // Validate required fields
    const requiredFields = ['fullName', 'projectIdea', 'budget', 'timeline'];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setSubmitError(`${field.replace(/([A-Z])/g, ' $1')} is required`);
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setSubmitError('');
    setPhoneError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Clean phone number (remove spaces, dashes, etc.)
      let cleanPhoneNumber = formData.phoneNumber.replace(/\D/g, '');
      let nationalNumber = cleanPhoneNumber;
      if (selectedCountry.removeLeadingZero && nationalNumber.startsWith('0')) {
        nationalNumber = nationalNumber.slice(1);
      }
      const fullPhoneNumber = `${formData.countryCode}${nationalNumber}`;

      const response = await fetch('/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber,
          phoneCountryCode: formData.countryCode,
          phoneLocalNumber: cleanPhoneNumber,
          projectIdea: formData.projectIdea,
          budget: formData.budget,
          timeline: formData.timeline,
          technology: 'Not specified',
          category: 'Not specified',
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t('customSolutionsModalSubmitError') || 'Failed to send inquiry');
      }

      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        onClose();
        setFormData({ 
          fullName: '', 
          email: '', 
          countryCode: '+92', 
          phoneNumber: '', 
          projectIdea: '', 
          budget: '', 
          timeline: '' 
        });
        setPhoneError('');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || t('customSolutionsModalSubmitError') || 'Failed to send inquiry. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setFormData({ 
        fullName: '', 
        email: '', 
        countryCode: '+92', 
        phoneNumber: '', 
        projectIdea: '', 
        budget: '', 
        timeline: '' 
      });
      setSubmitError('');
      setPhoneError('');
      setIsSubmitted(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {!isSubmitted ? (
          <div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                      <Sparkle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">{t('customSolutionsModalTitle')}</h2>
                  </div>
                  <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="text-white/80 hover:text-white transition-colors disabled:opacity-50 bg-white/10 hover:bg-white/20 rounded-full p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-purple-100 text-sm">{t('customSolutionsModalSubtitle').replace('{serviceType}', serviceType)}</p>
              </div>
            </div>

            <div className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('customSolutionsModalFullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder={t('customSolutionsModalFullNamePlaceholder')}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('customSolutionsModalEmailAddress')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder={t('customSolutionsModalEmailPlaceholder')}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('customSolutionsModalPhoneNumber')} <span className="text-red-500">*</span>
                  <span className="ml-2 text-xs text-gray-500">
                    Example: {selectedCountry.example}
                  </span>
                </label>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      disabled={isSubmitting}
                      className="h-full px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all bg-white flex items-center gap-2 min-w-[140px]"
                    >
                      <span className="text-2xl">{selectedCountry.flag}</span>
                      <span className="font-medium text-gray-700">{selectedCountry.code}</span>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-10 max-h-80 overflow-hidden">
                        <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
                          <input
                            type="text"
                            placeholder={t('customSolutionsModalSearchCountry') || "Search country..."}
                            value={searchCountry}
                            onChange={(e) => setSearchCountry(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <div className="overflow-y-auto max-h-64">
                          {filteredCountries.map((country, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleCountryCodeChange(country.code)}
                              className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 ${
                                formData.countryCode === country.code ? 'bg-purple-100' : ''
                              }`}
                            >
                              <span className="text-2xl">{country.flag}</span>
                              <span className="flex-1 font-medium text-gray-700">{country.country}</span>
                              <span className="text-gray-500 text-sm">{country.code}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder={selectedCountry.placeholder}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
                      onBlur={() => {
                        const validation = validatePhoneNumber(formData.phoneNumber, formData.countryCode);
                        if (!validation.isValid) {
                          setPhoneError(validation.error);
                        }
                      }}
                    />
                    {phoneError && (
                      <p className="mt-1 text-sm text-red-600 animate-in fade-in duration-200">
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>
              </div>


              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('customSolutionsModalProjectIdea')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.projectIdea}
                  onChange={(e) => setFormData({...formData, projectIdea: e.target.value})}
                  placeholder={t('customSolutionsModalProjectIdeaPlaceholder')}
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 resize-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('customSolutionsModalBudget')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder={t('customSolutionsModalBudgetPlaceholder')}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('customSolutionsModalTimeline')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  placeholder={t('customSolutionsModalTimelinePlaceholder')}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
                />
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-in slide-in-from-top duration-300">
                  <p className="text-sm text-red-600 flex items-center">
                    <X className="w-4 h-4 mr-2 flex-shrink-0" />
                    {submitError}
                  </p>
                </div>
              )}

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('customSolutionsModalSending')}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    {t('customSolutionsModalSubmitVision')}
                  </div>
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                {t('customSolutionsModalTermsAgreement')}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 px-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('customSolutionsModalSuccessTitle')}</h3>
            <p className="text-gray-600 mb-6">{t('customSolutionsModalSuccessMessage')}</p>
            <div className="space-y-3 mb-8">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">{t('customSolutionsModalConfirmationSent')}</p>
                <p className="font-semibold text-purple-700">{formData.email}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-600">
                  ⏱️ {t('customSolutionsModalResponseTime')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default function EBadgeIDService() {
  const { t } = useLocalization();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { 
      icon: Award,
      name: t('ebadgeid.digitalBadges'), 
      count: "1000+",
      description: t('ebadgeid.digitalBadgesDesc')
    },
    { 
      icon: CheckCircle,
      name: t('ebadgeid.digitalCertificates'), 
      count: "500+",
      description: t('ebadgeid.digitalCertificatesDesc')
    },
    { 
      icon: Shield,
      name: t('ebadgeid.securedContracts'), 
      count: "300+",
      description: t('ebadgeid.securedContractsDesc')
    },
    { 
      icon: Zap,
      name: t('ebadgeid.credentialManagement'), 
      count: "200+",
      description: t('ebadgeid.credentialManagementDesc')
    }
  ];

  const features = [
    {
      icon: Shield,
      title: t('ebadgeid.secureVerificationTitle'),
      description: t('ebadgeid.secureVerificationDesc')
    },
    {
      icon: Zap,
      title: t('ebadgeid.instantIssuanceTitle'),
      description: t('ebadgeid.instantIssuanceDesc')
    },
    {
      icon: Award,
      title: t('ebadgeid.lifetimeAccessTitle'),
      description: t('ebadgeid.lifetimeAccessDesc')
    },
    {
      icon: Clock,
      title: t('ebadgeid.24/7AvailabilityTitle'),
      description: t('ebadgeid.24/7AvailabilityDesc')
    }
  ];

  const handleTryNow = () => {
    window.location.href = 'https://onboarding.ebadgeid.com';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-purple-100 px-6 py-3">
              <svg className="h-8 w-8" viewBox="0 0 23 23" fill="none">
                <path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z" fill="#7C3AED"/>
              </svg>
              <span className="text-sm font-semibold text-purple-700">{t('ebadgeid.trustedBy')}</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              {t('ebadgeid.heroTitle1')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {t('ebadgeid.heroTitle2')}
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl">
              {t('ebadgeid.heroDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={handleTryNow}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                {t('ebadgeid.tryNow')}
              </button>
          
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-600">1000+</div>
                <div className="text-sm text-gray-600">{t('ebadgeid.credentialsIssued')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-600">10K+</div>
                <div className="text-sm text-gray-600">{t('ebadgeid.activeUsers')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600">99.9%</div>
                <div className="text-sm text-gray-600">{t('ebadgeid.verificationRate')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-600">24/7</div>
                <div className="text-sm text-gray-600">{t('ebadgeid.supportAvailable')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              {t('ebadgeid.servicesTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('ebadgeid.servicesDescription')}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative overflow-hidden rounded-2xl border-2 bg-white p-8 transition-all duration-300 cursor-pointer ${
                    hoveredCard === index
                      ? 'border-purple-500 shadow-2xl scale-105'
                      : 'border-gray-200 shadow-md'
                  }`}
                >
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 p-4">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center shadow-2xl">
            <h3 className="mb-4 text-3xl font-bold text-white">
              {t('ebadgeid.customNeedsTitle')}
            </h3>
            <p className="mb-8 text-lg text-purple-100">
              {t('ebadgeid.customNeedsDesc')}
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-white px-10 py-4 text-lg font-semibold text-purple-700 shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              {t('ebadgeid.requestCustom')}
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              {t('ebadgeid.whyChooseUsTitle')}
            </h2>
            <p className="text-lg text-purple-100">
              {t('ebadgeid.whyChooseUsDesc')}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white/10 backdrop-blur-lg p-8 transition-all hover:bg-white/20 hover:scale-105"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-white/20 p-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-purple-100">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-16 rounded-3xl bg-white p-12 text-center shadow-2xl">
            <Users className="mx-auto mb-6 h-16 w-16 text-purple-600" />
            <h3 className="mb-4 text-3xl font-bold text-gray-900">
              {t('ebadgeid.readyToStartTitle')}
            </h3>
            <p className="mb-8 text-lg text-gray-600">
              {t('ebadgeid.readyToStartDesc')}
            </p>
            <button 
              onClick={handleTryNow}
              className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              {t('ebadgeid.tryNow')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}