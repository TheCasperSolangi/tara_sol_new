// components/certifications-section.js
"use client"
import { useState } from 'react'
import Image from 'next/image'
import { useLocalization } from '../context/LocalizationContext'

const CertificationsSection = () => {
  const [activeTab, setActiveTab] = useState('international')
  const { t } = useLocalization()

  const certifications = {
    international: [
      { logo: '/assets/brands/Microsoft_Azure.svg.png', nameKey: 'microsoftAzure' },
      { logo: '/assets/brands/DevOps_Logo.png', nameKey: 'devops' },
      { logo: '/assets/brands/network-solutions9567.logowik.com.webp', nameKey: 'networkEngineering' },
      { logo: '/assets/brands/windows-server-2-logo-png_seeklogo-374219.png', nameKey: 'windowsServer' },
      { logo: '/assets/brands/corporateRD-220324-usecase-image-02.png', nameKey: 'dataEngineering' },
      { logo: '/assets/brands/Dynamics365-2.png', nameKey: 'microsoftDynamics' },
      { logo: '/assets/brands/Microsoft_365_(2022).svg.png', nameKey: 'microsoft365' },
      { logo: '/assets/brands/Microsoft_Teams.png', nameKey: 'microsoftTeams' },
      { logo: '/assets/brands/Microsoft_Power_Platform_logo.svg.png', nameKey: 'msPowerPlatform' },
      { logo: '/assets/brands/istockphoto-953520974-612x612.jpg', nameKey: 'cyberSecurity' },
      { logo: '/assets/brands/10270032.png', nameKey: 'management' },
      { logo: '/assets/brands/cropped-LOGO-LSSI-ID.png', nameKey: 'leanSixSigma' },
      { logo: '/assets/brands/attachment_6023482.jpeg', nameKey: 'agileCertifications' },
      { logo: '/assets/brands/scum.png', nameKey: 'scrumCertification' }
    ],
    executive: [
      { logo: '/assets/brands/python_logo_icon_168886.png', nameKey: 'python' },
      { logo: '/assets/brands/sql.jpg', nameKey: 'sql' },
      { logo: '/assets/brands/JavaScript-logo.png', nameKey: 'javascript' },
      { logo: '/assets/brands/HTML5_logo_and_wordmark.svg.png', nameKey: 'html' },
      { logo: '/assets/brands/CSS3_logo_and_wordmark.svg.png', nameKey: 'css' },
      { logo: '/assets/brands/java-logo-png_seeklogo-158094.png', nameKey: 'java' },
      { logo: '/assets/brands/R_logo.svg.png', nameKey: 'r' },
      { logo: '/assets/brands/Microsoft_Office_Excel_(2019–2025).svg.png', nameKey: 'excel' },
      { logo: '/assets/brands/PHP-logo.svg.png', nameKey: 'php' },
      { logo: '/assets/brands/5968371.png', nameKey: 'swift' },
      { logo: '/assets/brands/C_Logo.png', nameKey: 'c' },
      { logo: '/assets/brands/New_Power_BI_Logo.svg.png', nameKey: 'powerBI' },
      { logo: '/assets/brands/React-icon.svg.png', nameKey: 'reactNative' },
      { logo: '/assets/brands/Node.js_logo.svg.png', nameKey: 'nodejs' }
    ]
  }

  return (
    <section className="category-section-area py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div className="theme-section-title">
            <span className="subtitle text-purple-600 font-semibold text-sm uppercase tracking-wider block mb-2">
              {t('ourSpecializations')}
            </span>
            <h4 className="title text-3xl lg:text-4xl font-bold text-gray-900">
              {t('popularCertifications')}
            </h4>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('international')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === 'international'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('internationalCertifications')}
            </button>
            <button
              onClick={() => setActiveTab('executive')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === 'executive'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('executivePrograms')}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {['international', 'executive'].map((tab) => (
            <div 
              key={tab} 
              className={`tab-pane ${activeTab === tab ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
                {certifications[tab].map((cert, index) => (
                  <div 
                    key={index} 
                    className="destination-single-item bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div className="thumbnail mb-3">
                      <div className="w-16 h-16 mx-auto relative">
                        <Image
                          src={cert.logo}
                          alt={t(cert.nameKey)}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    </div>
                    <h6 className="name text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors leading-tight">
                      {t(cert.nameKey).split(' ').map((word, i, arr) => (
                        <span key={i}>
                          {word}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection