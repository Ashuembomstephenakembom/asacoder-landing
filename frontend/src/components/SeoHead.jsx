import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://www.asacoder.xyz'
const SITE_NAME = 'ASACODER'
const DEFAULT_IMAGE = `${SITE_URL}/digital%20solutions.jpg`
const DEFAULT_KEYWORDS = [
  'ASACODER',
  'Stephthecoder',
  'Ashuembom Stephen Akembom',
  'web developer',
  'full stack developer',
  'React developer',
  'Node.js developer',
  'JavaScript developer',
  'digital marketing expert',
  'forex trainer',
  'ICT trainer',
  'website development',
  'portfolio website developer',
  'Cameroon web developer',
  'remote web developer'
]

const ROUTES = {
  '/': {
    title: 'ASACODER | Web Developer, Forex Trainer and Digital Marketing Expert',
    description: 'ASACODER builds modern websites and web apps, offers forex trading mentorship, and provides digital marketing and ICT training for businesses and individuals.',
    canonical: `${SITE_URL}/`,
    keywords: [
      'ASACODER website',
      'hire web developer',
      'React website developer',
      'Node.js web app developer',
      'digital solutions expert',
      'forex mentorship',
      'digital marketing services'
    ],
    noindex: false
  },
  '/privacy-policy': {
    title: 'Privacy Policy | ASACODER',
    description: 'Read the ASACODER privacy policy to understand how personal information is collected, used, and protected across our website and digital services.',
    canonical: `${SITE_URL}/privacy-policy`,
    keywords: ['ASACODER privacy policy', 'website privacy policy', 'data protection policy'],
    noindex: false
  },
  '/terms-of-service': {
    title: 'Terms of Service | ASACODER',
    description: 'Review the ASACODER terms of service for website usage, service engagement, responsibilities, and legal information.',
    canonical: `${SITE_URL}/terms-of-service`,
    keywords: ['ASACODER terms of service', 'website terms and conditions', 'service terms'],
    noindex: false
  },
  '/admin': {
    title: 'Admin | ASACODER',
    description: 'Private admin dashboard for ASACODER.',
    canonical: `${SITE_URL}/admin`,
    keywords: ['ASACODER admin'],
    noindex: true
  }
}

function setMeta(name, content, attribute = 'name') {
  let el = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content || '')
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href || '')
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function removeJsonLd(id) {
  const el = document.getElementById(id)
  if (el) {
    el.remove()
  }
}

function getPageSchemas(pathname, title, description, canonical) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    image: DEFAULT_IMAGE,
    sameAs: [
      'https://www.linkedin.com/in/ashuembom-stephen-akembom-b84302260/',
      'https://github.com/Ashuembomstephenakembom',
      'https://t.me/ASACODER',
      'https://www.facebook.com/akembom.stephen/?viewas=100000686899395',
      'https://x.com/stephen_akembom?s=21'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'stephen@asaofficial.org',
        telephone: '+237653180273',
        areaServed: 'Worldwide',
        availableLanguage: ['English']
      }
    ]
  }

  if (pathname === '/') {
    return [
      organization,
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description,
        inLanguage: 'en'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Ashuembom Stephen Akembom',
        alternateName: ['ASACODER', 'Stephthecoder'],
        url: SITE_URL,
        image: DEFAULT_IMAGE,
        jobTitle: 'Full Stack Web Developer, Forex Trainer and Digital Marketing Expert',
        worksFor: {
          '@id': `${SITE_URL}/#organization`
        },
        sameAs: organization.sameAs,
        knowsAbout: [
          'Web Development',
          'React.js',
          'Node.js',
          'MongoDB',
          'Digital Marketing',
          'Forex Trading',
          'ICT Training'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'ASACODER Digital Solutions',
        url: SITE_URL,
        description,
        image: DEFAULT_IMAGE,
        provider: {
          '@id': `${SITE_URL}/#person`
        },
        areaServed: 'Worldwide',
        serviceType: [
          'Website Development',
          'Digital Marketing',
          'Forex Training',
          'ICT Training'
        ]
      }
    ]
  }

  const pageName = pathname === '/privacy-policy' ? 'Privacy Policy' : 'Terms of Service'

  return [
    organization,
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      isPartOf: {
        '@id': `${SITE_URL}/#website`
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: pageName,
          item: canonical
        }
      ]
    }
  ]
}

export default function SeoHead() {
  const location = useLocation()
  const pathname = location.pathname.replace(/\/$/, '') || '/'
  const route = ROUTES[pathname] || ROUTES['/']
  const canonical = route.canonical || (pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`)
  const title = route.title || ROUTES['/'].title
  const description = route.description || ROUTES['/'].description
  const keywords = [...DEFAULT_KEYWORDS, ...(route.keywords || [])].join(', ')

  useEffect(() => {
    document.title = title

    setMeta('title', title)
    setMeta('description', description)
    setMeta('keywords', keywords)
    setMeta('robots', route.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setLink('canonical', canonical)

    setMeta('og:type', 'website', 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:image', DEFAULT_IMAGE, 'property')
    setMeta('og:image:alt', `${SITE_NAME} digital solutions branding`, 'property')
    setMeta('og:site_name', SITE_NAME, 'property')
    setMeta('og:locale', 'en_US', 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:url', canonical)
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', DEFAULT_IMAGE)
    setMeta('twitter:site', '@ASACODER')
    setMeta('twitter:creator', '@ASACODER')

    if (!route.noindex) {
      setJsonLd('asacoder-jsonld', getPageSchemas(pathname, title, description, canonical))
    } else {
      removeJsonLd('asacoder-jsonld')
    }
  }, [pathname, title, description, canonical, keywords, route.noindex])

  return null
}
