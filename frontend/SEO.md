# SEO on ASACODER (asacoder.xyz)

## What’s in place

- **Internal linking**  
  - Footer: Quick Links and Services point to `/#about`, `/#services`, `/#projects`, `/#process`, `/#contact`, `/privacy-policy`, `/terms-of-service`.  
  - About: links to “services” and “get in touch” (contact).  
  - Services: links to “how I work” (process) and “get a free consultation” (contact).  
  - Process: link to “Get in touch” (contact).  
  - Projects: link to “Get in touch” (contact).  
  - Legal pages: “Back to Home” and cross-links between Privacy Policy and Terms of Service.  
  - Navbar: section anchors (hero, about, services, projects, process, contact).  
  - Links use React Router `<Link to="/#section">` so they work from any page and scroll to the section on the home page.

- **Canonicals**  
  - Set per route in JS (SeoHead):  
    - `/` → `https://asacoder.xyz/`  
    - `/privacy-policy` → `https://asacoder.xyz/privacy-policy`  
    - `/terms-of-service` → `https://asacoder.xyz/terms-of-service`  
    - `/admin` → canonical set but `noindex, nofollow`.  
  - `index.html` also has a canonical for the homepage.

- **Per-route SEO (site language)**  
  - **SeoHead** updates for each route:  
    - `document.title`  
    - `meta name="description"`  
    - `meta name="robots"` (noindex for `/admin`)  
    - `link rel="canonical"`  
    - Open Graph: `og:url`, `og:title`, `og:description`, `og:image`, `og:site_name`, `og:locale`  
    - Twitter: `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator`  
  - Copy uses your site language: ASACODER, Professional Web Developer, Forex Trainer, Digital Marketing, hire, Cameroon, React, Node.js, etc.

- **Structured data**  
  - **index.html**:  
    - **WebSite** schema (url, name, description, inLanguage, potentialAction).  
    - **Person** schema (name, jobTitle, services, contact, sameAs, etc.).

- **Sitemap**  
  - `public/sitemap.xml` includes homepage, section hashes (`/#about`, `/#services`, etc.), `/privacy-policy`, `/terms-of-service`.

## SSR / Prerender (optional, for crawlers)

The app is a **Vite SPA**: the initial HTML is the same for all routes, and meta/canonicals are updated in the client with **SeoHead**. That’s enough for many crawlers that run JS.

If you want **static HTML per route** for crawlers that don’t run JS (or for faster first paint):

1. **Prerender**  
   - Use something like `vite-plugin-prerender` or your host’s prerender (e.g. Vercel can serve static outputs for `/`, `/privacy-policy`, `/terms-of-service` if you build them).

2. **SSR**  
   - Move to a stack that supports SSR (e.g. Vite SSR, Next.js, Remix) so the server returns route-specific HTML and meta/canonicals.

Until then, the current setup (internal linking + canonicals + per-route meta in JS + WebSite/Person schema + sitemap) gives you solid SEO in your site language.
