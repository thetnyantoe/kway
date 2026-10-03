import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
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
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4DA6FF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "600" },
});
