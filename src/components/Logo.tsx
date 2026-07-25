/**
 * Workspace mark, from the supplied SVG.
 *
 * The base shape (`rx="12"` square) and the white ring glyph are the supplied
 * vectors, untouched. The original layered a raster `<pattern>` over the dark
 * base — an abstract blue/violet gradient render — which is reproduced below as
 * a mesh of radial gradients plus the dark crease.
 *
 * TO USE THE REAL RENDER: save it as `src/assets/logo-backdrop.png`, then
 *
 *     import backdrop from '../assets/logo-backdrop.png'
 *
 * and replace the whole `<g clipPath>` block with
 *
 *     <image href={backdrop} width="36" height="36"
 *            preserveAspectRatio="xMidYMid slice" clipPath="url(#logoClip)" />
 */
export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable={false}
    >
      <defs>
        <clipPath id="logoClip">
          <rect width="36" height="36" rx="12" />
        </clipPath>

        {/* Cyan corner */}
        <radialGradient
          id="lgCyan"
          cx="1"
          cy="1"
          r="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4fc3f7" />
          <stop offset="1" stopColor="#4fc3f7" stopOpacity="0" />
        </radialGradient>

        {/* Blue panel, upper right */}
        <radialGradient
          id="lgBlue"
          cx="24"
          cy="2"
          r="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2f5cf0" />
          <stop offset="1" stopColor="#2f5cf0" stopOpacity="0" />
        </radialGradient>

        {/* Pale violet, right edge */}
        <radialGradient
          id="lgViolet"
          cx="37"
          cy="11"
          r="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c9a7ff" />
          <stop offset="1" stopColor="#c9a7ff" stopOpacity="0" />
        </radialGradient>

        {/* Saturated purple sweeping the lower half */}
        <radialGradient
          id="lgPurple"
          cx="28"
          cy="35"
          r="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>

        <radialGradient
          id="lgIndigo"
          cx="4"
          cy="30"
          r="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>

        <filter id="lgSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>

      <g clipPath="url(#logoClip)">
        <rect width="36" height="36" fill="#6d3ff0" />
        <rect width="36" height="36" fill="url(#lgCyan)" />
        <rect width="36" height="36" fill="url(#lgBlue)" />
        <rect width="36" height="36" fill="url(#lgViolet)" />
        <rect width="36" height="36" fill="url(#lgIndigo)" />
        <rect width="36" height="36" fill="url(#lgPurple)" />

        {/* The dark Y-shaped crease where the two surfaces meet */}
        <path
          d="M-3 13C7 15.5 13 19 15.5 39"
          stroke="#140a36"
          strokeWidth="2.4"
          strokeOpacity="0.85"
          fill="none"
          filter="url(#lgSoft)"
        />
        <path
          d="M15 22C22 19.5 28.5 13 40 4"
          stroke="#140a36"
          strokeWidth="2"
          strokeOpacity="0.7"
          fill="none"
          filter="url(#lgSoft)"
        />
      </g>

      <path
        d="M26.052 18.8378C25.8632 20.6749 25.0554 22.3779 23.7292 23.7017C22.2036 25.2246 20.1751 26.0634 18.0175 26.0634C15.86 26.0634 13.8315 25.2246 12.3058 23.7017C10.7801 22.1787 9.93994 20.1538 9.93994 18C9.93994 15.8462 10.7801 13.8213 12.3058 12.2983C13.8315 10.7753 15.8599 9.93659 18.0175 9.93659C20.1752 9.93659 22.2036 10.7753 23.7292 12.2983C25.0553 13.622 25.8632 15.325 26.052 17.1622H28C27.8056 14.8071 26.7939 12.6188 25.1011 10.9289C23.209 9.0402 20.6934 8 18.0176 8C15.3418 8 12.8262 9.0402 10.9341 10.9289C9.04197 12.8177 8 15.3289 8 18C8 20.671 9.04197 23.1823 10.9341 25.0711C12.8262 26.9598 15.3418 28 18.0176 28C20.6934 28 23.209 26.9598 25.1011 25.0711C26.7939 23.3812 27.8056 21.1929 28 18.8378H26.052Z"
        fill="white"
      />
    </svg>
  )
}
