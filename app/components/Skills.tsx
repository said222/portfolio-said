'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const t = useTranslations('skills')

  const skillCategories = [
    {
      title: t('categories.frontend'),
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 92 },
        { name: 'React.js', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'Tailwind CSS', level: 93 },
        { name: 'Bootstrap', level: 85 },
      ]
    },
    {
      title: t('categories.backend'),
      skills: [
        { name: 'PHP', level: 95 },
        { name: 'Symfony', level: 90 },
        { name: 'Laravel', level: 88 },
        { name: 'Python', level: 85 },
      ]
    },
    {
      title: t('categories.cms'),
      skills: [
        { name: 'WordPress', level: 88 },
        { name: 'Sylius', level: 85 },
        { name: 'Sulu', level: 82 },
      ]
    },
    {
      title: t('categories.tools'),
      skills: [
        { name: 'GitHub', level: 90 },
        { name: 'GitLab', level: 88 },
        { name: 'Docker', level: 82 },
      ]
    }
  ]

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('title')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                          ease: "easeOut"
                        }}
                        className="bg-gradient-to-r from-primary-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills