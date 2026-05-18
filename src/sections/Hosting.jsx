import { Globe2, ServerCog } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { brand } from "../data/siteData";

export default function Hosting() {
  const card =
    "rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-950/5";

  return (
    <section
      className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-8 lg:py-12"
      id="hosting"
    >
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        {/* Heading */}
        <div className="mx-auto w-[min(900px,calc(100%-40px))] text-center mb-12">
          <SectionHeader
            align="center"
            eyebrow="Domain & Hosting Support"
            title="Domain purchase and international hosting support"
            text="International provider থেকে domain ও hosting কিনতে আমরা সহায়তা করি। বাংলাদেশি payment gateway/mobile banking দিয়ে payment support পাওয়া যাবে।"
          />
        </div>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Domain Card */}
          <article className={card}>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white">
              <Globe2 size={28} />
            </div>

            <span className="mt-5 inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
              Domain Support
            </span>

            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              Domain Purchase Support
            </h3>

            <strong className="mt-2 block text-2xl font-bold text-blue-700">
              ৳1,500+
            </strong>

            <p className="mt-3 leading-7 text-slate-600">
              International provider থেকে domain কেনার জন্য সহজ ও পরিষ্কার
              support.
            </p>

            <div className="my-5 flex items-center justify-between rounded-full border border-slate-200 bg-slate-50 p-2 pl-5 text-slate-500">
              <span>yourbusiness.com</span>
              <button className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white">
                Check
              </button>
            </div>

            <ul className="grid gap-3 text-slate-700">
              {[
                "Domain name research and availability checking",
                ".com, .net, .org and relevant extension guidance",
                "Domain price extension/provider অনুযায়ী vary করবে",
              ].map((i) => (
                <li key={i}>✓ {i}</li>
              ))}
            </ul>
          </article>

          {/* Hosting Card */}
          <article
            className={`${card} border-blue-100 bg-gradient-to-br from-white to-blue-50`}
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white">
              <ServerCog size={28} />
            </div>

            <span className="mt-5 inline-flex rounded-full bg-amber-400 px-3 py-1 text-sm font-semibold text-slate-950">
              International Hosting
            </span>

            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              Hosting Purchase Support
            </h3>

            <strong className="mt-2 block text-2xl font-bold text-blue-700">
              ৳300 service charge
            </strong>

            <p className="mt-3 leading-7 text-slate-600">
              Hosting আমরা নিজেরা sell/provide করি না। Trusted international
              provider থেকে hosting কিনতে payment support দেওয়া হবে।
            </p>

            <ul className="mt-5 grid gap-3 text-slate-700">
              {[
                "Hostinger/Namecheap বা trusted provider থেকে purchase help",
                "bKash, Nagad, Rocket বা BD gateway payment support",
                "Provider bill customer pay করবে; আমাদের service charge ৳300",
              ].map((i) => (
                <li key={i}>✓ {i}</li>
              ))}
            </ul>
          </article>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-3">
          <Button href={brand.whatsapp}>Order Support</Button>
          <Button href="#contact" variant="ghost-dark">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
