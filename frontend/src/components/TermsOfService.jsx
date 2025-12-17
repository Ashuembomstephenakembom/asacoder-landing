// Terms of Service page for ASACODER
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import './PrivacyPolicy.css'

const TermsOfService = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="legal-page">
      <Navbar />
      <main className="legal-content">
        <div className="legal-container">
          <div className="legal-header">
            <h1>Terms of Service</h1>
            <p className="last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the ASACODER website located at <strong>asacoder.xyz</strong> (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2>2. Use of the Service</h2>
            <h3>2.1 Eligibility</h3>
            <p>You must be at least 18 years old to use our Service. By using the Service, you represent and warrant that you are at least 18 years of age.</p>

            <h3>2.2 Acceptable Use</h3>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
              <li>Use the Service in any way that violates any applicable law or regulation</li>
              <li>Transmit any malicious code, viruses, or harmful materials</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers connected to the Service</li>
              <li>Use the Service to send spam or unsolicited communications</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
            </ul>
          </section>

          <section>
            <h2>3. Services Offered</h2>
            <p>ASACODER provides the following services:</p>
            <ul>
              <li><strong>Web Development:</strong> Custom website and web application development</li>
              <li><strong>Forex Training:</strong> Educational services and training programs for forex trading</li>
              <li><strong>Digital Marketing:</strong> Marketing strategy and implementation services</li>
              <li><strong>ICT Training:</strong> Information and Communication Technology training programs</li>
            </ul>
            <p>
              All services are subject to separate service agreements and terms that will be provided before engagement.
            </p>
          </section>

          <section>
            <h2>4. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by ASACODER and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise use our content without our prior written permission.
            </p>
          </section>

          <section>
            <h2>5. User Content</h2>
            <p>
              When you submit content through our contact form or other means, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and process such content for the purpose of responding to your inquiries and providing our services.
            </p>
            <p>
              You are solely responsible for the content you submit and warrant that you have all necessary rights to grant us the license described above.
            </p>
          </section>

          <section>
            <h2>6. Payment Terms</h2>
            <p>
              For paid services, payment terms will be specified in individual service agreements. All fees are non-refundable unless otherwise stated in writing. We reserve the right to change our pricing at any time.
            </p>
          </section>

          <section>
            <h2>7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects will be corrected.
            </p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ASACODER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless ASACODER, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or relating to your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          <section>
            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Cameroon, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:stephen@asaofficial.org">stephen@asaofficial.org</a></li>
              <li><strong>Phone:</strong> +237 653 180 273</li>
              <li><strong>Website:</strong> <a href="https://asacoder.xyz">asacoder.xyz</a></li>
            </ul>
          </section>

          <div className="legal-navigation">
            <Link to="/" className="btn btn-primary">← Back to Home</Link>
            <Link to="/privacy-policy" className="btn btn-secondary">Privacy Policy →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default TermsOfService

