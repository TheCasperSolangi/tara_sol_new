// components/faq-section.js (Custom Accordion)
"use client"
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { useLocalization } from '../context/LocalizationContext'
import Link from 'next/link'

export default function FAQSection() {
  const [openItems, setOpenItems] = useState(['item-3']) // Third item open by default
  const { t } = useLocalization()

  const faqs = [
    {
      id: 'item-1',
      questionKey: 'faqQuestion1',
      answerKey: 'faqAnswer1'
    },
    {
      id: 'item-2',
      questionKey: 'faqQuestion2',
      answerKey: 'faqAnswer2'
    },
    {
      id: 'item-3',
      questionKey: 'faqQuestion3',
      answerKey: 'faqAnswer3'
    },
    {
      id: 'item-4',
      questionKey: 'faqQuestion4',
      answerKey: 'faqAnswer4'
    },
    {
      id: 'item-5',
      questionKey: 'faqQuestion5',
      answerKey: 'faqAnswer5'
    },
    {
      id: 'item-6',
      questionKey: 'faqQuestion6',
      answerKey: 'faqAnswer6'
    }
  ]

  const toggleItem = (itemId) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <section className="faq-section-area py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <div className="theme-section-title mb-8">
              <span className="subtitle text-purple-600 font-semibold text-lg mb-4 block uppercase tracking-wider">
                {t('faqTitle')}
              </span>
              <h4 className="title text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('faqSubtitle')}
              </h4>
            </div>
            
            <div className="faq-content">
              <h6 className="subtitle text-xl text-gray-600 mb-8 leading-relaxed">
                {t('faqDescriptionLine1')}<br /> 
                {t('faqDescriptionLine2')}
              </h6>
              <div className="btn-wrap">
                <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-lg">
                  {t('sendMessage')}
                </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Custom Accordion */}
          <div className="accordion-wrapper">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className="card bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div 
                    className="card-header cursor-pointer p-6"
                    onClick={() => toggleItem(faq.id)}
                  >
                    <h5 className="mb-0 flex items-start gap-4">
                      <span className="text-purple-600 font-semibold text-lg flex-shrink-0 mt-1">
                        {index + 1}.
                      </span>
                      <span className="text-lg font-semibold text-gray-900 flex-1">
                        {t(faq.questionKey)}
                      </span>
                      <span className="text-purple-600 text-lg flex-shrink-0 transition-transform duration-300">
                        {openItems.includes(faq.id) ? '−' : '+'}
                      </span>
                    </h5>
                  </div>
                  
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      openItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="card-body p-6 pt-0 text-gray-600 leading-relaxed">
                      {t(faq.answerKey)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}