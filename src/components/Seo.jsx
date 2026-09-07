import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";

export default function Seo({ title, description }) {
  const { t } = useLanguage();
  const fullTitle = title ? `${title} | Hikmah IT` : t("seo.defaultTitle");

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
