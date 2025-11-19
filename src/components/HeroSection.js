"use client"
import { useState, useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useLocalization } from '../context/LocalizationContext'

export default function HeroSection() {
  const {t} = useLocalization()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const createTitleHTML = (htmlString) => {
    return { __html: htmlString }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{
            top: '20%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{
            top: '40%',
            right: '10%',
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{
            bottom: '20%',
            left: '30%',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content Side */}
          <div className="lg:w-1/2 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-700">Trusted by 50,000+ Students</span>
            </div>

            {/* Title */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
              dangerouslySetInnerHTML={createTitleHTML(t('heroTitle'))}
            />

            {/* Description */}
            <p 
              className="text-xl text-gray-600 leading-relaxed max-w-xl"
              dangerouslySetInnerHTML={{ __html: t('heroDescription') }}
            />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl text-center"
              >
                <span className="relative z-10">{t('applyOnline')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link 
                href="/international_certifications"
                className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-purple-600 font-semibold rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-xl text-center"
              >
                {t('discover')}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600">Programs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">150+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:w-1/2 relative">
            {/* Animated Decorative Elements */}
            <Image
              src="/assets/brands/black_heart.png"
              alt={t('ellipseAlt')}
              width={100}
              height={100}
              className="absolute -top-8 -left-8 animate-pulse z-20"
            />
            <Image
              src="/assets/brands/main_logo.png"
              alt={t('ellipseAlt')}
              width={80}
              height={80}
              className="absolute top-16 -right-8 animate-bounce z-20"
            />
            <Image
              src="/assets/brands/main_logo.png"
              alt={t('vectorAlt')}
              width={60}
              height={60}
              className="absolute bottom-16 left-4 animate-spin-slow z-20"
              style={{animation: 'spin 8s linear infinite'}}
            />
            <Image
              src="/assets/img/header/plane.png"
              alt={t('planeAlt')}
              width={50}
              height={50}
              className="absolute top-8 right-16 animate-float z-20"
            />
            <Image
              src="/assets/brands/red-heart.png"
              alt={t('locationAlt')}
              width={40}
              height={40}
              className="absolute bottom-8 right-8 z-20"
              style={{animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'}}
            />

            {/* Main Image Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20" />
              
              {/* Image Card */}
              <div className="relative bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image
                    src="/assets/img/myimages/bg-hero.png"
                    alt={t('studentAlt')}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Decorative Dots */}
              <div className="absolute -top-4 -right-4 w-24 h-24 grid grid-cols-4 gap-2 opacity-30">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: `${i * 100}ms`}} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147, 51, 234, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  )
}