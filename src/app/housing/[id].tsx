import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowUpDown,
  ChevronLeft,
  MessageCircle,
  Signpost,
} from "lucide-react-native";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AreaIcon } from "../../../components/icons/AreaIcon";
import { BedIcon } from "../../../components/icons/BedIcon";
import { CheckIcon } from "../../../components/icons/CheckIcon";
import { HomeIcon } from "../../../components/icons/HomeIcon";
import { MoneyIcon } from "../../../components/icons/MoneyIcon";
import { getPublicUrl } from "../../../lib/r2";
import { useHousingDetail } from "../../../src/features/housing/hooks/useHousingDetail";

const FACILITY_LABELS: Record<string, string> = {
  airConditioner: "Air Conditioner",
  bed: "Bed",
  desk: "Desk",
  wardrobe: "Wardrobe",
  shoeCabinet: "Shoe Cabinet",
  refrigerator: "Refrigerator",
  washingMachine: "Washing machine",
  kitchenSink: "Kitchen Sink",
  inductionCooktop: "Induction Cooktop",
  microwave: "Microwave",
};

const formatPriceValue = (value?: string | number) => {
  if (value === undefined || value === null || String(value).trim() === "") {
    return "-";
  }
  const stringValue = String(value).trim();

  if (stringValue.includes("-")) {
    const parts = stringValue.split("-");
    const formattedParts = parts.map((part) => {
      const num = Number(part.trim());
      return isNaN(num) ? part.trim() : num.toLocaleString();
    });
    return formattedParts.join(" - ₩");
  }

  const num = Number(stringValue);
  return isNaN(num) ? stringValue : num.toLocaleString();
};

export default function HousingDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { housing, loading } = useHousingDetail(id);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!housing) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Housing details not found.</Text>
      </View>
    );
  }

  // R2 Image URL
  const bannerImage =
    getPublicUrl(housing.imageKey) ||
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80";

  const activeFacilities: string[] = [];
  if (housing.facilities) {
    Object.entries(housing.facilities).forEach(([key, value]) => {
      if (value) {
        activeFacilities.push(FACILITY_LABELS[key] || key);
      }
    });
  }
  if (Array.isArray(housing.customFacilities)) {
    housing.customFacilities.forEach((item) => {
      if (item && !activeFacilities.includes(item)) {
        activeFacilities.push(item);
      }
    });
  }

  const handleOpenMap = () => {
    if (housing.mapUrl) {
      Linking.openURL(housing.mapUrl).catch((err) =>
        console.error("Couldn't load map page", err),
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: bannerImage }} style={styles.bannerImage} />
          <LinearGradient
            colors={["rgba(53, 81, 126, 0.1)", "#17315aff"]}
            style={styles.linearGradient}
          />

          {/* Top Navigation Row */}
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ChevronLeft color="#fff" size={24} />
            </TouchableOpacity>
          </View>

          {/* Banner Info Bottom */}
          <View style={styles.bannerInfo}>
            <View style={styles.pillsRow}>
              <View style={styles.roomTypePill}>
                <Text style={styles.roomTypePillText}>
                  {housing.roomType || "-"}
                </Text>
              </View>

              {housing.isAvailable !== false && (
                <View style={styles.availablePill}>
                  <Text style={styles.availablePillText}>Available Now</Text>
                </View>
              )}
            </View>

            <Text style={styles.addressTitle}>
              {housing.title || "Untitled"}
            </Text>
          </View>
        </View>

        {/* Rent & Deposit Row */}
        <View style={styles.pricingRow}>
          <Text style={styles.priceText}>
            {formatPriceValue(housing.monthlyRent) === "-"
              ? "-"
              : `₩${formatPriceValue(housing.monthlyRent)}`}
            <Text style={styles.perMonthText}>/month</Text>
          </Text>

          <View style={styles.depositBadge}>
            <Text style={styles.depositBadgeText}>
              Deposit -{" "}
              {formatPriceValue(housing.deposit) === "-"
                ? "-"
                : `₩${formatPriceValue(housing.deposit)}`}
            </Text>
          </View>
        </View>

        {/* Body Content */}
        <View style={styles.bodyContainer}>
          {/* Location / Walk Info */}
          <View style={styles.locationInfoRow}>
            <Signpost size={18} color="#64748B" />
            <Text style={styles.locationInfoText}>
              {housing.locationInfo || "no location description"}
            </Text>
          </View>

          <View style={styles.gridContainer}>
            {/* 1. Floor */}
            <View style={styles.gridCard}>
              <HomeIcon />
              <Text style={styles.gridCardValue}>{housing.floor || "-"}</Text>
              <Text style={styles.gridCardLabel}>floor</Text>
            </View>

            {/* 2. Room Size */}
            <View style={styles.gridCard}>
              <AreaIcon size={22} />
              <Text style={styles.gridCardValue}>
                {housing.roomSize ? `${housing.roomSize} m²` : "- m²"}
              </Text>
              <Text style={styles.gridCardLabel}>room size</Text>
            </View>

            {/* 3. Maintenance Fee Card */}
            <View style={styles.gridCard}>
              <BedIcon />
              <Text style={styles.gridCardValue}>
                {formatPriceValue(housing.maintenanceFee) === "-"
                  ? "-"
                  : `₩${formatPriceValue(housing.maintenanceFee)}`}
              </Text>
              <Text style={styles.gridCardLabel}>maintenance fee</Text>
            </View>

            {/* 4. Elevator */}
            <View style={styles.gridCard}>
              <ArrowUpDown size={20} color="#1E293B" strokeWidth={1.5} />
              <Text style={styles.gridCardValue}>
                {housing.elevator || "-"}
              </Text>
              <Text style={styles.gridCardLabel}>elevator</Text>
            </View>

            {/* 5. Rental Type */}
            <View style={styles.gridCard}>
              <MoneyIcon size={22} />
              <Text style={styles.gridCardValue}>
                {housing.rentalType || "-"}
              </Text>
              <Text style={styles.gridCardLabel}>rental type</Text>
            </View>
          </View>

          {/* Facilities Section */}
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilitiesGrid}>
            {activeFacilities.map((facility, index) => (
              <View key={index} style={styles.facilityItem}>
                <CheckIcon />
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </View>

          {/* Notes Bullet Points Section */}
          {Array.isArray(housing.notesList) && housing.notesList.length > 0 && (
            <View style={styles.notesContainer}>
              <View style={styles.notesList}>
                {housing.notesList.map((note, index) => (
                  <View key={index} style={styles.noteItem}>
                    <View style={styles.noteBulletDot} />
                    <Text style={styles.noteText}>{note}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Footer Action Buttons (Ask K-Way & View on Map side-by-side) */}
          <View style={styles.footerActionRow}>
            <TouchableOpacity activeOpacity={0.8} style={styles.askButton}>
              <MessageCircle size={18} color="#0F2D5C" />
              <Text style={styles.askButtonText}>Ask K–Way</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.requestWrapper}
              onPress={handleOpenMap}
            >
              <LinearGradient
                colors={["#1E3A7B", "#3F8CD9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.requestButtonGradient}
              >
                <Text style={styles.requestButtonText}>View on Map</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 16, color: "#EF4444", fontWeight: "600" },

  bannerContainer: {
    height: 270,
    width: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  linearGradient: {
    ...StyleSheet.absoluteFill,
  },
  topRow: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  bannerInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  pillsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  roomTypePill: {
    backgroundColor: "#0F2D5C",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  roomTypePillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  availablePill: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  availablePillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  addressTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 28,
  },

  /* Body Styles */
  bodyContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  /* Pricing Row */
  pricingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1.2,
    borderColor: "#D9E8F8",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "800",

    color: "#0F2D5C",
  },
  perMonthText: {
    fontSize: 15,
    color: "#94A3B8",
    fontWeight: "500",
  },
  depositBadge: {
    backgroundColor: "#FFE57D",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 32,
  },
  depositBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#0F2D5C",
  },

  /* Location info */
  locationInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
    marginBottom: 20,
  },
  locationInfoText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "500",
    flex: 1,
    lineHeight: 18,
  },

  /* Grid Specs Cards */
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 28,
  },
  gridCard: {
    width: "31%",
    backgroundColor: "#F0F6FE",
    borderWidth: 1.2,
    borderColor: "#D9E8F8",
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  gridCardValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F2D5C",
    marginTop: 8,
    marginBottom: 2,
    textAlign: "center",
  },
  gridCardLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
  },

  /* Facilities Section */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F2D5C",
    marginBottom: 16,
  },
  facilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },
  facilityItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  facilityText: {
    fontSize: 13.5,
    color: "#475569",
    fontWeight: "500",
  },

  /* Notes Section */
  notesContainer: {
    marginBottom: 18,
  },
  notesList: {
    gap: 6,
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  noteBulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#94b9f3ff",
    marginTop: 2,
  },
  noteText: {
    fontSize: 13,
    color: "#7687a0ff",
    lineHeight: 18,
    flex: 1,
    fontWeight: "400",
  },

  /* Footer Actions */
  footerActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  askButton: {
    flex: 1,
    flexDirection: "row",
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#0F2D5C",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  askButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F2D5C",
  },
  requestWrapper: {
    flex: 1,
    shadowColor: "#1E3A7B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  requestButtonGradient: {
    height: 52,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  requestButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
