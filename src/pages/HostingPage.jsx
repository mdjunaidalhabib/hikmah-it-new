import { Globe2, ServerCog, CheckCircle2, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { brand } from '../data/siteData'

const listItem = "flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[15px] leading-6 text-slate-700"

export default function HostingPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="ডোমেইন ও হোস্টিং সাপোর্ট"
        description="বিশ্বস্ত ইন্টারন্যাশনাল প্রোভাইডার থেকে ডোমেইন কেনার গাইডেন্স এবং হোস্টিং পেমেন্ট সহায়তা, বিকাশ/নগদ/রকেট পেমেন্ট সাপোর্ট সহ।"
      />
      <PageHero
        eyebrow="ডোমেইন ও হোস্টিং সাপোর্ট"
        title="ডোমেইন কেনা ও হোস্টিং পেমেন্ট সহায়তা"
        text="আমরা কাস্টমারদের ইন্টারন্যাশনাল প্রোভাইডার থেকে ডোমেইন কিনতে সাহায্য করি এবং বিশ্বস্ত গ্লোবাল প্ল্যাটফর্ম থেকে হোস্টিং কেনার পেমেন্ট সহায়তা প্রদান করি।"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/contact">সাপোর্ট নিন <ArrowRight size={16} /></Button>
          <Button href="/pricing" variant="ghost-dark">প্যাকেজ দেখুন</Button>
        </div>
      </PageHero>

      {/* Cards */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Domain */}
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white"><Globe2 size={28} /></div>
                <div>
                  <span className="text-sm font-medium text-blue-700">ডোমেইন পারচেজ সাপোর্ট</span>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-950">ইন্টারন্যাশনাল সাইট থেকে ডোমেইন কিনুন</h3>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm text-slate-500">শুরু থেকে</p>
                <strong className="mt-1 block text-3xl font-semibold text-blue-700">৳১,৫০০+</strong>
                <p className="mt-2 text-sm text-slate-600">ডোমেইনের মূল্য প্রোভাইডার, এক্সটেনশন এবং অ্যাভেইলেবিলিটির উপর নির্ভর করে।</p>
              </div>
              <p className="mt-5 leading-7 text-slate-600">আমরা Namecheap, GoDaddy, Hostinger বা অনুরূপ বিশ্বস্ত ইন্টারন্যাশনাল ডোমেইন প্রোভাইডার থেকে ডোমেইন কিনতে সাহায্য করি।</p>
              <div className="my-5 flex items-center justify-between rounded-full border border-slate-200 bg-slate-50 p-2 pl-5 text-slate-500">
                <span>yourbusiness.com</span>
                <span className="rounded-full bg-blue-600 px-5 py-2 font-medium text-white">চেক করুন</span>
              </div>
              <ul className="grid gap-3">
                {["ডোমেইন নেম রিসার্চ ও অ্যাভেইলেবিলিটি চেকিং", "ইন্টারন্যাশনাল প্ল্যাটফর্ম থেকে ডোমেইন পারচেজ সাপোর্ট", ".com, .net, .org এবং অন্যান্য এক্সটেনশনের গাইডেন্স", "পারচেজের পর বেসিক ডোমেইন সেটআপ সাপোর্ট"].map((item) => (
                  <li key={item} className={listItem}><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-blue-600" /><span>{item}</span></li>
                ))}
              </ul>
            </article>

            {/* Hosting */}
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white"><ServerCog size={28} /></div>
                <div>
                  <span className="text-sm font-medium text-blue-700">হোস্টিং পেমেন্ট সাপোর্ট</span>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-950">শুধুমাত্র হোস্টিং পেমেন্ট সহায়তা</h3>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <p className="text-sm text-slate-500">সার্ভিস চার্জ</p>
                <strong className="mt-1 block text-3xl font-semibold text-amber-700">৳৩০০</strong>
                <p className="mt-2 text-sm text-slate-600">হোস্টিং বিল কাস্টমার সরাসরি প্রোভাইডারকে পরিশোধ করবেন।</p>
              </div>
              <p className="mt-5 leading-7 text-slate-600">আমরা সরাসরি হোস্টিং বিক্রি বা প্রদান করি না। আমরা শুধু বিশ্বস্ত ইন্টারন্যাশনাল প্রোভাইডার থেকে হোস্টিং প্ল্যানের পেমেন্ট সম্পন্ন করতে কাস্টমারদের সাহায্য করি।</p>
              <ul className="mt-5 grid gap-3">
                {["ইন্টারন্যাশনাল হোস্টিং প্রোভাইডারের জন্য পেমেন্ট সহায়তা", "Hostinger, Namecheap, GoDaddy বা অনুরূপ প্ল্যাটফর্মের জন্য সাপোর্ট", "বিকাশ, নগদ, রকেট বা লোকাল গেটওয়ে পেমেন্ট সাপোর্ট", "কাস্টমার প্রোভাইডারের বিল পরিশোধ করে; আমাদের সার্ভিস চার্জ ৳৩০০"].map((item) => (
                  <li key={item} className={listItem}><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-blue-600" /><span>{item}</span></li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={brand.whatsapp}>অর্ডার সাপোর্ট</Button>
            <Button href="/contact" variant="ghost-dark">যোগাযোগ করুন</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
