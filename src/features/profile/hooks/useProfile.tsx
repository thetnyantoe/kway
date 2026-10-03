import { useRouter } from "expo-router";
import { updateProfile } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { auth, db } from "../../../../lib/firebase";
import { logout } from "../../auth/services/auth.service";

export function useProfile() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [displayName, setDisplayName] = useState(user?.displayName || "User");

  // Sync Auth User & Listen to Firestore updates
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        setDisplayName(currentUser.displayName);
      }
    });

    if (!user?.uid) return unsubscribeAuth;

    // Read Firestore user doc in real-time
    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.name) setDisplayName(data.name);
        setPhone(data.phone || "");
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, [user?.uid]);

  const email = user?.email || "No email available";
  const avatarLetter = displayName.charAt(0).toUpperCase() || "U";

  // Update profile function
  async function updateProfileData({
    name,
    phone: newPhone,
  }: {
    name: string;
    email: string;
    phone: string;
  }) {
    if (!user) return;

    // 1. Update Firebase Auth Profile
    await updateProfile(user, { displayName: name });

    // 2. Update Firestore user document
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
    avatarLetter,
    loading,
    handleLogout,
    updateProfileData,
  };
}
