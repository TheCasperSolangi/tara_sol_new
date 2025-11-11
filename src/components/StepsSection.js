// components/steps-section.js (Animated Cards)
"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocalization } from '../context/LocalizationContext'

export default function StepsSection() {
  const { t } = useLocalization()
  
  const steps = [
    {
      icon: '/assets/img/icon/step-01.png',
      nameKey: 'exploreCertifications',
      descriptionKey: 'exploreCertificationsDesc'
    },
    {
      icon: '/assets/img/icon/step-02.png',
      nameKey: 'enrollYourself',
      descriptionKey: 'enrollYourselfDesc'
    },
    {
      icon: '/assets/img/icon/step-03.png',
      nameKey: 'attendClasses',
      descriptionKey: 'attendClassesDesc'
    },
    {
      icon: '/assets/img/icon/step-04.png',
      nameKey: 'completeTasks',
      descriptionKey: 'completeTasksDesc'
    },
    {
      icon: '/assets/img/icon/step-05.png',
      nameKey: 'getCertified',
      descriptionKey: 'getCertifiedDesc'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="destination-section style-01 instruction py-20 bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-purple-600 font-semibold text-lg uppercase tracking-wider block mb-4"
          >
            {t('stepsTitle')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            {t('stepsSubtitle')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            {t('stepsDescription')}
          </motion.p>
        </div>

        {/* Animated Steps */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="destination-single-item bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100"
            >
              {/* Step Number */}
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4 mx-auto shadow-md">
                {index + 1}
              </div>
              
              {/* Step Icon */}
              <div className="thumbnail mb-4">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center p-3 mx-auto mb-3">
                  <Image
                    src={step.icon}
                    alt={t(step.nameKey)}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Step Name */}
              <h6 className="name text-lg font-bold text-gray-800 mb-2">
                {t(step.nameKey)}
              </h6>
              
              {/* Step Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(step.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}