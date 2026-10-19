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

export interface HousingFilterOptions {
  roomTypes: string[];
  rentalTypes: string[];
}

interface HousingFilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: HousingFilterOptions;
  onApplyFilters: (newFilters: HousingFilterOptions) => void;
  onResetFilters: () => void;
  roomTypesList: string[];
  rentalTypesList: string[];
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const DISMISS_THRESHOLD = 120;

export function HousingFilterModal({
  visible,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  roomTypesList,
  rentalTypesList,
}: HousingFilterModalProps) {
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>(
    filters.roomTypes,
  );
  const [selectedRentalTypes, setSelectedRentalTypes] = useState<string[]>(
    filters.rentalTypes,
  );

  const translateY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = 0;
      setSelectedRoomTypes(filters.roomTypes);
      setSelectedRentalTypes(filters.rentalTypes);
    }
  }, [visible, filters]);

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

  const toggleRoomType = (type: string) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleRentalType = (type: string) => {
    setSelectedRentalTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleApply = () => {
    onApplyFilters({
      roomTypes: selectedRoomTypes,
      rentalTypes: selectedRentalTypes,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedRoomTypes([]);
    setSelectedRentalTypes([]);
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
          <GestureDetector gesture={panGesture}>
            <View style={styles.dragHandleArea}>
              <View style={styles.dragIndicator} />
              <View style={styles.headerRow}>
                <Text style={styles.sheetTitle}>Filter Housing</Text>
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
            {/* Room Types Multi-Select */}
            <Text style={styles.sectionTitle}>Room Types (Multi-select)</Text>
            <View style={styles.chipRow}>
              {roomTypesList.map((type) => {
                const isSelected = selectedRoomTypes.includes(type);
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => toggleRoomType(type)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Rental Types Multi-Select */}
            <Text style={styles.sectionTitle}>Rental Types (Multi-select)</Text>
            <View style={styles.chipRow}>
              {rentalTypesList.map((type) => {
                const isSelected = selectedRentalTypes.includes(type);
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => toggleRentalType(type)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

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
