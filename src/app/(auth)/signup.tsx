import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import AuthHeader from "../../features/auth/components/AuthHeader";
import AuthInput from "../../features/auth/components/AuthInput";
import AuthTabs from "../../features/auth/components/AuthTabs";
import {
  isExpoGo,
  useGoogleAuth,
} from "../../features/auth/hooks/useGoogleAuth";
import { useSignup } from "../../features/auth/hooks/useSignup";

const GRADIENT_COLORS = ["#0F2D5C", "#4DA6FF"] as const;

function GoogleLogo() {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </Svg>
  );
}

function CheckmarkIcon() {
  return (
    <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpCode, setOtpCode] = useState("");
  const [otpStep, setOtpStep] = useState<"idle" | "verify" | "success">("idle");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState<"en" | "mm">("en");

  const {
    initiateSignup,
    resendOtp,
    verifyAndRegister,
    loading,
    error,
    setError,
  } = useSignup();
  const { handleGoogleLogin, googleLoading } = useGoogleAuth();

  async function handleSubmit() {
    const success = await initiateSignup(
      fullName,
      email,
      password,
      confirmPassword,
    );
    if (success) {
      setOtpStep("verify");
    }
  }

  async function handleVerifyOtp() {
    if (!otpCode || otpCode.length < 4) {
      setError("Please enter the 4-digit code.");
      return;
    }
    const success = await verifyAndRegister(otpCode, fullName, email, password);
    if (success) {
      setOtpStep("success");
    }
  }

  function handleContinueToLogin() {
    setOtpStep("idle");
    router.replace("/(auth)/login");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <AuthHeader />

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your Korea journey today</Text>

            {/* Language Switcher */}
            <View style={styles.languageContainer}>
              {language === "mm" ? (
                <LinearGradient
                  colors={GRADIENT_COLORS}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.languageButton, styles.gradientPill]}
                >
                  <Pressable
                    style={styles.fullSizePress}
                    onPress={() => setLanguage("mm")}
                  >
                    <Text style={styles.selectedLanguageText}>မြန်မာ</Text>
                  </Pressable>
                </LinearGradient>
              ) : (
                <Pressable
                  style={styles.languageButton}
                  onPress={() => setLanguage("mm")}
                >
                  <Text style={styles.languageText}>မြန်မာ</Text>
                </Pressable>
              )}

              {language === "en" ? (
                <LinearGradient
                  colors={GRADIENT_COLORS}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.languageButton, styles.gradientPill]}
                >
                  <Pressable
                    style={styles.fullSizePress}
                    onPress={() => setLanguage("en")}
                  >
                    <Text style={styles.selectedLanguageText}>English</Text>
                  </Pressable>
                </LinearGradient>
              ) : (
                <Pressable
                  style={styles.languageButton}
                  onPress={() => setLanguage("en")}
                >
                  <Text style={styles.languageText}>English</Text>
                </Pressable>
              )}
            </View>

            {/* Sign In / Sign Up Segmented Tabs */}
            <AuthTabs
              activeTab="signup"
              onChange={(tab) => {
                if (tab === "signin") {
                  router.push("/(auth)/login");
                }
              }}
            />

            <View style={styles.form}>
              <AuthInput
                label="FULL NAME"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />

              <AuthInput
                label="EMAIL OR PHONE"
                placeholder="Email/Phone"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <AuthInput
                label="PASSWORD"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <AuthInput
                label="CONFIRM PASSWORD"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                showPassword={showConfirmPassword}
                onTogglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />

              {error && otpStep === "idle" ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}

              {/* Gradient Submit Button */}
              <LinearGradient
                colors={GRADIENT_COLORS}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.submitGradientWrapper,
                  loading && styles.disabledButton,
                ]}
              >
                <Pressable
                  style={styles.submitPressable}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitText}>Create Account</Text>
                  )}
                </Pressable>
              </LinearGradient>
            </View>

            {!isExpoGo && (
              <>
                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>Or continue with</Text>
                  <View style={styles.divider} />
                </View>

                <Pressable
                  style={[
                    styles.googleButton,
                    googleLoading && styles.disabledButton,
                  ]}
                  onPress={handleGoogleLogin}
                  disabled={googleLoading || loading}
                >
                  {googleLoading ? (
                    <ActivityIndicator color="#0F203C" />
                  ) : (
                    <>
                      <GoogleLogo />
                      <Text style={styles.googleText}>
                        Continue with Google
                      </Text>
                    </>
                  )}
                </Pressable>
              </>
            )}

            <Text style={styles.terms}>
              By continuing, you agree to our{" "}
              <Text style={styles.link}>Terms of Service</Text> &{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* OTP Modal Verification Dialog (Matching Figma UI) */}
      <Modal
        visible={otpStep !== "idle"}
        transparent
        animationType="fade"
        onRequestClose={() => setOtpStep("idle")}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <AuthHeader />

            {otpStep === "verify" ? (
              <>
                <Text style={styles.modalTitle}>Enter Verification Code</Text>
                <Text style={styles.modalSub}>
                  We sent a 4-digit code to your email or phone
                </Text>

                <TextInput
                  style={styles.otpInput}
                  placeholder="XXXX"
                  placeholderTextColor="#B0C2DE"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={otpCode}
                  onChangeText={setOtpCode}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <LinearGradient
                  colors={GRADIENT_COLORS}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.submitGradientWrapper,
                    { width: "100%", marginTop: 14 },
                  ]}
                >
                  <Pressable
                    style={styles.submitPressable}
                    onPress={handleVerifyOtp}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text style={styles.submitText}>Verify Code</Text>
                    )}
                  </Pressable>
                </LinearGradient>

                <View style={styles.resendRow}>
                  <Text style={styles.resendLabel}>
                    Didn't receive a code?{" "}
                  </Text>
                  <Pressable onPress={() => resendOtp(email)}>
                    <Text style={styles.resendLink}>Resend</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                {/* Success Screen Matching Figma right frame */}
                <View style={styles.successCircle}>
                  <CheckmarkIcon />
                </View>

                <Text style={styles.modalTitle}>Account Created</Text>
                <Text style={styles.modalSub}>
                  Welcome to K-Way. Your account is ready.
                </Text>

                <LinearGradient
                  colors={GRADIENT_COLORS}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.submitGradientWrapper,
                    { width: "100%", marginTop: 24 },
                  ]}
                >
                  <Pressable
                    style={styles.submitPressable}
                    onPress={handleContinueToLogin}
                  >
                    <Text style={styles.submitText}>Continue to Login</Text>
                  </Pressable>
                </LinearGradient>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboard: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  content: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F203C",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#788CA8",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 20,
    fontWeight: "500",
  },

  /* Language Switcher */
  languageContainer: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#F2F6FC",
    borderColor: "#E2EDFB",
    borderWidth: 1,
    borderRadius: 22,
    padding: 3,
    marginBottom: 16,
    width: 210,
    height: 44,
  },
  languageButton: {
    flex: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  fullSizePress: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientPill: {
    shadowColor: "#2F75C4",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  languageText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2C3E5D",
  },
  selectedLanguageText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* Form */
  form: {
    gap: 14,
  },
  errorText: {
    color: "#D94848",
    fontSize: 12,
    textAlign: "center",
  },
  submitGradientWrapper: {
    height: 52,
    borderRadius: 20,
    marginTop: 6,
    shadowColor: "#2F75C4",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  submitPressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* Divider */
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2EDFB",
  },
  dividerText: {
    color: "#8FA3C0",
    fontSize: 12,
    fontWeight: "500",
  },

  /* Google Button */
  googleButton: {
    height: 52,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2EDFB",
    backgroundColor: "#F7FAFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  googleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E2F4D",
  },

  /* Footer Terms */
  terms: {
    color: "#8FA3C0",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 20,
  },
  link: {
    color: "#4A9DF8",
    fontWeight: "600",
  },

  /* Modal Styling matching Figma Card */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 32, 60, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E2F4D",
    marginTop: 12,
    textAlign: "center",
  },
  modalSub: {
    fontSize: 12,
    color: "#788CA8",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  otpInput: {
    width: "100%",
    height: 54,
    backgroundColor: "#EBEFF5",
    borderRadius: 16,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 8,
    color: "#1E2F4D",
    marginBottom: 8,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  resendLabel: {
    fontSize: 12,
    color: "#788CA8",
  },
  resendLink: {
    fontSize: 12,
    color: "#4A9DF8",
    fontWeight: "700",
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#34C759",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 8,
  },
});
