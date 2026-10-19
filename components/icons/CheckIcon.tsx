import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue;
  size?: number;
}

export function CheckIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M0 7.99687C0 3.58032 3.58032 0 7.99687 0C12.4134 0 15.9937 3.58032 15.9937 7.99687C15.9937 12.4134 12.4134 15.9937 7.99687 15.9937C3.58032 15.9937 0 12.4134 0 7.99687Z"
        fill="#EBF4FF"
      />
      <Path
        d="M10.9968 5.74707L6.87183 9.87207L4.99683 7.99707"
        stroke={color}
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
