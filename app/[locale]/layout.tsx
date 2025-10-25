import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })
const locales = ['en', 'fr'];

export const metadata: Metadata = {
  title: {
    default: 'SAID AAZRI - Full Stack Web Developer',
    template: '%s | SAID AAZRI - Full Stack Web Developer'
  },
  description: 'Portfolio of SAID AAZRI - Full Stack Web Developer specializing in PHP, WordPress, Symfony, Laravel, React.js, and modern web technologies. Based in Marrakech, Morocco.',
  keywords: [
    'SAID AAZRI',
    'Full Stack Developer',
    'Web Developer',
    'PHP Developer',
    'WordPress Developer',
    'Symfony',
    'Laravel',
    'React.js',
    'Next.js',
    'JavaScript',
    'Marrakech',
    'Morocco',
    'Freelance Developer',
    'Web Development',
    'Frontend Developer',
    'Backend Developer'
  ],
  authors: [{ name: 'SAID AAZRI', url: 'https://said-aazri.com' }],
  creator: 'SAID AAZRI',
  publisher: 'SAID AAZRI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://said-aazri.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'fr-FR': '/fr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://said-aazri.com',
    title: 'SAID AAZRI - Full Stack Web Developer',
    description: 'Portfolio of SAID AAZRI - Full Stack Web Developer specializing in PHP, WordPress, Symfony, Laravel, React.js, and modern web technologies.',
    siteName: 'SAID AAZRI Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SAID AAZRI - Full Stack Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAID AAZRI - Full Stack Web Developer',
    description: 'Portfolio of SAID AAZRI - Full Stack Web Developer specializing in PHP, WordPress, Symfony, Laravel, React.js, and modern web technologies.',
    images: ['/og-image.jpg'],
    creator: '@said_aazri',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'SAID AAZRI',
    jobTitle: 'Full Stack Web Developer',
    description: 'Full Stack Web Developer specializing in PHP, WordPress, Symfony, Laravel, React.js, and modern web technologies.',
    url: 'https://said-aazri.com',
    image: 'https://said-aazri.com/profile-image.jpg',
    sameAs: [
      'https://github.com/said-aazri',
      'https://linkedin.com/in/said-aazri',
      'https://twitter.com/said_aazri'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marrakech',
      addressCountry: 'Morocco'
    },
    email: 'contact@said-aazri.com',
    telephone: '+212771956648',
    knowsAbout: [
      'PHP',
      'WordPress',
      'Symfony',
      'Laravel',
      'JavaScript',
      'React.js',
      'Next.js',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Bootstrap',
      'Web Development',
      'Full Stack Development'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    }
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}