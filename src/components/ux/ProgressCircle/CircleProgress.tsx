import React from 'react';

interface CircleProgressProps {
  valueProgress: number;
}
const CircleProgress: React.FC<CircleProgressProps> = ({ valueProgress }) => {
  return (
    <svg viewBox="0 0 200 210" width="120" height="120" className="transform rotate-180 	">
      <mask id="m1">
        <circle cx="100" cy="105" r="55" fill="white" />
      </mask>
      <linearGradient id="lg1">
        <stop offset="0" stopColor="green" />
      </linearGradient>

      <path
        pathLength="100"
        d="M100 175 a 75 75 0 1 1 1 0"
        stroke="#D9D9D9"
        fill="none"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDashoffset="0"
      />
      <path
        pathLength="100"
        d="M100 175 a 75 75 0 1 1 1 0"
        stroke="#6237B2"
        fill="none"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray={`${valueProgress} 0 0 100`}
        strokeDashoffset="0"
      />
    </svg>
  );
};
export default CircleProgress;
