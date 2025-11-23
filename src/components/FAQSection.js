// components/faq-section.js (With Pagination)
"use client"
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { useLocalization } from '../context/LocalizationContext'
import Link from 'next/link'

export default function FAQSection() {
  const [openItems, setOpenItems] = useState(['item-3'])
  const [currentPage, setCurrentPage] = useState(1)
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
    },
    {
      id: 'item-7',
      questionKey: 'faqQuestion7',
      answerKey: 'faqAnswer7'
    },
    {
      id: 'item-8',
      questionKey: 'faqQuestion8',
      answerKey: 'faqAnswer8'
    },
    {
      id: 'item-9',
      questionKey: 'faqQuestion9',
      answerKey: 'faqAnswer9'
    },
    {
      id: 'item-10',
      questionKey: 'faqQuestion10',
      answerKey: 'faqAnswer10'
    },
    {
      id: 'item-11',
      questionKey: 'faqQuestion11',
      answerKey: 'faqAnswer11'
    },
    {
      id: 'item-12',
      questionKey: 'faqQuestion12',
      answerKey: 'faqAnswer12'
    },
    {
      id: 'item-13',
      questionKey: 'faqQuestion13',
      answerKey: 'faqAnswer13'
    },
    {
      id: 'item-14',
      questionKey: 'faqQuestion14',
      answerKey: 'faqAnswer14'
    },
    {
      id: 'item-15',
      questionKey: 'faqQuestion15',
      answerKey: 'faqAnswer15'
    },
    {
      id: 'item-16',
      questionKey: 'faqQuestion16',
      answerKey: 'faqAnswer16'
    }
  ];

  // Pagination settings
  const questionsPerPage = 6
  const totalPages = Math.ceil(faqs.length / questionsPerPage)

  // Get current questions
  const indexOfLastQuestion = currentPage * questionsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
  const currentQuestions = faqs.slice(indexOfFirstQuestion, indexOfLastQuestion)

  const toggleItem = (itemId) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    setOpenItems([]) // Close all items when changing page
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

          {/* Right Content - Custom Accordion with Pagination */}
          <div className="accordion-wrapper">
            {/* Questions List */}
            <div className="space-y-4 mb-8">
              {currentQuestions.map((faq, index) => {
                const globalIndex = indexOfFirstQuestion + index
                return (
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
                          {globalIndex + 1}.
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
                )
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-gray-600 text-sm">
                  Showing {indexOfFirstQuestion + 1}-{Math.min(indexOfLastQuestion, faqs.length)} of {faqs.length} questions
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-purple-300'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-purple-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}