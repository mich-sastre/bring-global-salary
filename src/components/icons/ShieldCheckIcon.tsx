import React from 'react';
import Svg, { Path } from 'react-native-svg';

type ShieldCheckIconProps = {
  size?: number;
  color?: string;
  opacity?: number;
};

export function ShieldCheckIcon({
  size = 24,
  color = '#000000',
  opacity = 0.64,
}: ShieldCheckIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.8862 4.36621L15.3745 5.84668L12.1538 4.23633L6.15381 7.23633V13.5C6.15381 15.1303 6.65654 16.1202 7.66553 17.0908C8.67282 18.0597 10.1054 18.9409 12.1538 20.1689C14.2022 18.9409 15.6348 18.0597 16.6421 17.0908C17.6511 16.1202 18.1538 15.1303 18.1538 13.5V13L20.1538 11V13.5C20.1538 17.7157 17.4224 19.3488 12.8286 22.0957C12.608 22.2276 12.3829 22.3625 12.1538 22.5C11.9247 22.3625 11.6996 22.2276 11.479 22.0957C6.88519 19.3488 4.15381 17.7157 4.15381 13.5V6L12.1538 2L16.8862 4.36621ZM20.8423 6.80957L13.2749 14.3359C12.8844 14.7263 12.2513 14.7264 11.8608 14.3359L8.23975 10.7148L9.65381 9.30078L12.5679 12.2148L19.5913 5.55859L20.8423 6.80957Z"
        fill={color}
        fillOpacity={opacity}
      />
    </Svg>
  );
}
