'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

interface Tool {
  id: string
  name: string
  icon: string
  description: string
  url?: string
  action?: () => void
}

export default function ToolsSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const t = useTranslations('tools')
  const locale = useLocale()
  const router = useRouter()

  // Auto-hide after 3 seconds of no interaction
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isOpen && !isHovered) {
      timeout = setTimeout(() => {
        setIsOpen(false)
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [isOpen, isHovered])

  const tools: Tool[] = [
    {
      id: 'textFormatter',
      name: t('textFormatter'),
      icon: '🔤',
      description: 'Format text in different cases',
      url: `/${locale}/text-formatter`
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '🐙',
      description: 'View my repositories',
      url: 'https://github.com/said-aazri'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      description: 'Professional profile',
      url: 'https://linkedin.com/in/said-aazri'
    },
    {
      id: 'email',
      name: 'Email',
      icon: '📧',
      description: 'Send me an email',
      action: () => {
        const contactSection = document.getElementById('contact')
        contactSection?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: '📄',
      description: 'Download my CV',
      url: '/resume.pdf'
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: '🎨',
      description: 'View my work',
      action: () => {
        const projectsSection = document.getElementById('projects')
        projectsSection?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: '⚡',
      description: 'Technical expertise',
      action: () => {
        const skillsSection = document.getElementById('skills')
        skillsSection?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  ]

  const handleToolClick = (tool: Tool) => {
    if (tool.url) {
      // Check if it's an external URL
      if (tool.url.startsWith('http')) {
        window.open(tool.url, '_blank')
      } else {
        // Internal navigation
        router.push(tool.url)
        setIsOpen(false)
      }
    } else if (tool.action) {
      tool.action()
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Trigger Icon */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          isOpen ? 'translate-x-80' : 'translate-x-0'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            tools-sidebar-trigger
            bg-gradient-to-r from-blue-600 to-purple-600 
            text-white p-3 rounded-r-xl shadow-lg 
            hover:shadow-xl transform hover:scale-105 
            transition-all duration-300 group
            ${isHovered || isOpen ? 'shadow-2xl scale-105' : ''}
          `}
          aria-label="Toggle tools sidebar"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl">🛠️</span>
            <span 
              className={`text-sm font-medium transition-all duration-300 ${
                isHovered || isOpen ? 'opacity-100 max-w-20' : 'opacity-0 max-w-0 overflow-hidden'
              }`}
            >
              Tools
            </span>
          </div>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          tools-sidebar
          fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 
          shadow-2xl transform transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🛠️ Tools
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close sidebar"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          {/* Tools Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-3">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="
                    tool-item group p-4 rounded-xl border border-gray-200 dark:border-gray-700
                    hover:border-blue-300 dark:hover:border-blue-600
                    hover:bg-blue-50 dark:hover:bg-blue-900/20
                    transition-all duration-200 text-left
                    transform hover:scale-[1.02] hover:shadow-md
                  "
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {tool.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {tool.description}
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                      {tool.url ? '↗' : '→'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Quick access to my professional tools
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}