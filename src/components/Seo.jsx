import { Helmet } from "react-helmet-async";

export default function Seo({ title, description }) {
  const fullTitle = title ? `${title} | Hikmah IT` : "Hikmah IT | E-commerce & Madrasah Management Software";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
}
