import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function BrandingSection() {
  const animationRef = useRef<LottieView>(null);
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 12000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [rotation]);

  const outerRingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  const logoCardStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-rotation.value}deg` }],
  }));

  return (
    <View style={styles.centerSection}>
      <Animated.View style={[styles.logoOuterRing, outerRingStyle]}>
        <Animated.View style={[styles.logoCard, logoCardStyle]}>
          {/* Circular mask wrapper */}
          <View style={styles.lottieCropContainer}>
            <LottieView
              ref={animationRef}
              source={require("@/assets/videos/logo-motion.json")}
              autoPlay
              loop
              style={styles.lottieLogo}
            />
          </View>
        </Animated.View>
      </Animated.View>

      <Text style={styles.companyTitle}>K-WAY GROUP CO., LTD.</Text>

      {/* Separator Container with FadeInUp and 0.5s delay */}
      <Animated.View
        entering={FadeInUp.duration(900)
          .delay(500)
          .easing(Easing.out(Easing.cubic))
          .withInitialValues({
            transform: [{ translateY: 15 }],
          })}
        style={styles.separatorContainer}
      >
        {/* Left fading line */}
        <LinearGradient
          colors={["transparent", "#93C5FD"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.lineGradient}
        />

        <View style={styles.dotsGroup}>
          <View style={styles.dotSmall} />
          <View style={styles.dotBig} />
          <View style={styles.dotBig} />
          <View style={styles.dotSmall} />
        </View>

        {/* Right fading line */}
        <LinearGradient
          colors={["#93C5FD", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.lineGradient}
        />
      </Animated.View>

      {/* Main Heading with FadeInUp and 0.6s delay */}
      <Animated.View
        entering={FadeInUp.duration(600)
          .delay(600)
          .easing(Easing.out(Easing.cubic))
          .withInitialValues({
            transform: [{ translateY: 15 }],
          })}
      >
        <Text style={styles.mainHeading}>
          Your Korea Journey{"\n"}Starts Here
        </Text>
      </Animated.View>

      {/* Sub Heading with FadeInUp and 0.7s delay */}
      <Animated.View
        entering={FadeInUp.duration(600)
          .delay(700)
          .easing(Easing.out(Easing.cubic))
          .withInitialValues({
            transform: [{ translateY: 15 }],
          })}
      >
        <Text style={styles.subHeading}>Myanmar · Korea · Beyond</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerSection: { alignItems: "center", width: "100%" },
  logoOuterRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: "#C7D9F5",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoCard: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1E40AF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  lottieCropContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  lottieLogo: {
    width: 155,
    height: 155,
    transform: [{ scale: 1.15 }],
  },

  companyTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: 2.5,
    marginBottom: 12,
  },

  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: 16,
  },
  lineGradient: {
    flex: 1,
    height: 1.5,
  },
  dotsGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
  },
  dotSmall: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#93C5FD",
  },
  dotBig: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#93C5FD",
  },

  mainHeading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    lineHeight: 28,
  },
  subHeading: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 8,
    letterSpacing: 0.5,
  },
});
