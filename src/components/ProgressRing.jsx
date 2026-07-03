export default function ProgressRing({ value, label = "complete", size = 132 }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" role="img" aria-label={`${value}% ${label}`}>
        <circle className="ring-track" cx="60" cy="60" r={radius} />
        <circle className="ring-fill" cx="60" cy="60" r={radius} strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="ring-label">
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}
