import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing, FadeInUp } from "react-native-reanimated";

const CHIP_GROUPS = [
  ["Study Abroad", "Visa Services", "Travel"],
  ["Accommodation", "Medical Tour"],
  ["Settlement"],
];

export function ServiceTagCloud() {
  let chipIndex = 0; // Index counter used to stagger animation delays

  return (
    <View style={styles.chipsContainer}>
      {CHIP_GROUPS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.chipRow}>
          {row.map((item) => {
            const currentDelay = chipIndex * 100; // 100ms stagger between each chip
            chipIndex++;

            return (
              <Animated.View
                key={item}
                entering={FadeInUp.duration(900)
                  .delay(600 + currentDelay)
                  .easing(Easing.out(Easing.cubic))
                  .withInitialValues({
                    transform: [{ translateY: 15 }],
                  })}
              >
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{item}</Text>
                </View>
              </Animated.View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chipsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  chipRow: { flexDirection: "row", gap: 8, justifyContent: "center" },
  chip: {
    backgroundColor: "#E8F2FD",
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D0E3FF",
  },
  chipText: { fontSize: 12, fontWeight: "600", color: "#1E3A8A" },
});
