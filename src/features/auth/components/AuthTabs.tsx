import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  activeTab: "signin" | "signup";
  onChange: (tab: "signin" | "signup") => void;
};

const GRADIENT_COLORS = ["#0F2D5C", "#4DA6FF"] as const;

export default function AuthTabs({ activeTab, onChange }: Props) {
  return (
    <View style={styles.container}>
      {activeTab === "signin" ? (
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.tab, styles.gradientTab]}
        >
          <Pressable
            style={styles.pressable}
            onPress={() => onChange("signin")}
          >
            <Text style={styles.activeText}>Sign In</Text>
          </Pressable>
        </LinearGradient>
      ) : (
        <Pressable style={styles.tab} onPress={() => onChange("signin")}>
          <Text style={styles.inactiveText}>Sign In</Text>
        </Pressable>
      )}

      {activeTab === "signup" ? (
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.tab, styles.gradientTab]}
        >
          <Pressable
            style={styles.pressable}
            onPress={() => onChange("signup")}
          >
            <Text style={styles.activeText}>Sign Up</Text>
          </Pressable>
        </LinearGradient>
      ) : (
        <Pressable style={styles.tab} onPress={() => onChange("signup")}>
          <Text style={styles.inactiveText}>Sign Up</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F2F6FC",
    borderColor: "#E2EDFB",
    borderWidth: 1,
    borderRadius: 24,
    padding: 4,
    marginBottom: 20,
    height: 52,
  },
  tab: {
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientTab: {
    shadowColor: "#2F75C4",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  activeText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  inactiveText: {
    color: "#2C3E5D",
    fontSize: 15,
    fontWeight: "600",
  },
});
