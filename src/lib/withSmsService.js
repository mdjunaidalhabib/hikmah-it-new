import { smsServiceEntry } from "../data/siteData";

// Services are DB-driven. Append the static Quick SMS card unless the DB already has one pointing to /sms.
// An empty list stays empty so the admin "hide services" setting keeps working.
export default function withSmsService(services, t) {
  if (!Array.isArray(services) || services.length === 0) return services;
  if (services.some((s) => s.href === smsServiceEntry.href)) return services;
  return [
    ...services,
    { ...smsServiceEntry, title: t("smsPage.service.title"), text: t("smsPage.service.text") },
  ];
}
