// components/features-section.js
"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useLocalization } from '../context/LocalizationContext'

export default function FeaturesSection() {
  const { t } = useLocalization();

  const features = [
    {
      icon: '/assets/img/icon/idea.png',
      titleKey: 'internationalCertifications',
      descriptionKey: 'internationalCertificationsText',
      link: '#0'
    },
    {
      icon: '/assets/img/icon/coversation.png',
      titleKey: 'executivePrograms',
      descriptionKey: 'executiveProgramsText',
      link: '#0'
    },
    {
      icon: '/assets/brands/pngimg.com - windows_logos_PNG31.png',
      titleKey: 'microsoftLicense',
      descriptionKey: 'microsoftText',
      link: '#0'
    },

    {
      icon: '/assets/brands/2752489.png',
      titleKey: 'customService',
      descriptionKey: 'customServiceText',
      link: '#0'
    },

    {
      icon: '/assets/brands/ai.png',
      titleKey: 'ai_services',
      descriptionKey: 'ai_services_text',
      link: '#0'
    },

    {
      icon: '/assets/img/icon/emergency.png',
      titleKey: 'helpdeskSystem',
      descriptionKey: 'helpdeskSystemText',
      link: '#0'
    }

  ]

  return (
    <section className="features-section py-20 bg-gray-50 relative">
      <Image
        src="/assets/img/shapes/graduation.png"
        alt={t('graduationAlt')}
        width={150}
        height={150}
        className="shape absolute -bottom-8 -left-8 opacity-20"
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row flex-wrap -mx-4">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="icon-box-item bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="icon mb-8">
                  <Image
                    src={feature.icon}
                    alt={t(feature.titleKey)}
                    width={70}
                    height={70}
                    className="mx-auto"
                  />
                </div>
                <div className="content">
                  <h4 className="title text-xl font-semibold text-gray-800 mb-4">
                    {t(feature.titleKey)}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {t(feature.descriptionKey)}
                  </p>
                </div>
                <div className="btn-wrap">

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}