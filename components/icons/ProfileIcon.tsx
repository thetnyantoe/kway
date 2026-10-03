import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue | string;
  size?: number;
}

export function ProfileIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  const strokeColor = String(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <Path
        d="M16.625 18.375V16.625C16.625 15.6967 16.2563 14.8065 15.5999 14.1501C14.9435 13.4937 14.0533 13.125 13.125 13.125H7.875C6.94674 13.125 6.0565 13.4937 5.40013 14.1501C4.74375 14.8065 4.375 15.6967 4.375 16.625V18.375"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 9.625C12.433 9.625 14 8.058 14 6.125C14 4.192 12.433 2.625 10.5 2.625C8.567 2.625 7 4.192 7 6.125C7 8.058 8.567 9.625 10.5 9.625Z"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
