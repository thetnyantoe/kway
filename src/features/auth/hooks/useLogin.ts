import { useState } from "react";
import { loginWithEmail } from "../../../../services/auth.service";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(email: string, password: string) {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return false;
    }

    try {
      setLoading(true);

      await loginWithEmail(email, password);

      return true;
    } catch (err: any) {
      console.log("LOGIN ERROR:", err?.code, err?.message);
      switch (err?.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Try again later.");
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
    login,
    loading,
    error,
  };
}
