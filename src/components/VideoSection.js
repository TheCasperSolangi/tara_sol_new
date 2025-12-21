// components/feedback-section.js
"use client"
import { useState, useRef, useEffect } from 'react'
import { useLocalization } from '../context/LocalizationContext'

export default function FeedbackSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showCustomControls, setShowCustomControls] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef(null)
  const { t, language } = useLocalization()

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Add at the top with other useEffects
// Language change effect (no cleanup here)
useEffect(() => {
  const video = videoRef.current;
  if (video) {
    video.load();
    setIsLoading(true);
    setHasError(false);
    setIsPlaying(false);
  }
}, [language]);

useEffect(() => {
  return () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      // Optional: If you really need to release the source, but this may not be necessary
      // video.src = '';
      video.load();
    }
  };
}, []);

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  const handleVideoError = () => {
    setIsLoading(false)
    setHasError(true)
    console.error('Video failed to load')
  }

  const handleVideoCanPlay = () => {
    setIsLoading(false)
  }

// Updated handlePlayPause
const handlePlayPause = async (e) => {
  e?.stopPropagation()
  if (videoRef.current) {
    try {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        await videoRef.current.play()
      }
    } catch (error) {
      console.log('Play prevented:', error)
    }
  }
}
  const handleVideoPlay = () => {
    setIsPlaying(true)
  }

  const handleVideoPause = () => {
    setIsPlaying(false)
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
  }

  // Simplified controls visibility logic
  useEffect(() => {
    if (isMobile) {
      // On mobile, only show controls briefly when toggling play state
      // or when video is paused
      setShowCustomControls(!isPlaying)
    } else {
      // On desktop, show on hover or when paused
      setShowCustomControls(isHovered || !isPlaying)
    }
  }, [isHovered, isPlaying, isMobile])

  // Hide controls after a delay on mobile when video starts playing
  useEffect(() => {
    let timeoutId
    if (isMobile && isPlaying) {
      timeoutId = setTimeout(() => {
        setShowCustomControls(false)
      }, 2000) // Hide after 2 seconds
    }
    return () => clearTimeout(timeoutId)
  }, [isPlaying, isMobile])

  // Custom controls for better mobile experience
  const CustomControls = () => (
    <div 
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 
        ${showCustomControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handlePlayPause}
    >
      <button
        onClick={handlePlayPause}
        className="bg-purple-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-4 transition-all duration-200 transform hover:scale-105"
      >
        {isPlaying ? (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </div>
  )

  const videoSrc = language === 'es' ? "https://tarasolutions-cr.com/assets/spanish.mp4" : "https://tarasolutions-cr.com/assets/video.mp4"
  const webmSrc = language === 'es' ? "https://tarasolutions-cr.com/assets/spanish.webm" : "https://tarasolutions-cr.com/assets/video.webm"

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
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              )}
              
              {hasError ? (
                <div className="flex flex-col items-center justify-center p-8 text-white text-center">
                  <div className="text-4xl mb-4">📹</div>
                  <p className="text-lg mb-4">{t('videoLoadError') || 'Video failed to load'}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {t('retry') || 'Retry'}
                  </button>
                </div>
              ) : (
                <div 
                  className="relative" 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <video 
                    ref={videoRef}
                    className="w-full h-auto"
                    onLoadedData={handleVideoLoad}
                    onCanPlay={handleVideoCanPlay}
                    onError={handleVideoError}
                    onLoadStart={() => setIsLoading(true)}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoEnd}
                    onClick={handlePlayPause}
                    playsInline
                    preload="metadata"
                  
                    title={t('introVideoTitle')}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    <source src={webmSrc} type="video/webm" />
                    {t('videoNotSupported')}
                  </video>
                  {/* Custom controls overlay */}
                  <CustomControls />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 