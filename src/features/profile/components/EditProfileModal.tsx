import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  initialData: {
    name: string;
    email: string;
    phone: string;
  };
  onSave: (data: {
    name: string;
    email: string;
    phone: string;
  }) => Promise<void>;
}

export function EditProfileModal({
  visible,
  onClose,
  initialData,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [phone, setPhone] = useState(initialData.phone || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone || "");
    }
  }, [visible, initialData]);

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert("Error", "Name field cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      await onSave({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      onClose();
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Edit Profile</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={email}
              onChangeText={setEmail}
              editable={false}
              keyboardType="email-address"
              placeholder="Email address"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PHONE NUMBER</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Add phone number"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <LinearGradient
              colors={["#0F2D5C", "#4DA6FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveGradientWrapper}
            >
              <Pressable
                style={styles.savePressable}
                onPress={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.saveText}>Save</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F2D5C",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#0F172A",
  },
  disabledInput: {
    backgroundColor: "#F1F5F9",
    color: "#94A3B8",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  saveGradientWrapper: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    overflow: "hidden",
  },
  savePressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
