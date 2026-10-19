import { ColorValue } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

interface IconProps {
  color?: ColorValue;
  size?: number;
}

export function MoneyIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Rect x={2.75} y={5.5} width={16.5} height={11} rx={2} stroke={color} />
      <Path d="M4.58325 8.25H7.33325" stroke={color} strokeLinecap="round" />
      <Path d="M14.6667 13.75H17.4167" stroke={color} strokeLinecap="round" />
      <Circle cx={11.0001} cy={10.9998} r={1.83333} stroke={color} />
    </Svg>
  );
}
