import React from 'react';

interface CheckIconProps {
  width?: string;
  height?: string;
  strokeWidth?: string;
}

export default function CheckIcon({
  width = '24',
  height = '24',
  strokeWidth = '2',
}: CheckIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
