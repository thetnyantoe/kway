import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { checkFirebaseAuth } from "@/features/auth/services/auth.service";
import { BrandingSection } from "@/features/splash/components/BrandingSection";
import { HeaderMapRoute } from "@/features/splash/components/HeaderMapRoute";
import { LoadingFooter } from "@/features/splash/components/LoadingFooter";
import { ServiceTagCloud } from "@/features/splash/components/ServiceTagCloud";

const MIN_SPLASH_DURATION = 3200;

export default function SplashScreen() {
  const progress = useSharedValue(0);

  useEffect(() => {
    let isMounted = true;

    async function initializeAndNavigate() {
      const authPromise = checkFirebaseAuth()
        .then((user) => ({ isAuthenticated: !!user }))
        .catch((error) => {
          console.error("Auth check failed:", error);
          return { isAuthenticated: false };
        });

      const animationPromise = new Promise<boolean>((resolve) => {
        progress.value = withTiming(
          1,
          {
            duration: MIN_SPLASH_DURATION,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          },
          (finished) => {
            if (finished) {
              runOnJS(resolve)(true);
            }
          },
        );
      });

      const [authResult] = await Promise.all([authPromise, animationPromise]);

      if (!isMounted) return;

      if (authResult.isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    }

    initializeAndNavigate();

    return () => {
      isMounted = false;
    };
  }, [progress]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <HeaderMapRoute progress={progress} />

      <BrandingSection />

      <ServiceTagCloud />

      <LoadingFooter progress={progress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FE",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
});
