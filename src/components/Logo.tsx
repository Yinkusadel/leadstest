/**
 * Workspace mark, from the supplied SVG.
 *
 * The original layered two raster `<pattern>` fills over the dark base; those
 * came through truncated, so the gradient below stands in for them. Drop the
 * real artwork in as a file and swap the second <rect> if you want it exact —
 * the base shape and the white ring glyph are the supplied vectors, untouched.
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
      <rect width="36" height="36" rx="12" fill="#212121" />
      <rect width="36" height="36" rx="12" fill="url(#logoWash)" />
      <path
        d="M26.052 18.8378C25.8632 20.6749 25.0554 22.3779 23.7292 23.7017C22.2036 25.2246 20.1751 26.0634 18.0175 26.0634C15.86 26.0634 13.8315 25.2246 12.3058 23.7017C10.7801 22.1787 9.93994 20.1538 9.93994 18C9.93994 15.8462 10.7801 13.8213 12.3058 12.2983C13.8315 10.7753 15.8599 9.93659 18.0175 9.93659C20.1752 9.93659 22.2036 10.7753 23.7292 12.2983C25.0553 13.622 25.8632 15.325 26.052 17.1622H28C27.8056 14.8071 26.7939 12.6188 25.1011 10.9289C23.209 9.0402 20.6934 8 18.0176 8C15.3418 8 12.8262 9.0402 10.9341 10.9289C9.04197 12.8177 8 15.3289 8 18C8 20.671 9.04197 23.1823 10.9341 25.0711C12.8262 26.9598 15.3418 28 18.0176 28C20.6934 28 23.209 26.9598 25.1011 25.0711C26.7939 23.3812 27.8056 21.1929 28 18.8378H26.052Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="logoWash"
          x1="0"
          y1="0"
          x2="36"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8b6cff" />
          <stop offset="0.55" stopColor="#6d3ff0" />
          <stop offset="1" stopColor="#3f1fb8" />
        </linearGradient>
      </defs>
    </svg>
  )
}
