// components/hero-section.js
"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useLocalization } from '../context/LocalizationContext'

export default function HeroSection() {
  const { t } = useLocalization();

  // Helper function to create HTML from translation
  const createTitleHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <section className="banner-area home-01 py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="banner-wrapper">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-5/12 xl:w-5/12 mb-12 lg:mb-0">
              <div className="banner-inner max-w-2xl">
                <h1
                  className="title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                  dangerouslySetInnerHTML={createTitleHTML(t('heroTitle'))}
                />
                <p
                  className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t('heroDescription') }}
                />
                <div className="header-btn flex flex-col sm:flex-row gap-4">
                  <div className="btn-wrap transform transition-transform hover:scale-105">
                    <Link
                      href="/contact"
                      className="btn-common bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 inline-block text-center shadow-lg hover:shadow-xl"
                    >
                      {t('applyOnline')}
                    </Link>
                  </div>
                  <div className="btn-wrap sm:ml-5 transform transition-transform hover:scale-105">
                    <Link
                      href="/international_certifications"
                      className="btn-common border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 inline-block text-center hover:shadow-lg"
                    >
                      {t('discover')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-7/12 xl:w-7/12 relative">
              <div className="thumbnail relative flex justify-center lg:justify-end">
                {/* Enhanced animated elements with better positioning */}
                <div className="relative">


                  {/* Larger Main Hero Image with glow effect */}
                  <div className="relative">
                    <div className="absolute -inset-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <Image
                      src="/assets/brands/hero.png"
                      alt={t('studentAlt')}
                      width={750}
                      height={750}
                      className="banner-img w-full max-w-2xl mx-auto relative z-10 transform transition-transform duration-300 hover:scale-105"
                      priority
                    />
                  </div>

                  {/* Additional decorative element */}
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-yellow-100 rounded-full opacity-60 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}