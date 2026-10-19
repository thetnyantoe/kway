import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue;
  size?: number;
}

export function SearchIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M12.6617 7.3305C12.6617 10.2749 10.2749 12.6617 7.3305 12.6617C4.38614 12.6617 1.99927 10.2749 1.99927 7.3305C1.99927 4.38614 4.38614 1.99927 7.3305 1.99927C10.2749 1.99927 12.6617 4.38614 12.6617 7.3305Z"
        strokeWidth={1.33281}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
      <Path
        d="M13.9944 13.9944L11.1289 11.1289"
        strokeWidth={1.33281}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
    </Svg>
  );
}
