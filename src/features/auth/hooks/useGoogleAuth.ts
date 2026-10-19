import Constants, { ExecutionEnvironment } from "expo-constants";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { handleGoogleFirebaseLogin } from "../../../../services/auth.service";

const WEB_CLIENT_ID =
  "954020489874-mi1i2u7196snbh8lis8sc1leb99mg9c1.apps.googleusercontent.com";

export const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

type GoogleModule = typeof import("@react-native-google-signin/google-signin");

let Google: GoogleModule | null = null;
if (!isExpoGo) {
  Google = require("@react-native-google-signin/google-signin");
  Google!.GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });
}

export function useGoogleAuth() {
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogleLogin() {
    if (!Google) {
      Alert.alert(
        "Not available in Expo Go",
        "Google login only works in the development build. Please use email login here.",
      );
      return;
    }

    const { GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes } =
      Google;

    try {
      setGoogleLoading(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const res = await GoogleSignin.signIn();
      if (!isSuccessResponse(res)) return;

      const idToken = res.data.idToken;
      if (!idToken) throw new Error("No ID token returned from Google.");

      await handleGoogleFirebaseLogin(idToken);
      router.replace("/(tabs)");
    } catch (error: any) {
      if (
        isErrorWithCode(error) &&
        error.code === statusCodes.SIGN_IN_CANCELLED
      ) {
        return;
      }
      console.error("Google sign-in error:", error);
      Alert.alert(
        "Google Sign-In Error",
        error?.message || "Failed to sign in with Google.",
      );
    } finally {
      setGoogleLoading(false);
    }
  }

  return { handleGoogleLogin, googleLoading };
}
