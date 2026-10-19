import { useState } from "react";
import {
  registerWithEmail,
  sendOtpEmail,
} from "../../../../services/auth.service";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

  function generate4DigitOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async function initiateSignup(
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    setError("");

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    try {
      setLoading(true);
      const code = generate4DigitOTP();
      setGeneratedOtp(code);
      await sendOtpEmail(email, code);
      return true;
    } catch (err: any) {
      setError("Failed to send OTP code. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Resend OTP
  async function resendOtp(email: string) {
    setError("");
    try {
      setLoading(true);
      const code = generate4DigitOTP();
      setGeneratedOtp(code);
      await sendOtpEmail(email, code);
    } catch (err: any) {
      setError("Failed to resend code.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyAndRegister(
    enteredOtp: string,
    fullName: string,
    email: string,
    password: string,
  ) {
    setError("");

    if (enteredOtp !== generatedOtp) {
      setError("Invalid verification code. Please try again.");
      return false;
    }

    try {
      setLoading(true);
      await registerWithEmail(email, password, fullName);
      return true;
    } catch (err: any) {
      console.log("SIGNUP ERROR:", err?.code, err?.message);
      switch (err?.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          setError("Please choose a stronger password.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Check your connection.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    initiateSignup,
    resendOtp,
    verifyAndRegister,
    loading,
    error,
    setError,
  };
}
