import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue;
  size?: number;
}

export function BedIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M21.5 18.5V7.5C21.5 6.39543 20.6046 5.5 19.5 5.5H15.5C14.3954 5.5 13.5 6.39543 13.5 7.5V18.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 18.5V10.5H3.5C2.94772 10.5 2.5 10.9477 2.5 11.5V18.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.5 10.5H21.5V13.5H2.5V11.5C2.5 10.9477 2.94771 10.5 3.5 10.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 12.5V11.5C10.5 10.9477 10.9477 10.5 11.5 10.5H20.5C21.0523 10.5 21.5 10.9477 21.5 11.5V12.5C21.5 13.0523 21.0523 13.5 20.5 13.5H11.5C10.9477 13.5 10.5 13.0523 10.5 12.5Z"
        fill={color}
      />
    </Svg>
  );
}
