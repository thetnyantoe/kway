import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useChangePassword } from "../hooks/useChangePassword";

const GRADIENT_COLORS = ["#0F2D5C", "#4DA6FF"] as const;

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({
  visible,
  onClose,
}: ChangePasswordModalProps) {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    handleChangePassword,
    resetForm,
  } = useChangePassword();

  // Visibility states for each password field
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reset inputs and visibility toggles when user cancels or closes modal
  const handleClose = () => {
    resetForm();
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const handleSave = async () => {
    const success = await handleChangePassword();
    if (success) {
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Change Password</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Current Password Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowCurrentPassword((prev) => !prev)}
            >
              {showCurrentPassword ? (
                <EyeOff color="#64748B" size={20} />
              ) : (
                <Eye color="#64748B" size={20} />
              )}
            </TouchableOpacity>
          </View>

          {/* New Password Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? (
                <EyeOff color="#64748B" size={20} />
              ) : (
                <Eye color="#64748B" size={20} />
              )}
            </TouchableOpacity>
          </View>

          {/* Confirm New Password Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <EyeOff color="#64748B" size={20} />
              ) : (
                <Eye color="#64748B" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleClose}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Gradient Save Button styled like Sign In button */}
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
                onPress={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitText}>Save</Text>
                )}
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F2D5C",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingLeft: 14,
    paddingRight: 44,
    paddingVertical: 12,
    fontSize: 14,
    color: "#0F2D5C",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    padding: 4,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginBottom: 12,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#F1F5F9",
  },
  cancelButtonText: {
    color: "#64748B",
    fontWeight: "600",
    fontSize: 15,
  },

  /* Gradient Save Button (matching Sign In button) */
  submitGradientWrapper: {
    flex: 1,
    height: 48,
    borderRadius: 16,
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
    fontSize: 15,
    fontWeight: "700",
  },
});
