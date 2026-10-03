import { ColorValue } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue | string;
  size?: number;
}

export function QuestioncircleIcon({
  color = "#0F2D5C",
  size = 22,
}: IconProps) {
  const iconColor = String(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Circle cx="11" cy="11" r="7.75" stroke={iconColor} />

      <Circle cx="11.0001" cy="16.5003" r="0.458333" fill={iconColor} />

      <Path
        d="M11 14.667V13.8816C11 13.2269 11.3272 12.6155 11.872 12.2524L12.4205 11.8866C13.2511 11.3329 13.75 10.4007 13.75 9.40252V9.16699C13.75 7.64821 12.5188 6.41699 11 6.41699C9.48122 6.41699 8.25 7.64821 8.25 9.16699"
        stroke={iconColor}
      />
    </Svg>
  );
}
