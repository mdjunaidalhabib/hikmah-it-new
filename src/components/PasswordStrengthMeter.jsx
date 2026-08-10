function scorePassword(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const LEVELS = [
  { max: 1, label: "দুর্বল", color: "bg-red-500", text: "text-red-600" },
  { max: 3, label: "মাঝারি", color: "bg-amber-500", text: "text-amber-600" },
  { max: 5, label: "শক্তিশালী", color: "bg-emerald-500", text: "text-emerald-600" },
];

export default function PasswordStrengthMeter({ password }) {
  if (!password) return null;

  const score = scorePassword(password);
  const level = LEVELS.find((l) => score <= l.max) || LEVELS[LEVELS.length - 1];
  const percent = Math.min(100, (score / 5) * 100);

  return (
    <div className="mt-1.5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full transition-all duration-300 ${level.color}`} style={{ width: `${percent}%` }} />
      </div>
      <p className={`mt-1 text-xs font-medium ${level.text}`}>পাসওয়ার্ড শক্তি: {level.label}</p>
    </div>
  );
}
