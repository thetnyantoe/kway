import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";

export function useUniversityDetail(id?: string) {
  const [university, setUniversity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      if (!id) return;
      try {
        const docSnap = await getDoc(doc(db, "universities", id));
        if (docSnap.exists()) {
          setUniversity({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching university details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  return { university, loading };
}
