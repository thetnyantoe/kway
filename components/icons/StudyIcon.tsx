import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue | string;
  size?: number;
}

export function StudyIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  const strokeColor = String(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <Path
        d="M18.7424 9.55682C18.8991 9.48772 19.032 9.37418 19.1248 9.23027C19.2175 9.08636 19.266 8.91841 19.2642 8.74721C19.2625 8.57602 19.2105 8.4091 19.1148 8.26714C19.0191 8.12518 18.8839 8.01442 18.7258 7.94857L11.2262 4.53257C10.9982 4.42857 10.7505 4.37476 10.4999 4.37476C10.2494 4.37476 10.0017 4.42857 9.7737 4.53257L2.27495 7.94507C2.11917 8.01329 1.98665 8.12544 1.89359 8.26778C1.80053 8.41013 1.75098 8.57651 1.75098 8.74657C1.75098 8.91663 1.80053 9.08301 1.89359 9.22535C1.98665 9.3677 2.11917 9.47984 2.27495 9.54807L9.7737 12.9676C10.0017 13.0716 10.2494 13.1254 10.4999 13.1254C10.7505 13.1254 10.9982 13.0716 11.2262 12.9676L18.7424 9.55682Z"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.25 8.75V14"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.25 10.9375V14C5.25 14.6962 5.80312 15.3639 6.78769 15.8562C7.77226 16.3484 9.10761 16.625 10.5 16.625C11.8924 16.625 13.2277 16.3484 14.2123 15.8562C15.1969 15.3639 15.75 14.6962 15.75 14V10.9375"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
