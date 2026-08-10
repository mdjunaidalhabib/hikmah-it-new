export const SECTION_HREF_MAP = {
  "/services": "services",
  "/pricing": "packages",
  "/portfolio": "portfolio",
  "/team": "team",
};

export function isSectionVisible(settings, key) {
  return !settings || settings.sectionVisibility?.[key] !== false;
}
