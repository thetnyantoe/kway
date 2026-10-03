import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue | string;
  size?: number;
}

export function AlertIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  const strokeColor = String(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <Path
        d="M8.98462 18.375C9.13822 18.641 9.35913 18.8619 9.62516 19.0155C9.89118 19.1691 10.1929 19.2499 10.5001 19.2499C10.8073 19.2499 11.1091 19.1691 11.3751 19.0155C11.6411 18.8619 11.862 18.641 12.0156 18.375"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.85434 13.4103C2.74004 13.5355 2.6646 13.6913 2.63722 13.8587C2.60983 14.0261 2.63167 14.1978 2.70009 14.353C2.7685 14.5082 2.88054 14.6401 3.02257 14.7328C3.1646 14.8255 3.3305 14.8749 3.50009 14.875H17.5001C17.6697 14.8751 17.8356 14.8258 17.9777 14.7333C18.1198 14.6408 18.232 14.509 18.3006 14.354C18.3692 14.1989 18.3913 14.0272 18.3641 13.8598C18.3369 13.6924 18.2617 13.5365 18.1476 13.4111C16.9838 12.2115 15.7501 10.9366 15.7501 7C15.7501 5.60761 15.197 4.27226 14.2124 3.28769C13.2278 2.30312 11.8925 1.75 10.5001 1.75C9.10771 1.75 7.77235 2.30312 6.78778 3.28769C5.80322 4.27226 5.25009 5.60761 5.25009 7C5.25009 10.9366 4.01547 12.2115 2.85434 13.4103Z"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
