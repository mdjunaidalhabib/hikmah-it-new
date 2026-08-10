import { useEffect, useState } from "react";
import { apiGet } from "./api";

export default function useSiteSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let active = true;
    apiGet("/public/settings")
      .then((data) => {
        if (active) setSettings(data);
      })
      .catch(() => {
        // Public site should keep working with static fallbacks if the API is unavailable.
      });
    return () => {
      active = false;
    };
  }, []);

  return settings;
}
