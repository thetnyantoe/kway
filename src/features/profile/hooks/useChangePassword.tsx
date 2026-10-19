import { useState } from "react";
import { Alert } from "react-native";
import { changeUserPassword } from "../../../../services/auth.service";

export function useChangePassword() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  const openModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const closeModal = () => {
    resetForm();
    setModalVisible(false);
  };

  const handleChangePassword = async (): Promise<boolean> => {
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return false;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return false;
    }

    try {
      setLoading(true);
      await changeUserPassword(currentPassword, newPassword);

      resetForm();
      Alert.alert("Success", "Your password has been changed successfully.");
      return true; // Success
    } catch (err: any) {
      switch (err?.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
          setError("Current password is incorrect.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;
        default:
          setError("Failed to update password. Please try again.");
      }
      return false; // Failed
    } finally {
      setLoading(false);
    }
  };

  return {
    modalVisible,
    openModal,
    closeModal,
    resetForm,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    handleChangePassword,
  };
}
