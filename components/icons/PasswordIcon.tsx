import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue | string;
  size?: number;
}

export function PasswordIcon({ color = "#1F803C", size = 22 }: IconProps) {
  const strokeColor = String(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 16H4"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M12 9L12.2865 10.0038L13.299 9.75L12.5729 10.5L13.299 11.25L12.2865 10.9962L12 12L11.7135 10.9962L10.701 11.25L11.4271 10.5L10.701 9.75L11.7135 10.0038L12 9Z"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M5.5 9L5.78647 10.0038L6.79904 9.75L6.07295 10.5L6.79904 11.25L5.78647 10.9962L5.5 12L5.21353 10.9962L4.20096 11.25L4.92705 10.5L4.20096 9.75L5.21353 10.0038L5.5 9Z"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M18.5 9L18.7865 10.0038L19.799 9.75L19.0729 10.5L19.799 11.25L18.7865 10.9962L18.5 12L18.2135 10.9962L17.201 11.25L17.9271 10.5L17.201 9.75L18.2135 10.0038L18.5 9Z"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
