// components/hero-section.js
"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useLocalization } from '../context/LocalizationContext'

export default function HeroSection() {
  const {t} = useLocalization();
  
  // Helper function to create HTML from translation
  const createTitleHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <section className="banner-area home-01 py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="banner-wrapper">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-7/12 xl:w-7/12 mb-12 lg:mb-0">
              <div className="banner-inner max-w-2xl">
                <h1 
                  className="title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                  dangerouslySetInnerHTML={createTitleHTML(t('heroTitle'))}
                />
                <p 
                  className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t('heroDescription') }}
                />
                <div className="header-btn flex flex-col sm:flex-row gap-4">
                  <div className="btn-wrap">
                    <Link 
                      href="/contact" 
                      className="btn-common bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-block text-center"
                    >
                      {t('applyOnline')}
                    </Link>
                  </div>
                  <div className="btn-wrap sm:ml-5">
                    <Link 
                      href="/international_certifications" 
                      className="btn-common border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-block text-center"
                    >
                      {t('discover')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-5/12 xl:w-5/12 relative">
              <div className="thumbnail relative">
                {/* Animated Elements */}
           
                <Image
                 src="/assets/brands/main_logo.png"
                  alt={t('ellipseAlt')}
                  width={80}
                  height={80}
                  className="element-02 absolute top-16 -right-4 animate-bounce"
                />
               
                <Image
                  src="/assets/img/header/plane.png"
                  alt={t('planeAlt')}
                  width={50}
                  height={50}
                  className="element-04 absolute top-8 right-16 animate-float"
                />
                <Image
                  src="/assets/img/icon/location.png"
                  alt={t('locationAlt')}
                  width={40}
                  height={40}
                  className="element-05 absolute bottom-8 right-8 animate-ping"
                />
                
                {/* Main Hero Image */}
                <Image
                  src="/assets/img/myimages/bg-hero.png"
                  alt={t('studentAlt')}
                  width={500}
                  height={500}
                  className="banner-img w-full max-w-md mx-auto relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}