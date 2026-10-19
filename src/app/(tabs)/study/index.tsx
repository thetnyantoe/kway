import { auth, db } from "@/../lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FilterModal,
  FilterOptions,
} from "../../../features/study/components/FilterModal";
import { StudyHeader } from "../../../features/study/components/StudyHeader";
import { UniversityCard } from "../../../features/study/components/UniversityCard";

export default function StudyScreen() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    location: "",
    intake: "",
    major: "",
    feeRange: "",
    hasScholarshipOnly: false,
    isFavoriteOnly: false,
  });

  // Fetch Universities on mount
  useEffect(() => {
    async function fetchUniversities() {
      try {
        const querySnapshot = await getDocs(collection(db, "universities"));
        const list: any[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUniversities(list);
      } catch (error) {
        console.error("Error fetching universities: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUniversities();
  }, []);

  // Fetch / Refresh User's Saved Favorites whenever the filter modal opens
  const handleOpenFilterModal = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setFavoriteIds(userData?.favoriteUniversities || []);
        }
      }
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
    setIsFilterModalOpen(true);
  };

  const { locationsList, intakesList, majorsList } = useMemo(() => {
    const locs = new Set<string>();
    const intakes = new Set<string>();
    const majors = new Set<string>();

    universities.forEach((u) => {
      if (u.locationShort) locs.add(u.locationShort.trim());
      if (u.intake) intakes.add(u.intake.trim());
      if (Array.isArray(u.majors)) {
        u.majors.forEach((m: any) => {
          if (m?.title) majors.add(m.title.trim());
        });
      }
    });

    return {
      locationsList: Array.from(locs).sort(),
      intakesList: Array.from(intakes).sort(),
      majorsList: Array.from(majors).sort(),
    };
  }, [universities]);

  // Real-time Search & Filter matching logic
  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      // 0. Saved / Favorites Only Filter
      if (filters.isFavoriteOnly && !favoriteIds.includes(u.id)) {
        return false;
      }

      // 1. Search Query Match
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const nameMatch = u.name?.toLowerCase().includes(query);
        const locationMatch =
          u.locationShort?.toLowerCase().includes(query) ||
          u.locationDescription?.toLowerCase().includes(query);
        const majorMatch = u.majors?.some((m: any) =>
          m.title?.toLowerCase().includes(query),
        );

        if (!nameMatch && !locationMatch && !majorMatch) return false;
      }

      // 2. Location Filter
      if (filters.location && u.locationShort?.trim() !== filters.location) {
        return false;
      }

      // 3. Application Fee Range Filter
      if (filters.feeRange) {
        const rawFee = Number(u.d2ApplicationFee);
        const isInvalidFee =
          isNaN(rawFee) ||
          u.d2ApplicationFee === undefined ||
          u.d2ApplicationFee === null ||
          u.d2ApplicationFee === "";

        if (isInvalidFee) return false;

        if (filters.feeRange === "under_50k" && rawFee >= 50000) return false;
        if (
          filters.feeRange === "50k_100k" &&
          (rawFee < 50000 || rawFee > 100000)
        )
          return false;
        if (filters.feeRange === "above_100k" && rawFee <= 100000) return false;
      }

      // 4. Major Filter
      if (filters.major) {
        const matchesMajorArray = u.majors?.some(
          (m: any) => m.title?.trim() === filters.major,
        );
        if (!matchesMajorArray) return false;
      }

      // 5. Intake Filter
      if (filters.intake && u.intake?.trim() !== filters.intake) {
        return false;
      }

      // 6. Scholarship Filter
      if (filters.hasScholarshipOnly && !u.scholarship) {
        return false;
      }

      return true;
    });
  }, [universities, favoriteIds, searchQuery, filters]);

  const hasActiveFilters = Boolean(
    filters.location ||
    filters.intake ||
    filters.major ||
    filters.feeRange ||
    filters.hasScholarshipOnly ||
    filters.isFavoriteOnly,
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StudyHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenFilter={handleOpenFilterModal}
        hasActiveFilters={hasActiveFilters}
        totalCount={filteredUniversities.length}
      />

      <FlatList
        data={filteredUniversities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UniversityCard university={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultsCountText}>
            {filteredUniversities.length} universities found
          </Text>
        }
      />

      <FilterModal
        visible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() =>
          setFilters({
            location: "",
            intake: "",
            major: "",
            feeRange: "",
            hasScholarshipOnly: false,
            isFavoriteOnly: false,
          })
        }
        locationsList={locationsList}
        intakesList={intakesList}
        majorsList={majorsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDF2F9",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  resultsCountText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748B",
    marginBottom: 12,
    marginLeft: 4,
  },
});
