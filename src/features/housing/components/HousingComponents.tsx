import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AreaIcon } from "../../../../components/icons/AreaIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { SearchIcon } from "../../../../components/icons/SearchIcon";
import { getPublicUrl } from "../../../../lib/r2";

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

// --- HOUSING HEADER ---
interface HousingHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onOpenFilter?: () => void;
}

export function HousingHeader({
  searchQuery,
  onSearchChange,
  onOpenFilter,
}: HousingHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.headerWrapper}>
      <LinearGradient
        colors={["#0F2D5C", "#3F8CD9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Housing in Korea</Text>
            <Text style={styles.headerSubTitle}>
              Find your home away from home
            </Text>
          </View>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <SearchIcon color={"#8C9DB5"} />
            <TextInput
              placeholder="Search by housing title"
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={onSearchChange}
            />
          </View>

          <TouchableOpacity activeOpacity={0.85} onPress={onOpenFilter}>
            <LinearGradient
              colors={["#3f8cd9ff", "#1E3A7B"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.filterButtonGradient}
            >
              <FilterIcon color={"#fff"} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

// --- DYNAMIC HOUSING CARD ---
interface HousingCardProps {
  item: {
    id: string;
    title?: string;
    roomType?: string;
    roomSize?: string;
    monthlyRent?: string;
    deposit?: string;
    imageKey?: string;
    locationInfo?: string;
    [key: string]: any;
  };
  onPressDetails?: () => void;
}

export function HousingCard({ item, onPressDetails }: HousingCardProps) {
  const imageUrl =
    getPublicUrl(item.imageKey) ||
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80";

  const roomType = item.roomType || "One Room";
  const title = item.title || item.locationInfo || "Seoul, South Korea";
  const dimensions = item.roomSize
    ? `${item.roomSize}m x ${item.roomSize}m`
    : "15m²";

  const rentVal = formatPriceValue(item.monthlyRent);
  const depositVal = formatPriceValue(item.deposit);

  const rent = rentVal === "-" ? "-" : `₩${rentVal}`;
  const deposit = depositVal === "-" ? "-" : `₩${depositVal}`;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>{roomType}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.locationTitle} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.sizeRow}>
          <AreaIcon />
          <Text style={styles.sizeText}>{dimensions}</Text>
        </View>

        <View style={styles.priceActionRow}>
          <View style={styles.priceGroup}>
            <Text style={styles.priceText}>
              {rent}
              <Text style={styles.perMonthText}>/month</Text>
            </Text>
            <Text style={styles.depositText}>Deposit - {deposit}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} onPress={onPressDetails}>
            <LinearGradient
              colors={["#1E3A7B", "#3F8CD9"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.detailsButton}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#F8FAFC",
  },
  headerGradient: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    marginTop: -2,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerSubTitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#0F172A",
    marginLeft: 6,
  },
  filterButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    borderColor: "#E2EDFB",
    borderWidth: 1.2,
    shadowColor: "#0F2D5C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  imageWrapper: {
    height: 180,
    width: "100%",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  typeBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#0F2D5C",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  typeBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  cardBody: {
    padding: 16,
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F2D5C",
    marginBottom: 6,
  },
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 8,
  },
  sizeText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  priceActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  priceGroup: {
    flex: 1,
  },
  priceText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F2D5C",
  },
  perMonthText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
  },
  depositText: {
    fontSize: 11,
    color: "#0F2D5C",
    marginTop: 2,
  },
  detailsButton: {
    paddingHorizontal: 26,
    height: 36,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
