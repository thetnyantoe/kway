import { StyleSheet, Text, View } from "react-native";

export default function StudyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Universities / Study Screen</Text>
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
    backgroundColor: "#0F2D5C",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "600" },
});
