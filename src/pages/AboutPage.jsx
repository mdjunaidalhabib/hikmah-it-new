import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { aboutStats, whyUs, brand, trustItems } from '../data/siteData'
import useSiteSettings from '../lib/useSiteSettings'

export default function AboutPage() {
  const settings = useSiteSettings()
  const founder = settings?.founder

  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="আমাদের সম্পর্কে"
        description="Hikmah IT-এর লক্ষ্য জানুন — বাংলাদেশের ব্যবসা ও শিক্ষা প্রতিষ্ঠানের জন্য প্রফেশনাল ওয়েব ডেভেলপমেন্ট সহজলভ্য করা।"
      />
      <PageHero
        eyebrow="আমরা কারা"
        title="Hikmah IT সম্পর্কে"
        text={`${brand.tagline} — বাংলাদেশজুড়ে ব্যবসা ও প্রতিষ্ঠানকে শক্তিশালী ডিজিটাল উপস্থিতি তৈরিতে সাহায্য করছি।`}
      />

      {/* Stats */}
      <section className="py-10">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-blue-100 bg-white p-6 text-center shadow-lg">
                <strong className="block text-3xl font-bold text-blue-600">{stat.value}</strong>
                <span className="mt-1 block text-sm font-semibold text-slate-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">আমাদের গল্প</span>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">ব্যবসাকে ডিজিটাল করার প্যাশন থেকে তৈরি</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Hikmah IT প্রতিষ্ঠিত হয়েছে একটি স্পষ্ট লক্ষ্য নিয়ে: বাংলাদেশের ছোট ব্যবসা ও শিক্ষা প্রতিষ্ঠানের জন্য প্রফেশনাল ওয়েব ডেভেলপমেন্ট সহজলভ্য করা। অনেক ব্যবসা ডিজিটাল গ্রোথের সুযোগ হারাচ্ছিল কারণ মানসম্পন্ন ওয়েব সলিউশন হয় খুব ব্যয়বহুল অথবা খুব জটিল ছিল।
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              আমরা সহজ, ক্লিন এবং কার্যকর ওয়েবসাইট তৈরি শুরু করেছি — ই-কমার্স স্টোর, বিজনেস ওয়েবসাইট, পোর্টফোলিও পেজ এবং ইনস্টিটিউশন ম্যানেজমেন্ট সিস্টেম — এমন দামে যা বাংলাদেশের বাজারে সত্যিই কার্যকর।
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/services">আমাদের সার্ভিস <ArrowRight size={16} /></Button>
              <Button href="/contact" variant="ghost-dark">কথা বলুন</Button>
            </div>
          </div>

          {/* Mission/Vision */}
          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-blue-100 bg-white p-7 shadow-xl">
              <span className="text-3xl">🎯</span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">আমাদের মিশন</h3>
              <p className="mt-2 leading-7 text-slate-600">বাংলাদেশের প্রতিটি ব্যবসা, প্রতিষ্ঠান ও উদ্যোক্তাকে সাশ্রয়ী, প্রফেশনাল এবং ফলাফল-ভিত্তিক ডিজিটাল সলিউশন দিয়ে ক্ষমতায়ন করা — একটি ক্লিন ওয়েবসাইট থেকে শুরু করে সম্পূর্ণ ম্যানেজমেন্ট সিস্টেম পর্যন্ত।</p>
            </div>
            <div className="rounded-[2rem] border border-blue-100 bg-white p-7 shadow-xl">
              <span className="text-3xl">🌟</span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">আমাদের ভিশন</h3>
              <p className="mt-2 leading-7 text-slate-600">ছোট থেকে মাঝারি ব্যবসার জন্য বাংলাদেশের সবচেয়ে বিশ্বস্ত ডিজিটাল এজেন্সি হয়ে ওঠা — ক্লিন ডিজাইন, সৎ প্রাইসিং এবং ডেলিভারির পরেও থেমে না যাওয়া প্রকৃত সাপোর্টের জন্য পরিচিত।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="কেন Hikmah IT" title="কেন ব্যবসারা আমাদের বেছে নেয়" text="আমরা বাংলাদেশের জন্য তৈরি করি — আমরা লোকাল মার্কেট, পেমেন্ট মেথড এবং ব্যবসায়িক সংস্কৃতি বুঝি।" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-[#edf4ff] p-6 shadow-lg transition hover:shadow-xl">
                <CheckCircle2 className="text-blue-600" size={26} />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="আমাদের মান" title="বিশ্বাস, গতি এবং প্রফেশনাল উপস্থাপনার জন্য তৈরি" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(({ icon: Icon, title }) => (
              <div key={title} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-lg transition hover:shadow-xl">
                <Icon className="text-blue-600" size={22} />
                <span>{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner brief */}
      {founder?.name && (
        <section className="py-8 pb-16 bg-white">
          <div className="mx-auto w-[min(900px,calc(100%-40px))]">
            <div className="rounded-[2rem] border border-blue-200 bg-[#edf4ff] p-8 text-center shadow-xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-bold text-white shadow-lg">
                {founder.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <h3 className="mt-4 text-2xl font-medium text-slate-900">{founder.name}</h3>
              <p className="mt-1 text-sm font-semibold text-blue-600">{founder.role}, Hikmah IT</p>
              <p className="mt-4 mx-auto max-w-lg leading-7 text-slate-600">"{founder.bio}"</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/team">সম্পূর্ণ টিমের সাথে পরিচিত হন <ArrowRight size={16} /></Button>
                <Button href="/contact" variant="ghost-dark">যোগাযোগ করুন</Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
