import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { db } from "../../../lib/firebase";
import {
  HousingCard,
  HousingHeader,
} from "../../../src/features/housing/components/HousingComponents";
import {
  HousingFilterModal,
  HousingFilterOptions,
} from "../../../src/features/housing/components/HousingFilterModal";

export default function HousingScreen() {
  const router = useRouter();
  const [housings, setHousings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [filters, setFilters] = useState<HousingFilterOptions>({
    roomTypes: [],
    rentalTypes: [],
  });

  useEffect(() => {
    async function fetchHousings() {
      try {
        const querySnapshot = await getDocs(collection(db, "housing"));
        const list: any[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setHousings(list);
      } catch (error) {
        console.error("Error fetching housing: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHousings();
  }, []);

  const { roomTypesList, rentalTypesList } = useMemo(() => {
    const rooms = new Set<string>();
    const rentals = new Set<string>();

    housings.forEach((item) => {
      if (item.roomType) rooms.add(item.roomType.trim());
      if (item.rentalType) rentals.add(item.rentalType.trim());
    });

    return {
      roomTypesList: Array.from(rooms).sort(),
      rentalTypesList: Array.from(rentals).sort(),
    };
  }, [housings]);

  const filteredHousing = useMemo(() => {
    return housings.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const titleMatch = item.title?.toLowerCase().includes(query);
        if (!titleMatch) return false;
      }

      if (
        filters.roomTypes.length > 0 &&
        (!item.roomType || !filters.roomTypes.includes(item.roomType))
      ) {
        return false;
      }

      if (
        filters.rentalTypes.length > 0 &&
        (!item.rentalType || !filters.rentalTypes.includes(item.rentalType))
      ) {
        return false;
      }

      return true;
    });
  }, [housings, searchQuery, filters]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HousingHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenFilter={() => setIsFilterModalOpen(true)}
      />

      <FlatList
        data={filteredHousing}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HousingCard
            item={item}
            onPressDetails={() => router.push(`/housing/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <HousingFilterModal
        visible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() =>
          setFilters({
            roomTypes: [],
            rentalTypes: [],
          })
        }
        roomTypesList={roomTypesList}
        rentalTypesList={rentalTypesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
});
