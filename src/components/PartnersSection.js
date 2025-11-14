// components/partners-section.js
"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../components/ui/button'
import { useLocalization } from '../context/LocalizationContext'

export default function PartnersSection() {
  const { t } = useLocalization()
  
  const partners = [
  
    { logo: '/assets/brands/Cloud_Credential_Council_logo.png', altKey: 'cloudCredentialAlt' },
    { logo: "/assets/brands/american.png", altKey: "American Marketing Association"},
    { logo: "/assets/brands/651fbf9cc81f6688480772.png", altKey: "Python Institute Py"},
    { logo: "/assets/brands/ProfessionalDesignations_logo.png", altKey: "Professional Designations"},
    { logo: "/assets/brands/nforceit-partner-microsoft-logo.png", altKey: "Microsoft"},
    { logo: "/assets/brands/CertiProf+Logo+Full+Color.webp", altKey: "CertiProf Logo"},
    { logo: "/assets/brands/ITPrenuers_logo.png", altKey: "IT Prenuers"},
    { logo: "/assets/brands/Screenshot 2025-11-15 040117.png", altKey: "Lean Six Sigma"},
    { logo: "/assets/brands/5f87b9bdfc4a43ef97342e5e3c4b98c9.png", altKey: "Arcitura"},
    { logo: "/assets/brands/scrumstudy-1.svg", altKey: "Scrum Study"},
    { logo: "/assets/brands/3BLpaloaltonetwork_RAoverride_logo_2021mb_1.png", altKey: "paloalt networks"},
    { logo: "/assets/brands/pc-logo-1200px.png", altKey: "People Cert"}
 
  ]

  return (
    <section className="partners-section py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Shapes */}
      <Image
        src="/assets/img/shapes/mountant.png"
        alt={t('mountainAlt')}
        width={300}
        height={200}
        className="shape-01 absolute bottom-0 left-0 opacity-20"
      />
      
      <div className="plane-wrap">
        <Image
          src="/assets/img/shapes/plane.png"
          alt={t('planeAlt')}
          width={100}
          height={60}
          className="shape-02 absolute top-10 right-10 animate-float"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="flex justify-center mb-12">
          <div className="w-full lg:w-6/12 text-center">
            <div className="theme-section-title">
              <h4 className="title text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {t('ourPartners')}
              </h4>
              <p className="text-gray-600 text-lg">
                {t('partnersDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Partners Slider */}
        <div className="partners-slider mb-12 overflow-hidden">
          <div className="partners-track flex animate-scroll">
            {/* Triple the partners for seamless looping */}
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div key={index} className="partners-item flex-shrink-0 mx-4 lg:mx-8">
                <div className="w-32 h-20 lg:w-40 lg:h-24 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                  <Image
                    src={partner.logo}
                    alt={t(partner.altKey)}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Link href="/contact">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-lg">
            {t('applyOnline')}
          </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .partners-track:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}