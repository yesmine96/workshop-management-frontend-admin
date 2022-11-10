import React from 'react';

interface CircleProgressProps {
  valueProgress: number;
  value: number;
}
const CircleProgress: React.FC<CircleProgressProps> = ({ value, valueProgress }) => {
  return (
    <svg viewBox="0 0 200 210" width="87" height="87" className="transform rotate-180 mr-20	">
      <mask id="m1">
        <circle cx="100" cy="105" r="55" fill="white" />
      </mask>
      <linearGradient id="lg1">
        <stop offset="0" stopColor="green" />
      </linearGradient>

      <path
        pathLength="100"
        d="M100 175 a 75 75 0 1 1 1 0"
        stroke="#C8C8C8"
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDashoffset="0"
      />
      <path
        pathLength="100"
        d="M100 175 a 75 75 0 1 1 1 0"
        stroke="#00A1A2"
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${valueProgress} 0 0 100`}
        strokeDashoffset="0"
      />
      <text
        x={value === 1 ? 60 : 50}
        y={123}
        fontFamily="Poppins"
        fill="#00A1A2"
        fontSize="60"
        transform="translate(100 100) rotate(180 50 50)"
      >
        {value}/
      </text>
      <text
        x={value === 1 ? 110 : 120}
        y={125}
        fontFamily="Poppins"
        fill="#00A1A2"
        fontSize="40"
        transform="translate(100 100) rotate(180 50 50)"
      >
        5
      </text>
    </svg>
  );
};
export default CircleProgress;
