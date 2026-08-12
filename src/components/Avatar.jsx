import { useState } from "react";
import { UserRound } from "lucide-react";

export default function Avatar({ name, photo, size = "h-24 w-24", iconSize = 28, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const showImage = photo && !errored;

  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full bg-slate-100 ${size} ${className}`}>
      {showImage && (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {(!showImage || !loaded) && (
        <div className="absolute inset-0 grid place-items-center bg-slate-100 text-slate-400">
          <UserRound size={iconSize} strokeWidth={1.75} />
        </div>
      )}
    </div>
  );
}
