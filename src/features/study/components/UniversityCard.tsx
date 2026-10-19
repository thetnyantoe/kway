import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getPublicUrl } from "../../../../lib/r2";

interface UniversityCardProps {
  university: {
    id: string;
    name?: string;
    bannerKey?: string;
    locationDescription?: string;
    locationShort?: string;
    d2ApplicationFee?: string;
    scholarship?: string;
    intake?: string;
    [key: string]: any;
  };
}

export function UniversityCard({ university }: UniversityCardProps) {
  const router = useRouter();
  const imageUrl =
    getPublicUrl(university.bannerKey) ||
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60";

  const uniName = university.name?.trim() || "University";
  const initialsBadge = uniName.substring(0, 2).toUpperCase();

  const location =
    university.locationDescription || university.locationShort || "Korea";

  const tuition = university.d2ApplicationFee
    ? `₩${Number(university.d2ApplicationFee).toLocaleString()}`
    : "₩0";

  const hasScholarship = Boolean(university.scholarship);
  const hasIntake = Boolean(university.intake);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.bannerImage} />

        <View style={styles.imageOverlay} />

        {hasScholarship && (
          <View style={styles.scholarshipBadge}>
            <Text style={styles.scholarshipText}>
              Scholarship {university.scholarship}
            </Text>
          </View>
        )}

        {hasIntake && (
          <View style={styles.intakeBadge}>
            <Text style={styles.intakeText}>Intake: {university.intake}</Text>
          </View>
        )}
      </View>

      {/* Card Body */}
      <View style={styles.cardBody}>
        <View style={styles.headerRow}>
          <View style={styles.infoCol}>
            <Text style={styles.universityName} numberOfLines={1}>
              {uniName}
            </Text>
            <View style={styles.locationRow}>
              <MapPin size={13} color="#94A3B8" strokeWidth={2} />
              <Text style={styles.locationText}>{location}</Text>
            </View>
          </View>
          <View style={styles.initialsBadge}>
            <Text style={styles.initialsText}>{initialsBadge}</Text>
          </View>
        </View>

        {/* Visa & Tuition Details */}
        <View style={styles.metaRow}>
          <View style={styles.visaChip}>
            <Text style={styles.visaText}>D2/D4</Text>
          </View>
          <View style={styles.tuitionContainer}>
            <Text style={styles.tuitionAmount}>{tuition}</Text>
            <Text style={styles.tuitionUnit}> /apply</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push(`/study/${university.id}`)}
        >
          <LinearGradient
            colors={["#1E3A7B", "#2e74baff"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.detailsButton}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#0b254fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 3,
    borderColor: "#D9E8F8",
    borderWidth: 1.2,
  },
  imageWrapper: {
    height: 120,
    width: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(96, 135, 193, 0.3)",
  },
  scholarshipBadge: {
    position: "absolute",
    top: 10,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F59E0B",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  scholarshipText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  intakeBadge: {
    position: "absolute",
    bottom: 8,
    left: 14,
    backgroundColor: "rgba(15, 45, 92, 0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  intakeText: {
    color: "#87C4FF",
    fontSize: 12,
    fontWeight: "600",
  },
  cardBody: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
    alignItems: "center",
  },
  infoCol: {
    flex: 1,
    paddingRight: 8,
  },
  universityName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F2D5C",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#64748B",
  },
  initialsBadge: {
    width: 47,
    height: 47,
    borderRadius: 20,
    backgroundColor: "#2B4F96",
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  visaChip: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  visaText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#334155",
  },
  tuitionContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  tuitionAmount: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F2D5C",
  },
  tuitionUnit: {
    fontSize: 11,
    color: "#94A3B8",
  },
  detailsButton: {
    borderRadius: 999,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
