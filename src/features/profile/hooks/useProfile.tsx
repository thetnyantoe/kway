import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { updateProfile } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { auth, db } from "../../../../lib/firebase";
import { getPublicUrl } from "../../../../lib/r2";
import { logout } from "../../../../services/auth.service";
import { deleteFromR2, uploadToR2 } from "../../../../services/stroage.service";

export function useProfile() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [displayName, setDisplayName] = useState(user?.displayName || "User");

  const [avatarKey, setAvatarKey] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        setDisplayName(currentUser.displayName);
      }
    });

    if (!user?.uid) return unsubscribeAuth;

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.name) setDisplayName(data.name);
        setPhone(data.phone || "");

        // Sync avatar key & compute display URL
        const currentAvatarKey = data.avatar || null;
        setAvatarKey(currentAvatarKey);
        setAvatarUrl(getPublicUrl(currentAvatarKey));
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, [user?.uid]);

  const email = user?.email || "No email available";
  const avatarLetter = displayName.charAt(0).toUpperCase() || "U";

  const pickAndUploadAvatar = async () => {
    if (!user?.uid) return;

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Camera roll access is needed to upload profile photos.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]?.uri) return;

    try {
      setLoading(true);
      const selectedUri = result.assets[0].uri;
      const newKey = `avatars/${user.uid}_${Date.now()}.jpg`;

      await uploadToR2(selectedUri, newKey, "image/jpeg");

      if (avatarKey) {
        await deleteFromR2(avatarKey);
      }

      await setDoc(
        doc(db, "users", user.uid),
        { avatar: newKey },
        { merge: true },
      );

      Alert.alert("Success", "Profile photo updated!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to upload avatar photo.");
    } finally {
      setLoading(false);
    }
  };

  async function updateProfileData({
    name,
    phone: newPhone,
  }: {
    name: string;
    email: string;
    phone: string;
  }) {
    if (!user) return;

    await updateProfile(user, { displayName: name });
    await setDoc(
      doc(db, "users", user.uid),
      {
        name,
        phone: newPhone || "",
      },
      { merge: true },
    );

    setDisplayName(name);
    setPhone(newPhone);
  }

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await logout();
            router.replace("/(auth)/login");
          } catch (error) {
            Alert.alert("Error", "Failed to log out. Please try again.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return {
    user,
    displayName,
    email,
    phone,
    avatarUrl,
    avatarLetter,
    loading,
    pickAndUploadAvatar,
    handleLogout,
    updateProfileData,
  };
}
