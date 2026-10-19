import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Home } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {/* Button to navigate to Housing Screen */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push("/housing")}
      >
        <LinearGradient
          colors={["#1E3A7B", "#3F8CD9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Home size={18} color="#FFFFFF" />
          <Text style={styles.buttonText}>Explore Housing</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F2D5C",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: "#1E3A7B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
