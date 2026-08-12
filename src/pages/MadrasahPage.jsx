import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import PricingCard from '../components/PricingCard'
import Seo from '../components/Seo'
import { FeatureCard } from '../components/Card'
import Button from '../components/Button'
import { madrasahFeatures } from '../data/siteData'
import { apiGet } from '../lib/api'

export default function MadrasahPage() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet('/public/packages')
      .then((packages) => setPlans(packages.filter((p) => p.category === 'মাদরাসা ম্যানেজমেন্ট সিস্টেম')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-brand-50 min-h-screen">
      <Seo
        title="মাদরাসা ম্যানেজমেন্ট সিস্টেম"
        description="মাদরাসা, স্কুল বা একাডেমির জন্য সম্পূর্ণ ইনস্টিটিউশন ম্যানেজমেন্ট সফটওয়্যার — স্টুডেন্ট, টিচার, অ্যাকাউন্টিং, পরীক্ষা এবং পাবলিক ওয়েবসাইট মডিউল।"
      />
      <PageHero
        eyebrow="এডুকেশন সফটওয়্যার"
        title="ওয়েবসাইট কন্ট্রোল সহ মাদরাসা ম্যানেজমেন্ট সিস্টেম"
        text="মাদরাসা, স্কুল বা একাডেমির জন্য সম্পূর্ণ ইনস্টিটিউশন ম্যানেজমেন্ট সিস্টেম। একটি অ্যাডমিন প্যানেল থেকে একাডেমিক কার্যক্রম এবং পাবলিক ওয়েবসাইট কন্টেন্ট পরিচালনা করুন।"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/contact">সিস্টেম নিয়ে আলোচনা করুন <ArrowRight size={16} /></Button>
          <Button href="/pricing" variant="ghost-dark">প্যাকেজ দেখুন</Button>
        </div>
      </PageHero>

      {/* Dashboard Preview */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-6 shadow-2xl">
            <div className="mb-5 rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-600 p-5 text-center text-xl font-semibold text-white">
              মাদরাসা ম্যানেজমেন্ট ড্যাশবোর্ড
            </div>
            <div className="grid gap-3">
              {["স্টুডেন্ট", "টিচার", "অ্যাকাউন্টিং", "ফি", "রেজাল্ট", "ভর্তি", "পাবলিক ওয়েবসাইট"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-brand-100 bg-white px-4 py-4">
                  <span className="font-medium text-slate-700">{item}</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">সক্রিয়</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl">
            <div className="space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-brand-50 to-emerald-50 p-5">
                <h3 className="text-lg font-bold text-slate-800">অল-ইন-ওয়ান কন্ট্রোল প্যানেল</h3>
                <p className="mt-1 text-sm text-slate-600">সিস্টেম পরিবর্তন ছাড়াই আপনার সম্পূর্ণ প্রতিষ্ঠান পরিচালনা করুন</p>
              </div>
              <div className="grid gap-3">
                {["স্টুডেন্ট, টিচার, স্টাফ এবং অ্যাকাউন্টিং ম্যানেজমেন্ট", "ফি, অ্যাকাউন্টিং, অ্যাটেন্ডেন্স, পরীক্ষা এবং রেজাল্ট মডিউল", "নোটিশ, গ্যালারি, ভর্তি এবং লাইব্রেরি কন্ট্রোল", "মেসেজিং সিস্টেম (SMS / ইমেইল / নোটিফিকেশন)", "সম্পূর্ণ ডাইনামিক পাবলিক ওয়েবসাইট ম্যানেজমেন্ট"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm">
                    <span className="mt-1 text-emerald-600">✓</span>
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Button href="/contact">সিস্টেম নিয়ে আলোচনা করুন</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="মডিউল" title="ইনস্টিটিউশন ম্যানেজমেন্টের জন্য সম্পূর্ণ ফিচার" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {madrasahFeatures.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-12 lg:pb-16 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="প্যাকেজ" title="মাদরাসা ম্যানেজমেন্ট প্রাইসিং" />
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
