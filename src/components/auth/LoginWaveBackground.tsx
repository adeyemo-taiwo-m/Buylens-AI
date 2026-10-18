export function LoginWaveBackground() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="login-wave-top-right-wash" cx="1000" cy="0" r="520" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--primary-600)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--primary-600)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="login-wave-top-right-band" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="var(--primary-600)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--primary-600)" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="login-wave-bottom-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary-600)" stopOpacity="0.08" />
          <stop offset="1" stopColor="var(--primary-600)" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="login-wave-bottom-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary-600)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--primary-600)" stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id="login-wave-bottom-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary-600)" stopOpacity="0.4" />
          <stop offset="1" stopColor="var(--primary-600)" stopOpacity="0.44" />
        </linearGradient>
        <radialGradient id="login-wave-bottom-right-glow" cx="820" cy="945" r="170" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--primary-600)" stopOpacity="0.4" />
          <stop offset="1" stopColor="var(--primary-600)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1000" height="1000" fill="url(#login-wave-top-right-wash)" />
      <path d="M520 0c180 80 340 90 480 170V0Z" fill="url(#login-wave-top-right-band)" />
      <path d="M430 105c210-65 390-35 570 45" fill="none" stroke="var(--bg-surface)" strokeLinecap="round" strokeOpacity="0.7" strokeWidth="2" />

      <path d="M0 840c220-40 520 20 1000 120v40H0Z" fill="url(#login-wave-bottom-back)" />
      <path d="M0 905c260-55 560-20 1000 95L1000 1000H0Z" fill="url(#login-wave-bottom-middle)" />
      <path d="M0 945c300-20 620 10 1000 55L1000 1000H0Z" fill="url(#login-wave-bottom-front)" />
      <path d="M0 885c280-23 560 20 820 107" fill="none" stroke="var(--primary-600)" strokeLinecap="round" strokeOpacity="0.65" strokeWidth="2.5" />
      <ellipse cx="820" cy="945" rx="170" ry="130" fill="url(#login-wave-bottom-right-glow)" />
    </svg>
  );
}
