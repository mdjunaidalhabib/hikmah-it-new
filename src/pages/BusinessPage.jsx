import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Globe2, MonitorSmartphone, Rocket } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import PricingCard from '../components/PricingCard'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { businessWebsiteTypes } from '../data/siteData'
import { apiGet } from '../lib/api'

const icons = [Rocket, MonitorSmartphone, Globe2]

export default function BusinessPage() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet('/public/packages')
      .then((packages) => setPlans(packages.filter((p) => p.category === 'ওয়েবসাইট প্যাকেজ')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-brand-50 min-h-screen">
      <Seo
        title="ল্যান্ডিং পেজ, পোর্টফোলিও ও বিজনেস ওয়েবসাইট"
        description="পার্সোনাল ব্র্যান্ড, সার্ভিস বিজনেস, কোম্পানি প্রোফাইল এবং ক্যাম্পেইন-ফোকাসড অনলাইন উপস্থিতির জন্য প্রফেশনাল ওয়েবসাইট সলিউশন।"
      />
      <PageHero
        eyebrow="বিজনেস ওয়েবসাইট"
        title="ল্যান্ডিং পেজ, পোর্টফোলিও ও বিজনেস ওয়েবসাইট"
        text="পার্সোনাল ব্র্যান্ড, সার্ভিস বিজনেস, কোম্পানি প্রোফাইল এবং ক্যাম্পেইন-ফোকাসড অনলাইন উপস্থিতির জন্য প্রফেশনাল ওয়েবসাইট সলিউশন।"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/contact">ওয়েবসাইট শুরু করুন <ArrowRight size={16} /></Button>
          <Button href="/portfolio" variant="ghost-dark">লাইভ প্রজেক্ট দেখুন</Button>
        </div>
      </PageHero>

      {/* Types */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-start gap-10 lg:grid-cols-2">
          <div className="grid gap-4">
            {businessWebsiteTypes.map((item, index) => {
              const Icon = icons[index]
              return (
                <article key={item.title} className="relative flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">{item.title}</h3>
                    <small className="mt-1 inline-block text-xs font-semibold uppercase tracking-wide text-brand-700">{item.tag}</small>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">{item.text}</p>
                  </div>
                  <ArrowRight className="absolute right-5 top-5 text-brand-600" size={20} strokeWidth={2.2} />
                </article>
              )
            })}
          </div>

          <div className="rounded-[2rem] border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-6 shadow-2xl shadow-brand-950/10">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="h-3 w-3 rounded-full bg-brand-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <strong className="ml-2 text-sm font-semibold tracking-wide text-slate-700">ওয়েবসাইট প্রিভিউ</strong>
            </div>
            <div className="rounded-3xl border border-brand-100 bg-white p-7">
              <small className="text-sm font-semibold uppercase tracking-wide text-brand-700">প্রফেশনাল ওয়েবসাইট</small>
              <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950">বিশ্বাস তৈরি করুন, কাজ প্রদর্শন করুন এবং লিড সংগ্রহ করুন</h3>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">আধুনিক লেআউট, সার্ভিস হাইলাইট, পোর্টফোলিও এরিয়া, টেস্টিমোনিয়াল এবং WhatsApp/Facebook কন্টাক্ট ফ্লো।</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
              {["ক্লিন রেসপনসিভ ডিজাইন", "লিড-ফোকাসড স্ট্রাকচার", "ডোমেইন আলাদা"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 size={16} strokeWidth={2.2} /> {item}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/pricing">ওয়েবসাইট প্যাকেজ দেখুন</Button>
              <Button href="/portfolio" variant="ghost-dark">শোকেস দেখুন</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="প্যাকেজ" title="ওয়েবসাইট প্রাইসিং প্যাকেজ" />
          {loading ? (
            <p className="py-10 text-center text-sm text-slate-400">লোড হচ্ছে…</p>
          ) : plans.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">এখনো কোনো প্যাকেজ যোগ করা হয়নি।</p>
          ) : (
            <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <PricingCard
                  key={plan._id}
                  plan={{ ...plan, price: plan.priceLabel || `৳${plan.priceAmount.toLocaleString('bn-BD')}` }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
