// components/footer.js
"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Whatsapp } from 'lucide-react'
import { useLocalization } from '../context/LocalizationContext'
import { WhatsappIcon } from "../components/icons/WhatsappIcon";
import { useState } from 'react'

export default function Footer() {
  const { t } = useLocalization()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your backend
      console.log('Subscribing email:', email)
      setIsSubscribed(true)
      setEmail('') // Clear the input
      
      // Reset the message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false)
      }, 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Logo and Content */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 flex-1">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/brands/main_logo.png"
                    alt={t('companyLogoAlt')}
                    width={80}
                    height={80}
                    className="h-20 w-auto"
                    onError={(e) => {
                      console.error('Main logo failed to load');
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h4 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t('newsletterTitle')}
                  </h4>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {t('newsletterDescription')}
                  </p>
                </div>
              </div>

              {/* Subscribe Form */}
              <div className="w-full lg:w-auto lg:min-w-[400px]">
                {isSubscribed ? (
                  <div className="flex items-center justify-center h-12 bg-green-600/20 border border-green-500 rounded-lg">
                    <span className="text-green-400 font-semibold flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Newsletter Subscribed
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 h-12 focus:border-purple-500 transition-colors"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 h-12 font-semibold"
                    >
                      <Image
                        src="/assets/img/icon/bell.png"
                        alt={t('bellIconAlt')}
                        width={20}
                        height={20}
                        className="mr-2"
                        onError={(e) => {
                          console.error('Bell icon failed to load');
                          e.target.style.display = 'none';
                        }}
                      />
                      {t('subscribe')}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your footer code remains the same */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Section */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-xl mb-6 text-white">{t('aboutSectionTitle')}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t('aboutDescription')}
              </p>
              <div className="flex items-center gap-3">
               
              </div>
            </div>

            {/* Corporate Links */}
            <div>
              <h4 className="font-bold text-xl mb-6 text-white">{t('corporateSectionTitle')}</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/terms-and-conditions" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('termsConditions')}
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer-copyright" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('disclaimerCopyright')}
                  </Link>
                </li>
                <li>
                  <Link href="/cookies-policy" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('cookiePolicy')}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('privacyPolicy')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-xl mb-6 text-white">{t('quickLinksTitle')}</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('aboutUs')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('contact')}
                  </Link>
                </li>
                <li>
                  <Link href="/international_certifications" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('internationalCertifications')}
                  </Link>
                </li>
                <li>
                  <Link href="/executive_programs" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('executivePrograms')}
                  </Link>
                </li>
                <li>
                  <Link href="/microsoft_licenses" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('microsoftLicense')}
                  </Link>
                </li>
                <li>
                  <Link href="/ai_services" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('ai_services')}
                  </Link>
                </li>
                 <li>
                  <Link href="/custom_solutions" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {t('customService')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="font-bold text-xl mb-6 text-white">{t('getInTouchTitle')}</h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Image
                    src="/assets/img/icon/location-02.png"
                    alt={t('locationAlt')}
                    width={20}
                    height={20}
                    className="mt-1 flex-shrink-0"
                    onError={(e) => {
                      console.error('Location icon failed to load');
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="text-gray-400 text-sm leading-relaxed">
                    {t('companyAddress')}
                  </span>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-4 text-white">{t('followUs')}</h5>
                <div className="flex gap-3">
                  <Link 
                    href="https://www.facebook.com/profile.php?id=61552120787685&mibextid=LQQJ4d" 
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Facebook size={18} />
                  </Link>

                  <Link 
                    href="https://www.linkedin.com/company/tarasolutions-cr/" 
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin size={18} />
                  </Link>

                  <Link 
                    href="https://instagram.com/tara_solutions?igshid=OGQ5ZDc2ODk2ZA==" 
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Instagram size={18} />
                  </Link>

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-black/50 py-6 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                {t('copyrightText')}
                <Link href="#" className="text-white font-medium hover:text-purple-400 transition-colors"> {t('companyName')}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}