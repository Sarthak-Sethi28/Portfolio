import React from 'react';

/** Hexagonal SS monogram — the ownable identity mark. */
const Monogram: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M20 2 L34.6 10.5 L34.6 29.5 L20 38 L5.4 29.5 L5.4 10.5 Z"
      stroke="#6366F1"
      strokeWidth="1.5"
      className="opacity-70"
    />
    <text
      x="20"
      y="26"
      textAnchor="middle"
      fontFamily="Fraunces, Georgia, serif"
      fontSize="18"
      fontWeight="600"
      fill="#EDEDEF"
    >
      S
    </text>
  </svg>
);

export default Monogram;
