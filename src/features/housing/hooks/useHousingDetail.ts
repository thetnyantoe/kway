import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";

export interface HousingDetailData {
  id: string;
  title?: string;
  roomType?: string;
  isAvailable?: boolean;
  monthlyRent?: string;
  deposit?: string;
  locationInfo?: string;
  floor?: string;
  roomSize?: string;
  maintenanceFee?: string;
  elevator?: string;
  rentalType?: string;
  imageKey?: string;
  mapUrl?: string;
  facilities?: { [key: string]: boolean };
  customFacilities?: string[];
  notesList?: string[];
  [key: string]: any;
}

export function useHousingDetail(id?: string) {
  const [housing, setHousing] = useState<HousingDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHousingDetail() {
      if (!id) return;
      try {
        const docRef = doc(db, "housing", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHousing({
            id: docSnap.id,
            ...docSnap.data(),
          } as HousingDetailData);
        }
      } catch (error) {
        console.error("Error fetching housing detail:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHousingDetail();
  }, [id]);

  return { housing, loading };
}
