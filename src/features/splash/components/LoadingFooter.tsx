import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const TRACK_WIDTH = width - 80;

interface LoadingFooterProps {
  progress: SharedValue<number>;
}

// Single dot driven by phase offset on a shared continuous wave
function AnimatedDot({
  wave,
  phaseOffset,
}: {
  wave: SharedValue<number>;
  phaseOffset: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    // Sine wave calculated between 0 and 1
    const phase = wave.value * 2 * Math.PI - phaseOffset;
    const normalizedSine = (Math.sin(phase) + 1) / 2; // Value ranges from 0 to 1 smoothly

    return {
      opacity: 0.25 + normalizedSine * 0.75, // Shifts between pale (0.25) and dark (1.0)
      transform: [
        { scale: 0.75 + normalizedSine * 0.5 }, // Shifts between small (0.75x) and big (1.25x)
      ],
    };
  });

  return <Animated.View style={[styles.loadingDot, animatedStyle]} />;
}

export function LoadingFooter({ progress }: LoadingFooterProps) {
  const wave = useSharedValue(0);

  useEffect(() => {
    wave.value = withRepeat(
      withTiming(1, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [wave]);

  const progressBarAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.bottomSection}>
      <View style={styles.loadingStatusRow}>
        <View style={styles.loaderDots}>
          {/* Phase offset distributed evenly by 1/3 across dots */}
          <AnimatedDot wave={wave} phaseOffset={0} />
          <AnimatedDot wave={wave} phaseOffset={(2 * Math.PI) / 3} />
          <AnimatedDot wave={wave} phaseOffset={(4 * Math.PI) / 3} />
        </View>
        <Text style={styles.loadingText}>Preparing your Korea journey...</Text>
      </View>

      <View style={styles.progressBarTrack}>
        <Animated.View
          style={[styles.progressBarFill, progressBarAnimatedStyle]}
        >
          <LinearGradient
            colors={["#87C4FF", "#4DA6FF", "#0F2D5C", "#4DA6FF", "#87C4FF"]}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientFill}
          />
        </Animated.View>
      </View>

      <Text style={styles.footerText}>— K-WAY —</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSection: { width: "100%", alignItems: "center", paddingHorizontal: 30 },
  loadingStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  loaderDots: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 12,
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3c93ebff",
  },
  loadingText: { fontSize: 12, color: "#64748B", fontWeight: "500" },
  progressBarTrack: {
    width: TRACK_WIDTH,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
    overflow: "hidden",
  },
  gradientFill: {
    width: TRACK_WIDTH,
    height: "100%",
  },
  footerText: {
    fontSize: 10,
    color: "#CBD5E1",
    letterSpacing: 2,
    fontWeight: "600",
  },
});
