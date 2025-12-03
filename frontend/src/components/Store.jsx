// Store / eBooks component for ASACODER landing page
// Showcases digital products and eBooks with quick links
import { BookOpen, ShoppingBag, Download } from 'lucide-react'
import './Store.css'

const products = [
  {
    title: 'Forex Trading Fundamentals (eBook)',
    description:
      'Step‑by‑step guide for beginners covering market structure, risk management, and practical trading setups.',
    whatYouGet: ['Full PDF download', 'Actionable checklists', 'Risk management templates'],
    badge: 'Best for Beginners',
    link: 'https://selar.com/m/traderlibrary',
    icon: <BookOpen />
  },
  {
    title: 'Digital Marketing Playbook (eBook)',
    description:
      'Proven strategies for growing your brand with social media, content, and paid ads – designed for small businesses.',
    whatYouGet: ['Campaign frameworks', 'Ad copy formulas', 'Content calendar samples'],
    badge: 'For Business Owners',
    link: 'https://selar.com/m/traderlibrary',
    icon: <ShoppingBag />
  }
]

const Store = () => {
  return (
    <section id="store" className="store">
      <div className="section-container">
        {/* Section header */}
        <div className="section-header">
          <h2 className="section-title">Store / eBooks</h2>
          <p className="section-subtitle">
            Download my practical eBooks and digital resources to learn forex, digital marketing, and tech skills at your
            own pace.
          </p>
        </div>

        <div className="store-grid">
          {products.map((product) => (
            <article key={product.title} className="store-card">
              <div className="store-header">
                <div className="store-icon">{product.icon}</div>
                <div>
                  <h3 className="store-title">{product.title}</h3>
                  <p className="store-badge">{product.badge}</p>
                </div>
              </div>

              <p className="store-description">{product.description}</p>

              <ul className="store-list">
                {product.whatYouGet.map((item) => (
                  <li key={item} className="store-list-item">
                    <span className="bullet" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="store-cta"
              >
                <Download className="store-cta-icon" />
                View this eBook on my Selar store
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Store


