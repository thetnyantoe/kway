import { Eye, EyeOff } from "lucide-react-native";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  keyboardType?: "default" | "email-address";
};

export default function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPassword = false,
  onTogglePassword,
  keyboardType = "default",
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8B9AB3"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {secureTextEntry && onTogglePassword && (
          <Pressable onPress={onTogglePassword} style={styles.eyeButton}>
            {showPassword ? (
              <EyeOff size={20} color="#8B9AB3" />
            ) : (
              <Eye size={20} color="#8B9AB3" />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 9,
  },
  label: {
    color: "#8BA0C0",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  inputWrapper: {
    height: 57,
    borderWidth: 1.3,
    borderColor: "#D6E5FA",
    borderRadius: 22,
    backgroundColor: "#F5F8FE",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    color: "#1D3155",
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
});
