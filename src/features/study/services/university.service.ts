import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export interface UniversityDoc {
  id: string;
  name: string;
  about?: string;
  bannerKey?: string;
  locationDescription?: string;
  locationShort?: string;
  d2ApplicationFee?: string;
  d4TuitionFee?: string;
  scholarship?: string;
  scholarshipsList?: string[];
  intake?: string;
  intakesList?: Array<{ term: string; detail: string }>;
  majors?: Array<{ title: string; description: string }>;
  d2TuitionFees?: Array<{ program: string; fee: string }>;
  dormitoriesList?: string[];
  notesList?: string[];
}

export async function fetchUniversities(): Promise<UniversityDoc[]> {
  const uniCollectionRef = collection(db, "universities");
  const q = query(uniCollectionRef);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<UniversityDoc, "id">),
  }));
}
