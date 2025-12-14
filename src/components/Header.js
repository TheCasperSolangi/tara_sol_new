'use client';

import { useState, useEffect } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { Menu, X, Search, Globe, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  const { t, language, setLanguage, availableLanguages } = useLocalization();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  // Complete language data with fallbacks
  const languageData = {
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' }
    // Add more languages as needed
  };

  // Safe language data access with fallbacks
  const getLanguageData = (lang) => {
    return languageData[lang] || {
      name: lang.toUpperCase(),
      flag: '🌐' // Default globe emoji for unknown languages
    };
  };

  const navigation = [
    { name: 'home', href: '/' },
    { name: 'about', href: '/about' },
    {
      name: 'services',
      href: '/international_certifications',
      children: [
        { name: `${t('intCert')}`, href: '/international_certifications' },
        { name: `${t('execPrograms')}`, href: '/executive_programs' },
        { name: `${t('microsoftLicense')}`, href: '/microsoft_licenses' },
        { name: `${t('customService')}`, href: '/custom_solutions' },
        { name: `${t('ai_services')}`, href: "/ai_services" },
        { name: "eBadge ID", href:"/ebadgeid"}
      ]
    },
    { name: 'contact', href: '/contact' },
  ];

  // Get current language data safely
  const currentLanguageData = getLanguageData(language);

  // Handle logo load completion
  const handleLogoLoad = () => {
    setIsLogoLoaded(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Bigger and Clearer with Animations */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <motion.div
                className="relative"
                initial={{ scale: 0.8, rotate: 0 }}
                animate={{
                  scale: 1,
                  rotate: isLogoLoaded ? 0 : 360,
                }}
                transition={{
                  rotate: {
                    duration: 1,
                    ease: "easeOut",
                    times: [0, 0.3, 1],
                    repeat: 0
                  },
                  scale: {
                    duration: 0.5,
                    delay: 0.3
                  }
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onAnimationComplete={() => setIsLogoLoaded(true)}
              >
                <Image
                  src="/assets/brands/main_logo.png"
                  alt="Your Logo"
                  width={267}
                  height={80}
                  className="h-20 w-auto object-contain cursor-pointer"
                  priority
                  onLoadingComplete={handleLogoLoad}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>
              {/* Fallback text logo */}
              <div className="hidden text-xl font-bold text-gray-900">
                Your Brand
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setIsServicesDropdownOpen(true)}
                onMouseLeave={() => item.children && setIsServicesDropdownOpen(false)}
              >
                {item.children ? (
                  <div className="relative">
                    <Link
                      href={item.href}
                      className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <span>{t(item.name)}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Link>

                    {/* Improved Services Dropdown with better hover handling */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ${isServicesDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                      onMouseEnter={() => setIsServicesDropdownOpen(true)}
                      onMouseLeave={() => setIsServicesDropdownOpen(false)}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          {t(child.name)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {t(item.name)}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Search and Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector with Flags */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 p-2 rounded-md transition-colors border border-gray-200 hover:border-gray-300"
              >
                <span className="text-lg">{currentLanguageData.flag}</span>
                <span className="text-sm font-medium">{currentLanguageData.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {availableLanguages.map((lang) => {
                    const langData = getLanguageData(lang);
                    return (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm transition-colors ${language === lang
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        <span className="text-lg">{langData.flag}</span>
                        <span>{langData.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Selector with Flag */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
              >
                <span className="text-lg">{currentLanguageData.flag}</span>
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {availableLanguages.map((lang) => {
                    const langData = getLanguageData(lang);
                    return (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm ${language === lang
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        <span className="text-lg">{langData.flag}</span>
                        <span>{langData.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div className="px-3">
                      <div className="text-gray-700 font-medium py-2 text-base">
                        {t(item.name)}
                      </div>
                      <div className="ml-4 flex flex-col space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="text-gray-600 hover:text-gray-900 py-2 rounded-md text-base transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {t(child.name)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(item.name)}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Language Selector */}
              <div className="px-3 py-4 border-t border-gray-200">
                <div className="text-gray-700 font-medium mb-2">Language</div>
                <div className="flex space-x-2">
                  {availableLanguages.map((lang) => {
                    const langData = getLanguageData(lang);
                    return (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md border text-sm ${language === lang
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'text-gray-700 border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        <span className="text-lg">{langData.flag}</span>
                        <span>{langData.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}