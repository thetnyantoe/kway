import emailjs from "@emailjs/react-native";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../lib/firebase";

// Sign in with Email
export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

// Create account & save to Firestore
export async function registerWithEmail(
  email: string,
  password: string,
  fullName: string,
) {
  const cleanEmail = email.trim();
  const cleanName = fullName.trim();

  const credential = await createUserWithEmailAndPassword(
    auth,
    cleanEmail,
    password,
  );
  const user = credential.user;

  await updateProfile(user, { displayName: cleanName });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: cleanName,
    email: cleanEmail,
    role: "user",
    createdAt: new Date().toISOString(),
  });

  return credential;
}

// Complete Google authentication in Firebase after getting token from expo-auth-session
export async function handleGoogleFirebaseLogin(idToken: string) {
  const googleCredential = GoogleAuthProvider.credential(idToken);
  const userCredential = await signInWithCredential(auth, googleCredential);
  const user = userCredential.user;

  // Check if user already exists in Firestore
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  // If first-time Google sign-in, save user profile to Firestore
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "Google User",
      email: user.email || "",
      role: "user",
      createdAt: new Date().toISOString(),
    });
  }

  return userCredential;
}

export async function sendOtpEmail(email: string, otp: string) {
  try {
    const formattedTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const response = await emailjs.send(
      "service_n7zvc9s",
      "template_z488qhw",
      {
        email: email,
        passcode: otp,
        time: formattedTime,
      },
      {
        publicKey: "zp-7Doj7r0p1jV3eg",
      },
    );

    return response;
  } catch (error) {
    console.error("EmailJS Send Error:", error);
    throw error;
  }
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email.trim());
}

export async function logout() {
  return signOut(auth);
}

export async function changeUserPassword(
  currentPassword: string,
  newPassword: string,
) {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("User not authenticated.");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
}

export function checkFirebaseAuth(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}
