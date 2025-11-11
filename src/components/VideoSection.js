// components/feedback-section.js
"use client"
import { useState, useRef } from 'react'
import { useLocalization } from '../context/LocalizationContext'

export default function FeedbackSection() {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef(null)
  const { t } = useLocalization()

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  return (
    <section className="feedback-section py-20 bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex justify-center mb-16">
          <div className="w-full lg:w-8/12 text-center">
            <div className="theme-section-title">
              <span className="subtitle text-purple-600 font-semibold text-lg mb-4 block uppercase tracking-wider">
                {t('quickIntro')}
              </span>
              <h4 className="title text-4xl lg:text-5xl font-bold text-gray-900 mb-8 relative">
                {t('quickIntroTitle')}
                {/* SVG Title Shape */}
                <svg 
                  className="title-shape absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 lg:w-80" 
                  viewBox="0 0 355 15" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M351.66 12.6362C187.865 -6.32755 49.6478 6.37132 3.41142 12.6362"
                    stroke="#764AF1" 
                    strokeWidth="3" 
                    strokeLinecap="square"
                    className="animate-draw"
                  />
                  <path 
                    d="M351.66 13C187.865 -5.96378 49.6478 6.73509 3.41142 13"
                    stroke="#764AF1" 
                    strokeWidth="3" 
                    strokeLinecap="square"
                    className="animate-draw delay-300"
                  />
                  <path 
                    d="M2.5 5.5C168.5 2.0001 280.5 -1.49994 352.5 8.49985"
                    stroke="#FFC44E" 
                    strokeWidth="3" 
                    strokeLinecap="square"
                    className="animate-draw delay-500"
                  />
                </svg>
              </h4>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="flex justify-center">
          <div className="feedback-hero-video w-full lg:w-10/12 xl:w-8/12">
            <div className="video-wrapper relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              )}
              <video 
                ref={videoRef}
                controls 
                className="w-full h-auto"
                onLoadedData={handleVideoLoad}
                poster="/assets/video-poster.jpg"
                title={t('introVideoTitle')}
              >
                <source src="/assets/video.mp4" type="video/mp4" />
                <source src="/assets/video.webm" type="video/webm" />
                {t('videoNotSupported')}
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}