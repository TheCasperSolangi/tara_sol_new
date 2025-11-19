"use client"
import { useState } from 'react';
import { Shield, CheckCircle, Zap, Award, Clock, Users, Package, X, Send, Brain, Cpu, Sparkles, Bot } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext';

// Modal Component
const InquiryModal = ({ isOpen, onClose, serviceType }) => {
  const {t} = useLocalization();
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

  const countries = [
    {"country": "Pakistan", "code": "+92", "flag": "🇵🇰"},
    {"country": "United States", "code": "+1", "flag": "🇺🇸"},
    {"country": "United Kingdom", "code": "+44", "flag": "🇬🇧"},
    {"country": "India", "code": "+91", "flag": "🇮🇳"},
    {"country": "United Arab Emirates", "code": "+971", "flag": "🇦🇪"},
    {"country": "Saudi Arabia", "code": "+966", "flag": "🇸🇦"},
    {"country": "Canada", "code": "+1", "flag": "🇨🇦"},
    {"country": "Australia", "code": "+61", "flag": "🇦🇺"},
    {"country": "Germany", "code": "+49", "flag": "🇩🇪"},
    {"country": "France", "code": "+33", "flag": "🇫🇷"},
    {"country": "China", "code": "+86", "flag": "🇨🇳"},
    {"country": "Japan", "code": "+81", "flag": "🇯🇵"},
    {"country": "South Korea", "code": "+82", "flag": "🇰🇷"},
    {"country": "Singapore", "code": "+65", "flag": "🇸🇬"},
    {"country": "Malaysia", "code": "+60", "flag": "🇲🇾"},
    {"country": "Turkey", "code": "+90", "flag": "🇹🇷"},
    {"country": "Egypt", "code": "+20", "flag": "🇪🇬"},
    {"country": "South Africa", "code": "+27", "flag": "🇿🇦"},
    {"country": "Brazil", "code": "+55", "flag": "🇧🇷"},
    {"country": "Mexico", "code": "+52", "flag": "🇲🇽"}
  ];

  const filteredCountries = countries.filter(country => 
    country.country.toLowerCase().includes(searchCountry.toLowerCase()) ||
    country.code.includes(searchCountry)
  );

  const selectedCountry = countries.find(c => c.code === formData.countryCode) || countries[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode}${formData.phoneNumber}`,
          course: formData.projectIdea,
          technology:  'Not specified',
          category: 'Not specified',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t('submitError'));
      }

      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        onClose();
        setFormData({ fullName: '', email: '', countryCode: '+92', phoneNumber: '', message: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || t('submitError'));
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setFormData({ fullName: '', email: '', countryCode: '+92', phoneNumber: '', projectIdea: '', budget: '', timeline: '' });
      setSubmitError('');
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
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">{t('shareYourVision')}</h2>
                  </div>
                  <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="text-white/80 hover:text-white transition-colors disabled:opacity-50 bg-white/10 hover:bg-white/20 rounded-full p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-purple-100 text-sm">{t('tellUsAbout')} {serviceType} {t('project')}</p>
              </div>
            </div>

            <div className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('fullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('emailAddress')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('phoneNumber')} <span className="text-red-500">*</span>
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
                            placeholder={t('searchCountry')}
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
                              onClick={() => {
                                setFormData({...formData, countryCode: country.code});
                                setShowCountryDropdown(false);
                                setSearchCountry('');
                              }}
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
                  
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    placeholder="3001234567"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t('yourProjectIdea')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.projectIdea}
                  onChange={(e) => setFormData({...formData, projectIdea: e.target.value})}
                  placeholder={t('projectPlaceholder')}
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 resize-none transition-all"
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
                    {t('sendingVision')}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    {t('submitVision')}
                  </div>
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                {t('bySubmitting')}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 px-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('visionReceived')}</h3>
            <p className="text-gray-600 mb-6">{t('thankYouMessage')}</p>
            <div className="space-y-3 mb-8">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">{t('confirmationSent')}</p>
                <p className="font-semibold text-purple-700">{formData.email}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-600">
                  ⏱️ {t('reviewTime')} <span className="font-bold">{t('hours')}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AIServices() {
  const {t} = useLocalization();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const aiServices = [
    { 
      icon: Brain,
      name: t('mlSolutions'), 
      description: t('mlDesc')
    },
    { 
      icon: Bot,
      name: t('chatbots'), 
      description: t('chatbotsDesc')
    },
    { 
      icon: Cpu,
      name: t('computerVision'), 
      description: t('computerVisionDesc')
    },
    { 
      icon: Sparkles,
      name: t('nlp'), 
      description: t('nlpDesc')
    }
  ];

  const features = [
    {
      icon: Brain,
      title: t('cuttingEdge'),
      description: t('cuttingEdgeDesc')
    },
    {
      icon: Zap,
      title: t('rapidDevelopment'),
      description: t('rapidDevelopmentDesc')
    },
    {
      icon: Award,
      title: t('expertTeam'),
      description: t('expertTeamDesc')
    },
    {
      icon: Shield,
      title: t('secureScalable'),
      description: t('secureScalableDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceType="AI" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-purple-100 px-6 py-3">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">{t('poweredBy')}</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              {t('transformBusiness')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {t('withAI')}
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl">
              {t('heroDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                {t('shareAIVision')}
              </button>
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">{t('projectsDelivered')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-600">95%</div>
                <div className="text-sm text-gray-600">{t('clientSatisfaction')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600">10+</div>
                <div className="text-sm text-gray-600">{t('aiSpecialists')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-600">24/7</div>
                <div className="text-sm text-gray-600">{t('supportAvailable')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              {t('ourCapabilities')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('capabilitiesDesc')}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aiServices.map((service, index) => {
              const Icon = service.icon;
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
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center shadow-2xl">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-white" />
            <h3 className="mb-4 text-3xl font-bold text-white">
              {t('uniqueProject')}
            </h3>
            <p className="mb-8 text-lg text-purple-100">
              {t('uniqueProjectDesc')}
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-white px-10 py-4 text-lg font-semibold text-purple-700 shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              {t('tellUsIdea')}
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              {t('whyChoose')}
            </h2>
            <p className="text-lg text-purple-100">
              {t('whyChooseDesc')}
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
              {t('readyToInnovate')}
            </h3>
            <p className="mb-8 text-lg text-gray-600">
              {t('readyToInnovateDesc')}
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              {t('startJourney')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}