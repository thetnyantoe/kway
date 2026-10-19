import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export interface FilterOptions {
  location: string;
  intake: string;
  major: string;
  feeRange: string;
  hasScholarshipOnly: boolean;
  isFavoriteOnly: boolean;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (newFilters: FilterOptions) => void;
  onResetFilters: () => void;
  locationsList: string[];
  intakesList: string[];
  majorsList: string[];
}

export const FEE_RANGES = [
  { label: "All Fees", value: "" },
  { label: "< ₩50k", value: "under_50k" },
  { label: "₩50k - ₩100k", value: "50k_100k" },
  { label: "> ₩100k", value: "above_100k" },
];

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const DISMISS_THRESHOLD = 120;

export function FilterModal({
  visible,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  locationsList,
  intakesList,
  majorsList,
}: FilterModalProps) {
  const [selectedLocation, setSelectedLocation] = useState(filters.location);
  const [selectedIntake, setSelectedIntake] = useState(filters.intake);
  const [selectedMajor, setSelectedMajor] = useState(filters.major);
  const [selectedFeeRange, setSelectedFeeRange] = useState(filters.feeRange);
  const [scholarshipOnly, setScholarshipOnly] = useState(
    filters.hasScholarshipOnly,
  );
  const [favoriteOnly, setFavoriteOnly] = useState(filters.isFavoriteOnly);

  const translateY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = 0;
      setSelectedLocation(filters.location);
      setSelectedIntake(filters.intake);
      setSelectedMajor(filters.major);
      setSelectedFeeRange(filters.feeRange);
      setScholarshipOnly(filters.hasScholarshipOnly);
      setFavoriteOnly(filters.isFavoriteOnly);
    }
  }, [visible, filters]);

  // Drag Gesture Definition
  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > DISMISS_THRESHOLD || event.velocityY > 500) {
        translateY.value = withTiming(SCREEN_HEIGHT, {}, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(0, { damping: 20 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleApply = () => {
    onApplyFilters({
      location: selectedLocation,
      intake: selectedIntake,
      major: selectedMajor,
      feeRange: selectedFeeRange,
      hasScholarshipOnly: scholarshipOnly,
      isFavoriteOnly: favoriteOnly,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedLocation("");
    setSelectedIntake("");
    setSelectedMajor("");
    setSelectedFeeRange("");
    setScholarshipOnly(false);
    setFavoriteOnly(false);
    onResetFilters();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View style={[styles.sheetContainer, animatedStyle]}>
          {/* Draggable Header handle area */}
          <GestureDetector gesture={panGesture}>
            <View style={styles.dragHandleArea}>
              <View style={styles.dragIndicator} />
              <View style={styles.headerRow}>
                <Text style={styles.sheetTitle}>Filter Universities</Text>
                <TouchableOpacity onPress={handleReset}>
                  <Text style={styles.resetText}>Reset All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </GestureDetector>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollBody}
          >
            <View style={styles.chipRow}>
              <TouchableOpacity
                style={[styles.chip, favoriteOnly && styles.chipSelected]}
                onPress={() => setFavoriteOnly(!favoriteOnly)}
              >
                <Text
                  style={[
                    styles.chipText,
                    favoriteOnly && styles.chipTextSelected,
                  ]}
                >
                  Favorites
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.chip, scholarshipOnly && styles.chipSelected]}
                onPress={() => setScholarshipOnly(!scholarshipOnly)}
              >
                <Text
                  style={[
                    styles.chipText,
                    scholarshipOnly && styles.chipTextSelected,
                  ]}
                >
                  Has Scholarship
                </Text>
              </TouchableOpacity>
            </View>

            {/* 1. Location Filter */}
            <Text style={styles.sectionTitle}>Location (City)</Text>
            <View style={styles.chipRow}>
              <TouchableOpacity
                style={[
                  styles.chip,
                  selectedLocation === "" && styles.chipSelected,
                ]}
                onPress={() => setSelectedLocation("")}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedLocation === "" && styles.chipTextSelected,
                  ]}
                >
                  All Locations
                </Text>
              </TouchableOpacity>
              {locationsList.map((loc) => (
                <TouchableOpacity
                  key={loc}
                  style={[
                    styles.chip,
                    selectedLocation === loc && styles.chipSelected,
                  ]}
                  onPress={() =>
                    setSelectedLocation(loc === selectedLocation ? "" : loc)
                  }
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedLocation === loc && styles.chipTextSelected,
                    ]}
                  >
                    {loc}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 2. Fee Range Filter */}
            <Text style={styles.sectionTitle}>Application Fee Range</Text>
            <View style={styles.chipRow}>
              {FEE_RANGES.map((range) => (
                <TouchableOpacity
                  key={range.value}
                  style={[
                    styles.chip,
                    selectedFeeRange === range.value && styles.chipSelected,
                  ]}
                  onPress={() =>
                    setSelectedFeeRange(
                      selectedFeeRange === range.value ? "" : range.value,
                    )
                  }
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedFeeRange === range.value &&
                        styles.chipTextSelected,
                    ]}
                  >
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 3. Majors Filter */}
            <Text style={styles.sectionTitle}>Major / Program</Text>
            <View style={styles.chipRow}>
              <TouchableOpacity
                style={[
                  styles.chip,
                  selectedMajor === "" && styles.chipSelected,
                ]}
                onPress={() => setSelectedMajor("")}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedMajor === "" && styles.chipTextSelected,
                  ]}
                >
                  All Majors
                </Text>
              </TouchableOpacity>
              {majorsList.map((major) => (
                <TouchableOpacity
                  key={major}
                  style={[
                    styles.chip,
                    selectedMajor === major && styles.chipSelected,
                  ]}
                  onPress={() =>
                    setSelectedMajor(major === selectedMajor ? "" : major)
                  }
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedMajor === major && styles.chipTextSelected,
                    ]}
                  >
                    {major}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 4. Intake Filter */}
            <Text style={styles.sectionTitle}>Intake Term</Text>
            <View style={styles.chipRow}>
              <TouchableOpacity
                style={[
                  styles.chip,
                  selectedIntake === "" && styles.chipSelected,
                ]}
                onPress={() => setSelectedIntake("")}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedIntake === "" && styles.chipTextSelected,
                  ]}
                >
                  Any Intake
                </Text>
              </TouchableOpacity>
              {intakesList.map((intake) => (
                <TouchableOpacity
                  key={intake}
                  style={[
                    styles.chip,
                    selectedIntake === intake && styles.chipSelected,
                  ]}
                  onPress={() =>
                    setSelectedIntake(intake === selectedIntake ? "" : intake)
                  }
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedIntake === intake && styles.chipTextSelected,
                    ]}
                  >
                    {intake}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Action Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 34,
    maxHeight: "80%",
  },
  dragHandleArea: {
    width: "100%",
    paddingBottom: 8,
  },
  dragIndicator: {
    width: 36,
    height: 5,
    backgroundColor: "#CBD5E1",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F2D5C",
  },
  resetText: {
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "600",
  },
  scrollBody: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    marginTop: 14,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  chipSelected: {
    backgroundColor: "#0F2D5C",
    borderColor: "#0F2D5C",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
  chipTextSelected: {
    color: "#FFFFFF",
  },
  applyButton: {
    backgroundColor: "#0F2D5C",
    borderRadius: 16,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
