import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: ColorValue | string;
  size?: number;
}

export function CommunityIcon({ color = "#0F2D5C", size = 22 }: IconProps) {
  const strokeColor = String(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <Path
        d="M14 18.375V16.625C14 15.6967 13.6313 14.8065 12.9749 14.1501C12.3185 13.4937 11.4283 13.125 10.5 13.125H5.25C4.32174 13.125 3.4315 13.4937 2.77513 14.1501C2.11875 14.8065 1.75 15.6967 1.75 16.625V18.375"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.875 9.625C9.808 9.625 11.375 8.058 11.375 6.125C11.375 4.192 9.808 2.625 7.875 2.625C5.942 2.625 4.375 4.192 4.375 6.125C4.375 8.058 5.942 9.625 7.875 9.625Z"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.25 18.375V16.625C19.2494 15.8495 18.9913 15.0962 18.5162 14.4833C18.0411 13.8704 17.3759 13.4326 16.625 13.2388"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2.73877C14.7529 2.93153 15.4202 3.36938 15.8967 3.98329C16.3732 4.5972 16.6319 5.35225 16.6319 6.12939C16.6319 6.90654 16.3732 7.66159 15.8967 8.2755C15.4202 8.88941 14.7529 9.32726 14 9.52002"
        stroke={strokeColor}
        strokeWidth="1.575"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
