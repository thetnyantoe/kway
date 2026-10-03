import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import AuthHeader from "../../features/auth/components/AuthHeader";
import AuthInput from "../../features/auth/components/AuthInput";
import AuthTabs from "../../features/auth/components/AuthTabs";
import { useForgotPassword } from "../../features/auth/hooks/useForgotPassword";
import {
  isExpoGo,
  useGoogleAuth,
} from "../../features/auth/hooks/useGoogleAuth";
import { useLogin } from "../../features/auth/hooks/useLogin";

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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"en" | "mm">("en");

  const { login, loading, error } = useLogin();
  const { handleGoogleLogin, googleLoading } = useGoogleAuth();
  const { handleForgotPassword, forgotLoading, forgotError } =
    useForgotPassword();

  async function handleSubmit() {
    const success = await login(email, password);

    if (success) {
      router.replace("/(tabs)");
    }
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

            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Sign in to continue your Korea journey
            </Text>

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
              activeTab="signin"
              onChange={(tab) => {
                if (tab === "signup") {
                  router.push("/(auth)/signup");
                }
              }}
            />

            <View style={styles.form}>
              <AuthInput
                label="EMAIL ADDRESS"
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <View style={styles.passwordFieldContainer}>
                <AuthInput
                  label="PASSWORD"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
                <Pressable
                  style={[
                    styles.forgotButton,
                    forgotLoading && styles.disabledButton,
                  ]}
                  onPress={() => handleForgotPassword(email)}
                  disabled={forgotLoading || loading}
                >
                  {forgotLoading ? (
                    <ActivityIndicator size="small" color="#3892F6" />
                  ) : (
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  )}
                </Pressable>
              </View>

              {error || forgotError ? (
                <Text style={styles.errorText}>{error || forgotError}</Text>
              ) : null}

              {/* Gradient Submit Button */}
              <LinearGradient
                colors={GRADIENT_COLORS}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.submitGradientWrapper,
                  (loading || forgotLoading) && styles.disabledButton,
                ]}
              >
                <Pressable
                  style={styles.submitPressable}
                  onPress={handleSubmit}
                  disabled={loading || forgotLoading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitText}>Sign In</Text>
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
                    (googleLoading || forgotLoading) && styles.disabledButton,
                  ]}
                  onPress={handleGoogleLogin}
                  disabled={googleLoading || loading || forgotLoading}
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
  passwordFieldContainer: {
    gap: 8,
  },
  forgotButton: {
    alignSelf: "flex-end",
    paddingVertical: 2,
    minHeight: 20,
  },
  forgotText: {
    color: "#3892F6",
    fontSize: 13,
    fontWeight: "600",
  },
  errorText: {
    color: "#D94848",
    fontSize: 12,
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
});
