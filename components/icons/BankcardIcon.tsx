import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue | string;
  size?: number;
}

export function BankCardIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  const strokeColor = String(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M15 3.75H3C2.17157 3.75 1.5 4.42157 1.5 5.25V12.75C1.5 13.5784 2.17157 14.25 3 14.25H15C15.8284 14.25 16.5 13.5784 16.5 12.75V5.25C16.5 4.42157 15.8284 3.75 15 3.75Z"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M1.5 7.5H16.5"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
