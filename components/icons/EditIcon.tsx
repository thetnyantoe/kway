import { ColorValue } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface IconProps {
  color?: ColorValue | string;
  size?: number;
}

export function EditIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  const strokeColor = String(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <G clip-path="url(#clip0_1_3920)">
        <Path
          d="M7.99691 1.99902H3.33208C2.97859 1.99902 2.63959 2.13944 2.38964 2.38939C2.13969 2.63934 1.99927 2.97835 1.99927 3.33183V12.6615C1.99927 13.015 2.13969 13.354 2.38964 13.6039C2.63959 13.8539 2.97859 13.9943 3.33208 13.9943H12.6617C13.0152 13.9943 13.3542 13.8539 13.6042 13.6039C13.8541 13.354 13.9945 13.015 13.9945 12.6615V7.99666"
          stroke={strokeColor}
          stroke-width="1.33281"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12.2452 1.74901C12.5103 1.4839 12.8699 1.33496 13.2448 1.33496C13.6198 1.33496 13.9793 1.4839 14.2444 1.74901C14.5095 2.01412 14.6585 2.37369 14.6585 2.74862C14.6585 3.12354 14.5095 3.48311 14.2444 3.74822L8.23813 9.75519C8.0799 9.91329 7.88441 10.029 7.66969 10.0917L5.75511 10.6515C5.69777 10.6682 5.63698 10.6692 5.57912 10.6544C5.52126 10.6396 5.46844 10.6095 5.42621 10.5672C5.38397 10.525 5.35386 10.4722 5.33904 10.4143C5.32421 10.3565 5.32522 10.2957 5.34194 10.2383L5.90172 8.32375C5.96471 8.10921 6.08067 7.91396 6.23892 7.75598L12.2452 1.74901Z"
          stroke={strokeColor}
          stroke-width="1.33281"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_3920">
          <Rect width="15.9937" height="15.9937" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
