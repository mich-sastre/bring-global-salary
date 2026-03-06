import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

type PersonIconProps = {
  size?: number;
  color?: string;
};

export function PersonIcon({ size = 32, color = '#000000' }: PersonIconProps) {
  const scale = size / 32;
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx="16" cy="11" r="4.5" stroke={color} strokeWidth={2 / scale} fill="none" />
      <Path
        d="M8 25C8 21.134 11.582 18 16 18C20.418 18 24 21.134 24 25"
        stroke={color}
        strokeWidth={2 / scale}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
