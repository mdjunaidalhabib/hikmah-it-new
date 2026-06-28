import { Link } from "react-router-dom";
import Logo from '../components/Logo'
import { quickLinks, brand } from "../data/siteData";

export default function Footer() {
  const link = 'mb-2 block text-slate-300 transition hover:text-white';
  return (
    <footer className="bg-[#020617] py-14 pb-6 text-white">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.9fr_.9fr]">
        <div>
          <Link to="/">
            <Logo />
          </Link>
          <p className="mt-4 max-w-sm leading-8 text-slate-400">
            {brand.tagline}. We build modern websites, e-commerce platforms,
            domain/international hosting support and institution management
            solutions.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-black">Quick Links</h4>
          {quickLinks.map((item) => (
            <Link className={link} key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h4 className="mb-4 font-black">Main Services</h4>
          <Link className={link} to="/ecommerce">
            E-commerce Website
          </Link>
          <Link className={link} to="/madrasah">
            Madrasah Management
          </Link>
          <Link className={link} to="/business">
            Portfolio Website
          </Link>
          <Link className={link} to="/business">
            Landing Page
          </Link>
          <Link className={link} to="/hosting">
            Hosting & Domain
          </Link>
          <Link className={link} to="/earn">
            Online Earn Money
          </Link>
        </div>
        <div>
          <h4 className="mb-4 font-black">Contact</h4>
          <a className={link} href={brand.phoneHref}>
            {brand.phone}
          </a>
          <a className={link} href={brand.emailHref}>
            {brand.email}
          </a>
          <span className="mb-2 block text-slate-300">{brand.location}</span>
          <a
            className={link}
            href={brand.facebook}
            target="_blank"
            rel="noreferrer"
          >
            Visit Facebook Page
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 w-[min(1180px,calc(100%-40px))] border-t border-white/10 pt-6 text-slate-400">
        © {new Date().getFullYear()} Hikmah IT. All rights reserved.
      </div>
    </footer>
  );
}
