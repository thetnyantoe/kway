import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../../lib/firebase";

export function useBookmark(universityId?: string) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userId, setUserId] = useState<string | null>(
    auth.currentUser?.uid || null,
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function checkBookmarkStatus() {
      if (!universityId || !userId) return;

      try {
        const userDocRef = doc(db, "users", userId);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const favoriteUnis = userData?.favoriteUniversities || [];
          setIsBookmarked(favoriteUnis.includes(universityId));
        }
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    }

    checkBookmarkStatus();
  }, [universityId, userId]);

  const toggleBookmark = async () => {
    if (!universityId || !userId) {
      console.warn("Cannot toggle bookmark: User is not logged in.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", userId);

      if (isBookmarked) {
        await updateDoc(userDocRef, {
          favoriteUniversities: arrayRemove(universityId),
        });
        setIsBookmarked(false);
      } else {
        await updateDoc(userDocRef, {
          favoriteUniversities: arrayUnion(universityId),
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  return { isBookmarked, toggleBookmark };
}
