import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Formatter - SAID AAZRI',
  description: 'Free online text formatter tool. Convert text to different cases: sentence case, lowercase, UPPERCASE, Title Case, aLtErNaTiNg cAsE, and more. Easy to use with copy and download features.',
  keywords: [
    'text formatter',
    'case converter',
    'text converter',
    'uppercase',
    'lowercase',
    'title case',
    'sentence case',
    'alternating case',
    'text tools',
    'online tools',
    'free tools',
    'SAID AAZRI'
  ],
  openGraph: {
    title: 'Text Formatter - Convert Text Cases Online',
    description: 'Free online text formatter tool. Convert text to different cases with a single click. Copy to clipboard or download formatted text.',
    type: 'website',
    images: [
      {
        url: '/text-formatter-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Text Formatter Tool by SAID AAZRI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Formatter - Convert Text Cases Online',
    description: 'Free online text formatter tool. Convert text to different cases with a single click.',
    images: ['/text-formatter-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TextFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}