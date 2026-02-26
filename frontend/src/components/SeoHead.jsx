// SEO: per-route title, description, canonical, Open Graph, Twitter — using site language (ASACODER, web developer, forex, digital marketing)
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://asacoder.xyz'
const SITE_NAME = 'ASACODER'
const DEFAULT_IMAGE = `${SITE_URL}/logo.jpg`
const TWITTER_HANDLE = '@ASACODER'

const ROUTES = {
  '/': {
    title: 'ASACODER - Professional Web Developer, Forex Trainer & Digital Marketing Expert | Hire Me',
    description: 'Hire ASACODER for professional web development, forex trading mentorship, digital marketing services, and ICT training. Expert React, Node.js developer with proven results. Get started today!',
    canonical: SITE_URL + '/',
    noindex: false
  },
  '/privacy-policy': {
    title: 'Privacy Policy - ASACODER | Web Developer & Digital Solutions',
    description: 'Privacy Policy for ASACODER (asacoder.xyz). How we collect, use, and protect your information when you use our web development, forex training, and digital marketing services.',
    canonical: SITE_URL + '/privacy-policy',
    noindex: false
  },
  '/terms-of-service': {
    title: 'Terms of Service - ASACODER | Professional Web Developer & Digital Expert',
    description: 'Terms of Service for ASACODER. Rules and guidelines for using our website and services including web development, forex training, and digital marketing.',
    canonical: SITE_URL + '/terms-of-service',
    noindex: false
  },
  '/admin': {
    title: 'Admin - ASACODER',
    description: 'Admin dashboard',
    canonical: SITE_URL + '/admin',
    noindex: true
  }
}

function setMeta(name, content, property = false) {
  const attr = property ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
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

export default function SeoHead() {
  const location = useLocation()
  const pathname = location.pathname.replace(/\/$/, '') || '/'
  const routeKey = pathname || '/'
  const route = ROUTES[routeKey] || ROUTES['/']
  const canonical = route.canonical || (SITE_URL + ((pathname === '/' || pathname === '') ? '/' : pathname))
  const title = route.title || ROUTES['/'].title
  const description = route.description || ROUTES['/'].description

  useEffect(() => {
    document.title = title

    setMeta('description', description)
    setMeta('robots', route.noindex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', canonical)

    setMeta('og:type', 'website', true)
    setMeta('og:url', canonical, true)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:image', DEFAULT_IMAGE, true)
    setMeta('og:site_name', SITE_NAME, true)
    setMeta('og:locale', 'en_US', true)

    setMeta('twitter:card', 'summary_large_image', true)
    setMeta('twitter:url', canonical, true)
    setMeta('twitter:title', title, true)
    setMeta('twitter:description', description, true)
    setMeta('twitter:image', DEFAULT_IMAGE, true)
    setMeta('twitter:creator', TWITTER_HANDLE, true)
  }, [pathname, title, description, canonical, route.noindex])

  return null
}
