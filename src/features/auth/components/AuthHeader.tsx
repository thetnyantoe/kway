import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const logo = require("@/assets/images/logo.jpg");

const LOGO_SIZE = 54;

export default function AuthHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
        contentFit="cover"
        transition={0}
        accessibilityLabel="K-Way logo"
      />

      <View>
        <Text style={styles.brand}>K-Way</Text>
        <Text style={styles.company}>K-Way Group Co., Ltd.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 34,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    borderWidth: 1,
    borderColor: "#D7E7FB",
    backgroundColor: "#FAFCFF",
  },
  brand: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1D3155",
  },
  company: {
    fontSize: 13,
    color: "#8B9AB3",
    marginTop: 2,
  },
});
