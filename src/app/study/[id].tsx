import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  AlertCircle,
  Award,
  Bookmark,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  MapPin,
  MessageCircle,
} from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPublicUrl } from "../../../lib/r2";
import { useBookmark } from "../../features/study/hooks/useBookmark";
import { useUniversityDetail } from "../../features/study/hooks/useUniversityDetail";

export default function UniversityDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { university, loading } = useUniversityDetail(id);
  const { isBookmarked, toggleBookmark } = useBookmark(id);

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [expandedMajorId, setExpandedMajorId] = useState<string | null>("0");

  const toggleAccordion = (idx: string) => {
    setExpandedMajorId((prev) => (prev === idx ? null : idx));
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!university) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>University not found.</Text>
      </View>
    );
  }

  const bannerImage =
    getPublicUrl(university.bannerKey) ||
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000";

  const aboutText = university.about || "No description provided.";
  const CHAR_LIMIT = 140;
  const shouldShowReadMore = aboutText.length > CHAR_LIMIT;
  const displayedAboutText =
    isAboutExpanded || !shouldShowReadMore
      ? aboutText
      : `${aboutText.slice(0, CHAR_LIMIT)}...`;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <Image source={{ uri: bannerImage }} style={styles.bannerImage} />

          <LinearGradient
            colors={["transparent", "rgba(37, 56, 88, 0.7)"]}
            style={styles.linearGradient}
          />

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <ChevronLeft color="#fff" size={24} />
            </TouchableOpacity>
            <View style={styles.rightActions}>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  isBookmarked && {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                ]}
                onPress={toggleBookmark}
              >
                <Bookmark
                  color={isBookmarked ? "#ddda25ff" : "#fff"}
                  size={20}
                  fill={isBookmarked ? "#ddda25ff" : "transparent"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bannerInfo}>
            <Text style={styles.bannerUniName}>{university.name}</Text>
            <View style={styles.locationRow}>
              <MapPin color="rgba(255,255,255,0.8)" size={14} />
              <Text style={styles.bannerLocation}>
                {university.locationShort || university.locationDescription}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {university.d2ApplicationFee
                ? `₩${Number(university.d2ApplicationFee).toLocaleString()}`
                : "---"}
            </Text>
            <Text style={styles.statLabel}>Application Fee</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {university.scholarship ? `${university.scholarship}` : "---"}
            </Text>
            <Text style={styles.statLabel}>Scholarship</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{university.intake || "---"}</Text>
            <Text style={styles.statLabel}>Intake</Text>
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.contentBody}>
          <Text style={styles.sectionTitle}>About University</Text>
          <Text style={styles.aboutText}>
            {displayedAboutText}
            {shouldShowReadMore && (
              <Text
                style={styles.readMore}
                onPress={() => setIsAboutExpanded((prev) => !prev)}
              >
                {isAboutExpanded ? " show less" : " read more"}
              </Text>
            )}
          </Text>

          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.locationDescText}>
            {university.locationDescription || university.locationShort}
          </Text>

          {/* D4 Language Program / Info Section */}
          <View style={styles.programSectionContainer}>
            <View style={styles.pillRow}>
              <View style={[styles.pillButton, styles.pillActive]}>
                <Text style={[styles.pillText, styles.pillTextActive]}>
                  D4 Language Program
                </Text>
              </View>

              <View style={[styles.pillButton, styles.pillInactive]}>
                <Text style={[styles.pillText, styles.pillTextInactive]}>
                  Information
                </Text>
              </View>
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <LinearGradient
                  colors={["#1E3A7B", "#3F8CD9"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.labelCol}
                >
                  <Text style={styles.labelText}>Application Period</Text>
                </LinearGradient>
                <View style={styles.valueCol}>
                  <Text style={styles.valueText}>
                    {university.d4ApplicationPeriod || "Not specified"}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <LinearGradient
                  colors={["#1E3A7B", "#3F8CD9"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.labelCol}
                >
                  <Text style={styles.labelText}>Tuition Fee</Text>
                </LinearGradient>
                <View style={styles.valueCol}>
                  <Text style={styles.valueText}>
                    {university.d4TuitionFee
                      ? `₩${Number(university.d4TuitionFee).toLocaleString()} (1 Semester)`
                      : "Not specified"}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <LinearGradient
                  colors={["#1E3A7B", "#3F8CD9"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.labelCol}
                >
                  <Text style={styles.labelText}>Apply Fee</Text>
                </LinearGradient>
                <View style={styles.valueCol}>
                  <Text style={styles.valueText}>
                    {university.d4ApplyFee
                      ? `₩${Number(university.d4ApplyFee).toLocaleString()}`
                      : "Not specified"}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <LinearGradient
                  colors={["#1E3A7B", "#3F8CD9"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.labelCol}
                >
                  <Text style={styles.labelText}>
                    Dormitory rent{"\n"}(3–months)
                  </Text>
                </LinearGradient>
                <View style={styles.valueCol}>
                  <Text style={styles.valueText}>
                    {university.d4DormitoryRent || "Not specified"}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <LinearGradient
                  colors={["#1E3A7B", "#3F8CD9"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.labelCol}
                >
                  <Text style={styles.labelText}>Show Money</Text>
                </LinearGradient>
                <View style={styles.valueCol}>
                  <Text style={styles.valueText}>
                    {university.d4ShowMoney || "Not specified"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* D-2 Degree Program */}
          <View style={styles.d2ProgramSectionContainer}>
            <Text style={styles.degreeTitle}>D–2 Degree Program</Text>
            <Text style={styles.subSectionTitle}>Available Majors</Text>

            <View style={styles.accordionContainer}>
              {Array.isArray(university.majors) &&
                university.majors.map((item: any, index: number) => {
                  const itemId = index.toString();
                  const isExpanded = expandedMajorId === itemId;
                  return (
                    <View key={itemId} style={styles.accordionItem}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.accordionHeader}
                        onPress={() => toggleAccordion(itemId)}
                      >
                        <View style={styles.accordionTitleRow}>
                          <View style={styles.bulletDot} />
                          <Text style={styles.accordionTitle}>
                            {item.title}
                          </Text>
                        </View>
                        {isExpanded ? (
                          <ChevronDown size={18} color="#8C9DB5" />
                        ) : (
                          <ChevronRight size={18} color="#8C9DB5" />
                        )}
                      </TouchableOpacity>

                      {isExpanded && item.description ? (
                        <View style={styles.accordionBody}>
                          <Text style={styles.subMajorsText}>
                            {item.description}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  );
                })}
            </View>

            <View style={styles.d2TuitionSection}>
              <View
                style={[
                  styles.pillButton,
                  styles.pillActive,
                  styles.d2TuitionPill,
                ]}
              >
                <Text style={[styles.pillText, styles.pillTextActive]}>
                  D2 Tuition Fee Per Semester
                </Text>
              </View>

              <View style={styles.tableContainer}>
                {Array.isArray(university.d2TuitionFees) &&
                  university.d2TuitionFees.map(
                    (feeItem: any, index: number) => (
                      <View key={index} style={styles.tableRow}>
                        <LinearGradient
                          colors={["#1E3A7B", "#3F8CD9"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.labelCol}
                        >
                          <Text style={styles.labelText}>
                            {feeItem.program || "Program"}
                          </Text>
                        </LinearGradient>
                        <View style={styles.valueCol}>
                          <Text style={styles.valueText}>
                            {feeItem.fee
                              ? `₩${Number(feeItem.fee).toLocaleString()}`
                              : "N/A"}
                          </Text>
                        </View>
                      </View>
                    ),
                  )}
              </View>
            </View>

            <View style={styles.totalCostContainer}>
              <Text style={styles.totalCostTitle}>
                Estimated Total Cost (1 Year)
              </Text>
              <Text style={styles.totalCostSubtext}>
                Approximately{" "}
                <Text style={styles.totalCostBold}>
                  {university.estimatedCost
                    ? `₩${Number(university.estimatedCost).toLocaleString()}`
                    : "N/A"}
                </Text>{" "}
                (Estimated total for tuition, insurance, and basic living
                expenses)
              </Text>
            </View>
          </View>

          {/* Admission Schedule */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <Calendar size={20} color="#0F2D5C" />
              <Text style={styles.infoCardTitle}>Admission Schedule</Text>
            </View>
            <View style={styles.infoCardBody}>
              {Array.isArray(university.intakesList) &&
                university.intakesList.map((intake: any, idx: number) => (
                  <Text key={idx} style={styles.scheduleText}>
                    {intake.term || "Term"} ({intake.detail || "Detail"})
                  </Text>
                ))}
              <View style={styles.noteRow}>
                <AlertCircle size={13} color="#64748B" />
                <Text style={styles.noteFootnote}>
                  The Application Schedule is listed in the Admission Guide.
                </Text>
              </View>
            </View>
          </View>

          {/* Scholarship Available */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <Award size={20} color="#0F2D5C" />
              <Text style={styles.infoCardTitle}>Scholarship Available</Text>
            </View>
            <View style={styles.infoCardBody}>
              <Text style={styles.scholarshipCategoryTitle}>Scholarships</Text>
              {Array.isArray(university.scholarshipsList) &&
                university.scholarshipsList.map((sch: string, idx: number) => (
                  <View key={idx} style={styles.scholarshipRow}>
                    <Text style={styles.scholarshipRequirement}>{sch}</Text>
                  </View>
                ))}
            </View>
          </View>
          <Text style={styles.cardFooterNote}>
            Eligibility and scholarship amounts may vary by semester.
          </Text>

          {/* Dormitory */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <Home size={20} color="#0F2D5C" />
              <Text style={styles.infoCardTitle}>Dormitory</Text>
            </View>
            <View style={styles.infoCardBody}>
              {Array.isArray(university.dormitoriesList) &&
                university.dormitoriesList.map((dorm: string, idx: number) => (
                  <Text key={idx} style={styles.dormItemText}>
                    {dorm}
                  </Text>
                ))}
              <Text style={styles.dormItemText}>
                Rent: {university.d4DormitoryRent || "N/A"}
              </Text>
              <View style={[styles.noteRow, { marginTop: 6 }]}>
                <AlertCircle size={13} color="#64748B" />
                <Text style={styles.noteFootnote}>
                  Dormitory Fee may vary depending on Room Type and Semester.
                </Text>
              </View>
            </View>
          </View>

          {/* University Application Fee */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <CreditCard size={20} color="#0F2D5C" />
              <Text style={styles.infoCardTitle}>
                University Application Fee
              </Text>
            </View>
            <View style={styles.infoCardBody}>
              <Text style={styles.appFeeAmount}>
                {university.d2ApplicationFee
                  ? `₩${Number(university.d2ApplicationFee).toLocaleString()}`
                  : "N/A"}{" "}
                <Text style={styles.appFeeSub}>(One-time)</Text>
              </Text>
              <View style={styles.noteRow}>
                <AlertCircle size={13} color="#64748B" />
                <Text style={styles.noteFootnote}>
                  GKS Scholarship Applicants and applicants from overseas are
                  eligible for an application fee waiver where applicable.
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.blackNoteHeading}>Note</Text>
          <View style={styles.blackNoteContainer}>
            {Array.isArray(university.notesList) &&
              university.notesList.map((note: string, idx: number) => (
                <View key={idx} style={styles.blackNoteItem}>
                  <View style={styles.blueDot} />
                  <Text style={styles.blackNoteText}>{note}</Text>
                </View>
              ))}
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.consultationButton}
            >
              <MessageCircle size={18} color="#0F2D5C" />
              <Text style={styles.consultationButtonText}>
                Free Consultation
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={styles.applyWrapper}>
              <LinearGradient
                colors={["#1E3A7B", "#3F8CD9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.applyButtonGradient}
              >
                <Text style={styles.applyButtonText}>Apply with K–Way</Text>
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
    height: 240,
    width: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },
  actionButtonsRow: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
  bannerUniName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 26,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  bannerLocation: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "500",
  },

  statsCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingVertical: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9E8F8",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F2D5C",
    marginBottom: 4,
    textAlign: "center",
  },
  statLabel: {
    fontSize: 11,
    color: "#8C9DB5",
    fontWeight: "500",
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#D9E8F8",
  },

  /* Content */
  contentBody: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F2D5C",
    marginTop: 26,
    marginBottom: 6,
  },
  aboutText: {
    fontSize: 14,
    color: "#4B5E7A",
    lineHeight: 20,
    fontWeight: "300",
  },
  readMore: {
    color: "#6eadc8ff",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  locationDescText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    fontWeight: "300",
  },

  programSectionContainer: {
    marginTop: 36,
  },
  pillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 6,
  },
  pillButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pillActive: {
    backgroundColor: "#435369",
  },
  pillInactive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E8F8",
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
  },
  pillTextActive: {
    color: "#FFFFFF",
  },
  pillTextInactive: {
    color: "#0F2D5C",
  },

  /* Table Styles */
  tableContainer: {
    gap: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E8F8",
    overflow: "hidden",
    alignItems: "stretch",
    shadowColor: "#0F2D5C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  labelCol: {
    width: "40%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },
  labelText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 16,
  },
  valueCol: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    color: "#0F2D5C",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 18,
  },

  d2ProgramSectionContainer: {
    marginTop: 60,
  },
  degreeTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1751B7",
    textAlign: "center",
    marginBottom: 28,
  },
  subSectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A2B49",
    marginBottom: 16,
  },
  accordionContainer: {
    marginBottom: 28,
  },
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  accordionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A2B49",
  },
  accordionBody: {
    paddingLeft: 16,
    paddingBottom: 14,
  },
  subMajorsText: {
    fontSize: 12,
    color: "#353535",
    lineHeight: 16,
    fontWeight: "300",
  },
  d2TuitionSection: {
    marginTop: 8,
  },
  d2TuitionPill: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  totalCostContainer: {
    marginTop: 12,
    paddingLeft: 10,
    marginBottom: 28,
  },
  totalCostTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  totalCostSubtext: {
    fontSize: 11,
    color: "#475569",
    lineHeight: 15,
  },
  totalCostBold: {
    fontWeight: "700",
    color: "#0F172A",
    textDecorationLine: "underline",
  },

  infoCard: {
    backgroundColor: "#EAF2FC",
    borderRadius: 24,
    padding: 20,
    marginTop: 26,
    borderWidth: 1,
    borderColor: "#D4E5FA",
  },
  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  infoCardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F2D5C",
  },
  infoCardBody: {
    gap: 6,
  },
  scheduleText: {
    fontSize: 13,
    color: "#1E293B",
    fontWeight: "500",
  },
  daysLeftText: {
    fontSize: 13,
    color: "#1E293B",
    fontWeight: "700",
    marginTop: 4,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  noteFootnote: {
    fontSize: 10.5,
    color: "#64748B",
    fontStyle: "italic",
    flex: 1,
  },
  scholarshipCategoryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F2D5C",
    marginBottom: 6,
  },
  scholarshipRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  scholarshipRequirement: {
    fontSize: 12,
    color: "#334155",
    fontWeight: "500",
  },
  amberBadge: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  amberBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  cardFooterNote: {
    fontSize: 11,
    color: "#475569",
    marginTop: 10,
    paddingLeft: 10,
  },
  dormItemText: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "500",
    marginVertical: 2,
  },
  appFeeAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F2D5C",
  },
  appFeeSub: {
    fontSize: 12,
    fontWeight: "400",
    color: "#64748B",
  },

  /* Black Note Footer Container */
  blackNoteContainer: {
    backgroundColor: "#272727ff",
    borderRadius: 12,
    padding: 20,
  },
  blackNoteHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#272727ff",
    marginBottom: 6,
    marginTop: 28,
    fontStyle: "italic",
  },
  blackNoteItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
    marginTop: 5,
  },
  blackNoteText: {
    fontSize: 12,
    color: "#E2E8F0",
    lineHeight: 18,
    flex: 1,
    fontWeight: "300",
  },

  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 28,
    marginBottom: 18,
  },
  consultationButton: {
    flex: 1,
    flexDirection: "row",
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#0F2D5C",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  consultationButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F2D5C",
  },
  applyWrapper: {
    flex: 1,
    shadowColor: "#1E3A7B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  applyButtonGradient: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
