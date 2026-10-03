import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const PADDING_HORIZONTAL = 30;
const { width } = Dimensions.get("window");
const HEADER_WIDTH = width;
const HEADER_HEIGHT = 160;

const P0 = { x: PADDING_HORIZONTAL + 40, y: 110 };
const P1 = { x: HEADER_WIDTH / 2, y: 15 };
const P2 = { x: HEADER_WIDTH - PADDING_HORIZONTAL - 40, y: 60 };
const PATH_D = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`;

// Approximate length of the quadratic Bezier curve path
const PATH_LENGTH = HEADER_WIDTH;

interface HeaderMapRouteProps {
  progress: SharedValue<number>;
}

export function HeaderMapRoute({ progress }: HeaderMapRouteProps) {
  const animatedRouteProps = useAnimatedProps(() => {
    const strokeDashoffset = PATH_LENGTH * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });

  const planeAnimatedStyle = useAnimatedStyle(() => {
    "worklet";
    const t = progress.value;
    const mt = 1 - t;

    const x = mt * mt * P0.x + 2 * mt * t * P1.x + t * t * P2.x;
    const y = mt * mt * P0.y + 2 * mt * t * P1.y + t * t * P2.y;

    const dx = 2 * mt * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
    const dy = 2 * mt * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);

    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180) / Math.PI + 90;

    return {
      transform: [
        { translateX: x - 12 },
        { translateY: y - 12 },
        { rotate: `${angleDeg}deg` },
      ],
    };
  });

  return (
    <View style={styles.headerMapContainer}>
      <Svg
        height={HEADER_HEIGHT}
        width={HEADER_WIDTH}
        style={StyleSheet.absoluteFill}
      >
        <Path
          d="M4.39616 105.812L0.488464 86.1625L8.30385 67.2984L19.05 50.7924L31.75 35.8584L43.4731 26.4264L53.2423 18.5664L63.0115 13.8504L68.8731 7.56241L76.6885 3.63241L86.4577 0.488403L94.2731 3.63241L93.2962 13.8504L88.4115 24.8544L83.5269 37.4304L77.6654 50.0064L70.8269 62.5824L61.0577 76.7304L49.3346 89.3064L35.6577 99.5245L4.39616 105.812Z"
          fill="#4DA6FF"
          fillOpacity={0.05}
          stroke="#4DA6FF"
          strokeOpacity={0.2}
          strokeWidth={0.98}
          strokeLinejoin="round"
          transform={`translate(${PADDING_HORIZONTAL}, 50)`}
        />
        <Path
          d="M0.488564 14.6364L27.8424 3.63241L61.0578 0.488403L92.3193 5.20441L113.812 16.2084L123.581 30.3564L119.673 44.5044L104.042 51.5784L83.527 49.2204L61.0578 46.0764L39.5655 42.1464L21.9809 39.0024L6.3501 32.7144L0.488564 14.6364Z"
          fill="#4DA6FF"
          fillOpacity={0.05}
          stroke="#4DA6FF"
          strokeOpacity={0.2}
          strokeWidth={0.98}
          strokeLinejoin="round"
          transform="translate(110, 10)"
        />
        <Path
          d="M4.59154 6.18584L16.3146 0.683838L27.0608 4.61384L29.9915 14.8318L27.0608 27.4079L20.2223 36.0539L12.4069 38.4119L4.59154 32.9099L0.683846 21.9059L1.66077 10.9018L4.59154 6.18584Z"
          fill="#0F2D5C"
          fillOpacity={0.05}
          stroke="#4DA6FF"
          strokeOpacity={0.2}
          strokeWidth={1.37}
          strokeLinejoin="round"
          transform={`translate(${HEADER_WIDTH - PADDING_HORIZONTAL - 65}, 40)`}
        />
      </Svg>

      {/* Flight Route Curve */}
      <Svg
        height={HEADER_HEIGHT}
        width={HEADER_WIDTH}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <LinearGradient
            id="routeGradient"
            x1={P0.x}
            y1="0"
            x2={P2.x}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#0F2D5C" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Background guide line */}
        <Path
          d={PATH_D}
          stroke="#93C5FD"
          strokeWidth="3"
          fill="none"
          opacity={0.25}
          strokeLinecap="round"
        />

        {/* Animated Solid Gradient Filling Line */}
        <AnimatedPath
          d={PATH_D}
          stroke="url(#routeGradient)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={PATH_LENGTH}
          animatedProps={animatedRouteProps}
        />
      </Svg>

      {/* Plane Marker */}
      <Animated.View style={[styles.planeWrapper, planeAnimatedStyle]}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="#1D4ED8"
          />
        </Svg>
      </Animated.View>

      {/* City Pin - Yangon */}
      <View
        style={[styles.markerContainer, { left: P0.x - 35, top: P0.y - 12 }]}
      >
        <View style={styles.pinRing}>
          <View style={styles.pinDot} />
        </View>
        <Text style={styles.cityText}>🇲🇲 Yangon</Text>
      </View>

      {/* City Pin - Seoul */}
      <View
        style={[styles.markerContainer, { left: P2.x - 35, top: P2.y - 12 }]}
      >
        <View style={[styles.pinRing, styles.seoulRing]}>
          <View style={[styles.pinDot, styles.seoulDot]} />
        </View>
        <Text style={styles.cityText}>🇰🇷 Seoul</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerMapContainer: {
    width: HEADER_WIDTH,
    height: HEADER_HEIGHT,
    position: "relative",
  },
  planeWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  markerContainer: { position: "absolute", alignItems: "center", width: 70 },
  pinRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3B82F6",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  pinDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
  seoulRing: { borderColor: "#1E3A8A" },
  seoulDot: { backgroundColor: "#1E3A8A" },
  cityText: { fontSize: 11, fontWeight: "700", color: "#1E293B", marginTop: 4 },
});
