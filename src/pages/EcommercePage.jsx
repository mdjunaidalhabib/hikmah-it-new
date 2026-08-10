import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Seo from '../components/Seo'
import { FeatureCard } from '../components/Card'
import PricingCard from '../components/PricingCard'
import Button from '../components/Button'
import { ecommerceFeatures } from '../data/siteData'
import { apiGet } from '../lib/api'

export default function EcommercePage() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet('/public/packages')
      .then((packages) => setPlans(packages.filter((p) => p.category === 'ই-কমার্স ওয়েবসাইট')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="অ্যাডমিন প্যানেল সহ ই-কমার্স ওয়েবসাইট"
        description="প্রোডাক্ট, অর্ডার, পেমেন্ট এবং ডেলিভারি ম্যানেজমেন্ট সহ সম্পূর্ণ ফিচারযুক্ত ই-কমার্স ওয়েবসাইট, ক্লিন ও শক্তিশালী অ্যাডমিন প্যানেলের মাধ্যমে।"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-light py-10">
        <div className="absolute inset-0 opacity-70 bg-grid-overlay" />
        <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-700">
              প্রধান সার্ভিস
            </span>
            <h1 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              শক্তিশালী অ্যাডমিন প্যানেল সহ ফুল ই-কমার্স ওয়েবসাইট
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              একটি প্রফেশনাল অনলাইন স্টোরের জন্য শুধু সুন্দর হোমপেজ যথেষ্ট নয় — প্রোডাক্ট কন্ট্রোল, অর্ডার ওয়ার্কফ্লো, কাস্টমার ট্রাস্ট, মোবাইল শপিং এবং সম্পূর্ণ অ্যাডমিন ম্যানেজমেন্ট দরকার।
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact">স্টোর শুরু করুন <ArrowRight size={16} /></Button>
              <Button href="/pricing" variant="ghost-dark">প্যাকেজ দেখুন</Button>
            </div>
          </div>
          <div className="hidden rounded-[2rem] border border-blue-100 bg-white/80 p-5 shadow-2xl backdrop-blur-xl lg:block">
            <div className="grid gap-3">
              {["প্রোডাক্ট, ক্যাটাগরি ও স্টক ম্যানেজমেন্ট", "অর্ডার, পেমেন্ট ও ডেলিভারি স্ট্যাটাস", "কাস্টমার অ্যাকাউন্ট ও অর্ডার ট্র্যাকিং", "SEO-রেডি প্রোডাক্ট পেজ", "মোবাইল-ফ্রেন্ডলি শপিং এক্সপেরিয়েন্স"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-slate-700">
                  <span className="text-blue-600">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="ফিচার" title="আপনার অনলাইন স্টোরের জন্য প্রয়োজনীয় সবকিছু" text="প্রোডাক্ট আপলোড থেকে অর্ডার ডেলিভারি পর্যন্ত — সবকিছু একটি ক্লিন অ্যাডমিন প্যানেল থেকে নিয়ন্ত্রিত।" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ecommerceFeatures.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="প্যাকেজ" title="ই-কমার্স প্রাইসিং প্যাকেজ" />
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

      {/* CTA */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900">আপনার অনলাইন স্টোর লঞ্চ করতে প্রস্তুত?</h2>
        <p className="mt-3 text-slate-600">যোগাযোগ করুন, আমরা শুরু থেকে আপনার ই-কমার্স স্টোর তৈরি করে দেব।</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/contact">ফ্রি জানুন <ArrowRight size={16} /></Button>
          <Button href="/portfolio" variant="ghost-dark">লাইভ প্রজেক্ট দেখুন</Button>
        </div>
      </section>
    </div>
  )
}
