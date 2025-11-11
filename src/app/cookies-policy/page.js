"use client"

import { useState, useEffect } from 'react'
import { useLocalization } from '../../context/LocalizationContext'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { ScrollArea } from '../../components/ui/scroll-area'
import { ChevronUp, ChevronDown, Cookie, Shield, Download, Calendar, FileText, Mail, Phone, MapPin, Settings, Trash2, Eye, CheckCircle } from 'lucide-react'

export default function CookiePolicyPage() {
  const { t, language } = useLocalization()
  const [content, setContent] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')
  const [expandedSections, setExpandedSections] = useState({})
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  })

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/legal/cookie-policy_${language}.md`)
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
        console.error('Error loading cookie policy:', error)
        setContent(t('cookieContentNotAvailable'))
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

  const handleCookiePreference = (type, value) => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const saveCookiePreferences = () => {
    // Implement cookie preference saving logic here
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences))
    // Show success message
    alert(t('preferencesSaved'))
  }

  const clearAllCookies = () => {
    // Implement cookie clearing logic here
    if (confirm(t('confirmClearCookies'))) {
      // Clear cookies logic
      alert(t('cookiesCleared'))
    }
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
            <Cookie className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('cookiePolicy')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {t('cookieDescription')}
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

        {/* Cookie Quick Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                {t('essentialCookies')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('sessionManagement')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('securityPurposes')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('siteFunctionality')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('alwaysActive')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                {t('optionalCookies')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('analyticsTracking')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('marketingCookies')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('preferenceCookies')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{t('thirdPartyCookies')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Cookie Management */}
        <Card className="border-0 shadow-lg mb-12 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-purple-600" />
              {t('cookiePreferences')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Necessary Cookies */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{t('necessaryCookies')}</h4>
                <p className="text-sm text-gray-600 mt-1">{t('necessaryCookiesDesc')}</p>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{t('analyticsCookies')}</h4>
                <p className="text-sm text-gray-600 mt-1">{t('analyticsCookiesDesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={cookiePreferences.analytics}
                  onChange={(e) => handleCookiePreference('analytics', e.target.checked)}
                />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{t('marketingCookies')}</h4>
                <p className="text-sm text-gray-600 mt-1">{t('marketingCookiesDesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={cookiePreferences.marketing}
                  onChange={(e) => handleCookiePreference('marketing', e.target.checked)}
                />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Preference Cookies */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{t('preferenceCookies')}</h4>
                <p className="text-sm text-gray-600 mt-1">{t('preferenceCookiesDesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={cookiePreferences.preferences}
                  onChange={(e) => handleCookiePreference('preferences', e.target.checked)}
                />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={saveCookiePreferences}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('savePreferences')}
              </Button>
              <Button 
                onClick={clearAllCookies}
                variant="outline" 
                className="border-red-300 text-red-700 py-3 flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('clearAllCookies')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Policy Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('gdprCompliant')}</h3>
              <p className="text-sm text-gray-600">{t('gdprCompliantDesc')}</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('transparentUsage')}</h3>
              <p className="text-sm text-gray-600">{t('transparentUsageDesc')}</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('userControl')}</h3>
              <p className="text-sm text-gray-600">{t('userControlDesc')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Cookie Policy Content */}
        <Card className="border-0 shadow-2xl overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              {t('cookiePolicyDetails')}
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
                    <p className="text-gray-500">{t('cookieContentNotAvailable')}</p>
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