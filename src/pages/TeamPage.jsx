import { ExternalLink, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { teamMembers, joinRoles, owner, brand } from "../data/siteData";

function Avatar({ name, photo, size = "h-24 w-24", textSize = "text-2xl" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={`mx-auto ${size} rounded-full object-cover border-4 border-white shadow-lg shadow-blue-900/30`}
      />
    );
  }

  return (
    <div
      className={`mx-auto flex ${size} items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-slate-800 ${textSize} font-black text-white shadow-lg shadow-blue-900/30`}
    >
      {initials}
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#edf4ff]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />

        <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">
            Marketing Partners
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Our Referral & Marketing Team
          </h1>

          <p className="mt-4 text-lg text-slate-300">
            Meet our marketing and referral partners who help businesses and
            organizations discover Hikmah IT solutions and earn commissions
            through successful client referrals.
          </p>
        </div>
      </section>

      {/* Owner */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(900px,calc(100%-40px))]">
          <div className="rounded-[2rem] border border-blue-200 bg-white p-8 shadow-2xl shadow-blue-950/10">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <Avatar
                name={owner.name}
                photo={owner.photo}
                size="h-28 w-28"
                textSize="text-3xl"
              />

              <div className="text-center sm:text-left">
                <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
                  {owner.role}
                </span>

                <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                  {owner.name}
                </h2>

                <p className="mt-1 flex items-center justify-center gap-1 text-sm text-slate-500 sm:justify-start">
                  <MapPin size={14} />
                  {owner.location}
                </p>

                <p className="mt-3 leading-7 text-slate-600">{owner.bio}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {owner.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href={owner.whatsapp}>
                    <MessageCircle size={16} />
                    WhatsApp
                  </Button>

                  <Button href={owner.facebook} variant="ghost-dark">
                    <ExternalLink size={16} />
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Partners */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader
            eyebrow="Marketing Partners"
            title="Our Referral & Marketing Team"
            text="Our partners help businesses and organizations discover Hikmah IT services through marketing, referrals, and business development activities while earning commissions from successful projects."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.name + member.role}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <Avatar name={member.name} photo={member.photo} />

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {member.role}
                </p>

                <p className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-500">
                  <MapPin size={12} />
                  {member.location}
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2">
                  <span className="text-xs font-semibold text-emerald-700">
                    💰 Commission Earned: {member.earning}
                  </span>
                </div>

                <div className="mt-4 flex justify-center gap-3">
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
                  >
                    <ExternalLink size={16} />
                  </a>

                  <a
                    href={member.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-emerald-300 hover:text-emerald-600"
                  >
                    <MessageCircle size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Earn Through Referrals */}
      <section className="bg-gradient-to-br from-[#071028] to-[#0b1736] py-12 text-white lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">
              Partner Program
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Earn Through Referrals
            </h2>

            <p className="mt-3 text-lg text-slate-300">
              Refer clients to Hikmah IT and earn commissions for every
              successful project.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {joinRoles.map((role) => (
              <article
                key={role.role}
                className="rounded-[2rem] border border-blue-300/20 bg-white/10 p-7 backdrop-blur transition hover:bg-white/15"
              >
                <div className="text-4xl">{role.icon}</div>

                <h3 className="mt-4 text-xl font-bold">{role.role}</h3>

                <p className="mt-3 text-slate-300">{role.desc}</p>

                <div className="mt-5 rounded-xl border border-blue-300/20 bg-blue-500/20 px-4 py-3">
                  💰 Commission Opportunity: {role.earn}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={brand.whatsapp}>
                <MessageCircle size={16} />
                Join via WhatsApp
              </Button>

              <Button href="/contact" variant="ghost">
                Contact Us
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
