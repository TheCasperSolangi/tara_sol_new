// app/privacy-policy/page.jsx
"use client"

import { useState, useEffect } from 'react'
import { useLocalization } from '../../context/LocalizationContext'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { ScrollArea } from '../../components/ui/scroll-area'
import { ChevronUp, ChevronDown, Shield, Lock, Eye, Download, Calendar, User, Database } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const { t, language } = useLocalization()
  const [content, setContent] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')
  const [expandedSections, setExpandedSections] = useState({})

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/privacy/privacy_policy_${language}.md`)
        const text = await response.text()
        
        // Extract last updated date from metadata if present
        const dateMatch = text.match(/last_updated:\s*(.+)/i)
        if (dateMatch) {
          setLastUpdated(dateMatch[1])
        }
        
        // Remove metadata for display
        const contentWithoutMetadata = text.replace(/^---[\s\S]*?---/, '')
        setContent(contentWithoutMetadata)
      } catch (error) {
        console.error('Error loading privacy policy:', error)
        setContent(t('privacyContentNotAvailable'))
      }
    }

    loadContent()
  }, [language, t])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Parse markdown content and create sections
  const parseContent = (content) => {
    const lines = content.split('\n')
    const sections = []
    let currentSection = null

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        if (currentSection) {
          sections.push(currentSection)
        }
        currentSection = {
          id: line.replace('## ', '').toLowerCase().replace(/[^a-z0-9]/g, '-'),
          title: line.replace('## ', ''),
          content: []
        }
      } else if (currentSection && line.trim()) {
        currentSection.content.push(line)
      }
    })

    if (currentSection) {
      sections.push(currentSection)
    }

    return sections
  }

  const sections = parseContent(content)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('privacyPolicy')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {t('privacyDescription')}
          </p>
          
          {lastUpdated && (
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {t('lastUpdated')}: {lastUpdated}
              </span>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('dataSecurity')}</h3>
              <p className="text-sm text-gray-600">{t('dataSecurityDesc')}</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('yourControl')}</h3>
              <p className="text-sm text-gray-600">{t('yourControlDesc')}</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('transparency')}</h3>
              <p className="text-sm text-gray-600">{t('transparencyDesc')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Collection Overview */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('dataCollectionOverview')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  {t('whatWeCollect')}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {t('personalInfo')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {t('usageData')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {t('technicalData')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {t('paymentInfo')}
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  {t('yourRights')}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {t('accessData')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {t('correctData')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {t('deleteData')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {t('objectProcessing')}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
{/* Privacy Policy Content */}
        <Card className="border-0 shadow-2xl overflow-hidden p-0">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 m-0">
            <CardTitle className="flex items-center gap-3 m-0">
              <Shield className="w-6 h-6" />
              {t('privacyPolicyDetails')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 m-0">
            <ScrollArea className="h-[600px]">
              <div className="p-8">
                {sections.length > 0 ? (
                  <div className="space-y-6">
                    {sections.map((section, index) => (
                      <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-sm">
                              {index + 1}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {section.title}
                            </h3>
                          </div>
                          {expandedSections[section.id] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        
                        {expandedSections[section.id] && (
                          <div className="p-6 bg-white border-t border-gray-200">
                            <div className="prose prose-indigo max-w-none">
                              {section.content.map((paragraph, pIndex) => (
                                <p key={pIndex} className="text-gray-700 mb-4 leading-relaxed">
                                  {paragraph.trim()}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">{t('privacyContentNotAvailable')}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

       
      </div>
    </main>
  )
}