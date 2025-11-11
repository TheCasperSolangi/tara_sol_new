// app/copyright/page.jsx
"use client"

import { useState, useEffect } from 'react'
import { useLocalization } from '../../context/LocalizationContext'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { ScrollArea } from '../../components/ui/scroll-area'
import { ChevronUp, ChevronDown, Copyright, BookOpen, Download, Calendar, Shield, FileText, Mail, Phone, MapPin } from 'lucide-react'

export default function CopyrightPage() {
  const { t, currentLanguage } = useLocalization()
  const [content, setContent] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')
  const [expandedSections, setExpandedSections] = useState({})

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/legal/copyright_${currentLanguage}.md`)
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
        console.error('Error loading copyright policy:', error)
        setContent(t('copyrightContentNotAvailable'))
      }
    }

    loadContent()
  }, [currentLanguage, t])

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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Copyright className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('copyrightPolicy')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {t('copyrightDescription')}
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

        {/* Copyright Quick Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                {t('allowedUses')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('personalUse')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('educationalUse')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('internalBusiness')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('attributionRequired')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                {t('prohibitedUses')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('commercialRedistribution')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('modification')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('removalCopyright')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('reverseEngineering')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Copyright Protection Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Copyright className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('internationalProtection')}</h3>
              <p className="text-sm text-gray-600">{t('internationalProtectionDesc')}</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('fairUse')}</h3>
              <p className="text-sm text-gray-600">{t('fairUseDesc')}</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('dmcaCompliant')}</h3>
              <p className="text-sm text-gray-600">{t('dmcaCompliantDesc')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Copyright Policy Content */}
        <Card className="border-0 shadow-2xl overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              {t('copyrightPolicyDetails')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
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
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
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
                            <div className="prose prose-blue max-w-none">
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
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">{t('copyrightContentNotAvailable')}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Contact & Permissions Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('permissionsRequests')}
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                {t('permissionsDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900 mb-4">{t('contactInformation')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('email')}</p>
                      <p className="text-sm text-gray-600">copyright@tarasolutions.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('phone')}</p>
                      <p className="text-sm text-gray-600">+880 2 5566 7788</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('mailingAddress')}</p>
                      <p className="text-sm text-gray-600">199, Venus Complex, 12th Floor<br />Kha-199/2, 4 Bir Uttam Rafiqul Islam Ave<br />Dhaka 1212</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900 mb-4">{t('quickActions')}</h3>
                <div className="space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    <Download className="w-4 h-4 mr-2" />
                    {t('downloadCopyrightPolicy')}
                  </Button>
                  <Button variant="outline" className="w-full border-blue-300 text-blue-700 py-3">
                    {t('requestPermission')}
                  </Button>
                  <Button variant="outline" className="w-full border-red-300 text-red-700 py-3">
                    {t('reportInfringement')}
                  </Button>
                </div>
              </div>

              {/* Response Time */}
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900 mb-4">{t('responseInfo')}</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">24-48 {t('hours')}</div>
                    <p className="text-sm text-gray-600">{t('typicalResponse')}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• {t('emergencyResponse')}</p>
                  <p>• {t('legalProceedings')}</p>
                  <p>• {t('internationalClaims')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}