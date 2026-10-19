import { useState } from "react";
import { Alert } from "react-native";
import { resetPassword } from "../../../../services/auth.service";

export function useForgotPassword() {
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");

  async function handleForgotPassword(email: string) {
    setForgotError("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      const msg = "Please enter your email address first.";
      setForgotError(msg);
      Alert.alert("Enter Email", msg);
      return false;
    }

    try {
      setForgotLoading(true);
      await resetPassword(cleanEmail);
      Alert.alert(
        "Check Your Email",
        "A password reset link has been sent to your email address.",
      );
      return true;
    } catch (err: any) {
      console.log("FORGOT PASSWORD ERROR:", err?.code, err?.message);
      let errorMsg = "Could not send the reset email.";

      switch (err?.code) {
        case "auth/invalid-email":
          errorMsg = "Please enter a valid email address.";
          break;
        case "auth/user-not-found":
          errorMsg = "No account found with this email.";
          break;
        case "auth/too-many-requests":
          errorMsg = "Too many attempts. Please try again later.";
          break;
        case "auth/network-request-failed":
          errorMsg = "Network error. Check your connection.";
          break;
      }

      setForgotError(errorMsg);
      Alert.alert("Error", errorMsg);
      return false;
    } finally {
      setForgotLoading(false);
    }
  }

  return {
    handleForgotPassword,
    forgotLoading,
    forgotError,
  };
}
