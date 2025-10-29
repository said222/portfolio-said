'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function TextFormatter() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [activeCase, setActiveCase] = useState('')
  const t = useTranslations('textFormatter')
  const locale = useLocale()

  const formatText = (text: string, caseType: string): string => {
    if (!text) return ''

    switch (caseType) {
      case 'sentence':
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      
      case 'lower':
        return text.toLowerCase()
      
      case 'upper':
        return text.toUpperCase()
      
      case 'capitalized':
        return text.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ')
      
      case 'alternating':
        return text.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('')
      
      case 'title':
        const articles = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'of', 'in']
        return text.split(' ').map((word, index) => {
          const lowerWord = word.toLowerCase()
          if (index === 0 || !articles.includes(lowerWord)) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          }
          return lowerWord
        }).join(' ')
      
      case 'inverse':
        return text.split('').map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join('')
      
      default:
        return text
    }
  }

  const handleFormatText = (caseType: string) => {
    const formatted = formatText(inputText, caseType)
    setOutputText(formatted)
    setActiveCase(caseType)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      toast.success(locale === 'fr' ? 'Texte copié dans le presse-papiers! 📋' : 'Text copied to clipboard! 📋')
    } catch (err) {
      console.error('Failed to copy text: ', err)
      toast.error(locale === 'fr' ? 'Échec de la copie du texte' : 'Failed to copy text to clipboard')
    }
  }

  const downloadText = () => {
    const element = document.createElement('a')
    const file = new Blob([outputText], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'formatted-text.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success(locale === 'fr' ? 'Texte téléchargé avec succès! 💾' : 'Text downloaded successfully! 💾')
  }

  const clearText = () => {
    setInputText('')
    setOutputText('')
    setActiveCase('')
    toast.success(locale === 'fr' ? 'Texte effacé! 🗑️' : 'Text cleared! 🗑️')
  }

  const formatCases = [
    { id: 'sentence', name: 'Sentence case', example: 'This is sentence case' },
    { id: 'lower', name: 'lower case', example: 'this is lower case' },
    { id: 'upper', name: 'UPPER CASE', example: 'THIS IS UPPER CASE' },
    { id: 'capitalized', name: 'Capitalized Case', example: 'This Is Capitalized Case' },
    { id: 'alternating', name: 'aLtErNaTiNg cAsE', example: 'tHiS iS aLtErNaTiNg CaSe' },
    { id: 'title', name: 'Title Case', example: 'This Is Title Case' },
    { id: 'inverse', name: 'InVeRsE CaSe', example: 'tHIS iS iNVERSE cASE' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            ← {locale === 'fr' ? 'Retour à l\'Accueil' : 'Back to Home'}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔤 {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Input Section */}
          <div className="mb-8">
            <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('inputLabel')}
            </label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={locale === 'fr' ? 'Tapez ou collez votre texte ici...' : 'Type or paste your text here...'}
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         resize-none transition-colors"
            />
          </div>

          {/* Format Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('chooseFormat')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {formatCases.map((formatCase) => (
                <button
                  key={formatCase.id}
                  onClick={() => handleFormatText(formatCase.id)}
                  disabled={!inputText}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all duration-200
                    ${activeCase === formatCase.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                    }
                    ${!inputText 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-md cursor-pointer'
                    }
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  `}
                >
                  <div className="font-medium mb-1">{formatCase.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatCase.example}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Output Section */}
          <div className="mb-8">
            <label htmlFor="output-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('outputLabel')}
            </label>
            <textarea
              id="output-text"
              value={outputText}
              readOnly
              placeholder={locale === 'fr' ? 'Votre texte formaté apparaîtra ici...' : 'Your formatted text will appear here...'}
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white
                         resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={copyToClipboard}
              disabled={!outputText}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                         disabled:bg-gray-400 disabled:cursor-not-allowed
                         text-white rounded-lg transition-colors font-medium"
            >
              <span>📋</span>
              <span>{t('copyToClipboard')}</span>
            </button>

            <button
              onClick={downloadText}
              disabled={!outputText}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 
                         disabled:bg-gray-400 disabled:cursor-not-allowed
                         text-white rounded-lg transition-colors font-medium"
            >
              <span>💾</span>
              <span>Download Text</span>
            </button>

            <button
              onClick={clearText}
              className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 
                         text-white rounded-lg transition-colors font-medium"
            >
              <span>🗑️</span>
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Examples Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📝 Examples
          </h2>
          <div className="grid gap-4">
            {formatCases.map((formatCase) => (
              <div key={formatCase.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white mb-2">
                  {formatCase.name}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-mono">
                  Input: "hello world example text"
                </div>
                <div className="text-gray-800 dark:text-gray-200 font-mono">
                  Output: "{formatText('hello world example text', formatCase.id)}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}