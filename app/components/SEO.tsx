import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

export default function SEO({
  title = 'SAID AAZRI - Full Stack Web Developer',
  description = 'Portfolio of SAID AAZRI - Full Stack Web Developer specializing in PHP, WordPress, Symfony, Laravel, React.js, and modern web technologies.',
  canonical,
  ogImage = '/og-image.jpg',
  noindex = false
}: SEOProps) {
  const fullTitle = title.includes('SAID AAZRI') ? title : `${title} | SAID AAZRI`
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO tags */}
      <meta name="author" content="SAID AAZRI" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en,fr" />
    </Head>
  )
}