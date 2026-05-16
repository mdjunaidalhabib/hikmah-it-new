import SectionHeader from '../components/SectionHeader'
import { FeatureCard } from '../components/Card'
import Button from '../components/Button'
import { madrasahFeatures } from '../data/siteData'

export default function Madrasah() {
  return (
    <section className="section madrasah-section" id="madrasah">
      <div className="container split-grid reverse">
        <div className="system-card">
          <div className="system-header">Madrasah Management Dashboard</div>
          <div className="system-list">
            {['Students', 'Teachers', 'Attendance', 'Accounting', 'Fees', 'Result', 'Public Website'].map((item) => (
              <div key={item}><span>{item}</span><strong>Active</strong></div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader
            align="left"
            eyebrow="Education Software"
            title="Madrasah Management System with website control"
            text="A complete institution management direction for madrasah, school or academy. Admin can manage academic data and public website content from one place."
          />
          <div className="check-list">
            <span>✓ Student, teacher, staff and accounting management</span>
            <span>✓ Fee, accounting, attendance, exam and result modules</span>
            <span>✓ Notice, gallery and admission section control</span>
            <span>✓ Public website managed from admin panel</span>
          </div>
          <div className="section-actions">
            <Button href="#contact">Discuss System</Button>
          </div>
        </div>
      </div>
      <div className="container feature-grid six-grid">
        {madrasahFeatures.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
      </div>
    </section>
  )
}
