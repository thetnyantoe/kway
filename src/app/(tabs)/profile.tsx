import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppleIcon } from "../../../components/icons/AppleIcon";
import { BankCardIcon } from "../../../components/icons/BankcardIcon";
import { CameraIcon } from "../../../components/icons/CameraIcon";
import { EditIcon } from "../../../components/icons/EditIcon";
import { InfoIcon } from "../../../components/icons/InfoIcon";
import { LogoutIcon } from "../../../components/icons/LogoutIcon";
import { PasswordIcon } from "../../../components/icons/PasswordIcon";
import { QuestioncircleIcon } from "../../../components/icons/QuestioncircleIcon";
import { SettingsIcon } from "../../../components/icons/SettingsIcon";
import { TrashbinIcon } from "../../../components/icons/TrashbinIcon";

import { ChangePasswordModal } from "../../features/profile/components/ChangePasswordModal";
import { EditProfileModal } from "../../features/profile/components/EditProfileModal";
import { useProfile } from "../../features/profile/hooks/useProfile";

export default function ProfileScreen() {
  const [isMyanmar, setIsMyanmar] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const {
    displayName,
    email,
    phone,
    avatarUrl,
    avatarLetter,
    pickAndUploadAvatar,
    handleLogout,
    updateProfileData,
    loading,
  } = useProfile();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#0F2D5C", "#4DA6FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerBanner}
      >
        <View
          style={{
            width: 175,
            height: 175,
            borderRadius: 87.5,
            backgroundColor: "#ffffff10",
            position: "absolute",
            right: -40,
            top: -40,
          }}
        />
        <View style={styles.topNav}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditModalVisible(true)}
          >
            <EditIcon color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>

        {/* Dynamic User Card */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            {avatarUrl ? (
              <View style={styles.avatarImageWrapper}>
                <Image
                  source={{ uri: avatarUrl }}
                  style={styles.avatarImage}
                  contentFit="cover"
                  transition={200}
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  onError={(e) => {
                    console.error("Image load error:", e);
                    setImageLoading(false);
                  }}
                />
                {imageLoading && (
                  <View style={styles.imageLoaderOverlay}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarLetter}>{avatarLetter}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.cameraBadge}
              onPress={pickAndUploadAvatar}
            >
              <CameraIcon color="#0F2D5C" size={14} />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
            {phone ? <Text style={styles.userPhone}>{phone}</Text> : null}

            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>TOPIK 4</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>🇲🇲 Myanmar</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
      {/* Floating Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Applications</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Docs Ready</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0%</Text>
          <Text style={styles.statLabel}>Journey</Text>
        </View>
      </View>
      {/* Main Content Area */}
      <View style={styles.content}>
        <Text style={styles.sectionHeader}>My Plan</Text>
        <View style={styles.unboughtPlanCard}>
          <TouchableOpacity style={styles.choosePackageButton}>
            <Text style={styles.choosePackageButtonText}>
              Choose a Service Package
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payments Section */}
        <Text style={styles.sectionHeader}>Payments</Text>
        <View style={styles.cardGroup}>
          <TouchableOpacity style={styles.rowItem}>
            <View style={[styles.iconBox, { backgroundColor: "#F3E8FF" }]}>
              <BankCardIcon color="#8B5CF6" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Bank Transfer</Text>
              <Text style={styles.rowSubtitle}>
                KBZ, AYA, CB, KBZ Pay and etc.
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          <TouchableOpacity style={styles.rowItem}>
            <View style={[styles.iconBox, { backgroundColor: "#F1F5F9" }]}>
              <AppleIcon color="#0F172A" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Apple Pay (coming soon)</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          <TouchableOpacity style={styles.rowItem}>
            <View style={[styles.iconBox, { backgroundColor: "#E0F2FE" }]}>
              <BankCardIcon color="#0284C7" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Payment History</Text>
              <Text style={styles.rowSubtitle}>Transaction records</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionHeader}>FAQ</Text>
        <View style={styles.cardGroup}>
          <TouchableOpacity style={styles.rowItem}>
            <View style={[styles.iconBox, { backgroundColor: "#EEF2FF" }]}>
              <QuestioncircleIcon color="#4F46E5" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>General Questions</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          <TouchableOpacity style={styles.rowItem}>
            <View style={[styles.iconBox, { backgroundColor: "#E0F2FE" }]}>
              <InfoIcon color="#0284C7" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Usage Guide</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* App Settings */}
        <Text style={styles.sectionHeader}>App Settings</Text>
        <View style={styles.cardGroup}>
          <View style={styles.languageRow}>
            <Text
              style={[
                styles.langText,
                !isMyanmar ? styles.langActive : styles.langInactive,
              ]}
            >
              ENGLISH
            </Text>
            <Switch
              value={isMyanmar}
              onValueChange={setIsMyanmar}
              trackColor={{ false: "#3B82F6", true: "#3B82F6" }}
              thumbColor="#FFFFFF"
            />
            <Text
              style={[
                styles.langText,
                isMyanmar ? styles.langActive : styles.langInactive,
              ]}
            >
              MYANMAR
            </Text>
          </View>

          <View style={styles.itemDivider} />

          <TouchableOpacity style={styles.rowItem}>
            <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
              <SettingsIcon color="#16A34A" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Notification Settings</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <Text style={styles.sectionHeader}>Account Settings</Text>
        <View style={styles.cardGroup}>
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => setIsPasswordModalVisible(true)}
          >
            <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
              <PasswordIcon color="#16A34A" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Change Password</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          {/* Log Out Row */}
          <TouchableOpacity
            style={styles.rowItem}
            onPress={handleLogout}
            disabled={loading}
          >
            <View style={[styles.iconBox, { backgroundColor: "#FEE2E2" }]}>
              {loading ? (
                <ActivityIndicator size="small" color="#EF4444" />
              ) : (
                <LogoutIcon color="#EF4444" />
              )}
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Log out</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          <TouchableOpacity style={styles.rowItem}>
            <View style={[styles.iconBox, { backgroundColor: "#FEE2E2" }]}>
              <TrashbinIcon color="#EF4444" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={[styles.rowTitle, { color: "#EF4444" }]}>
                Delete Account
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <ChangePasswordModal
        visible={isPasswordModalVisible}
        onClose={() => setIsPasswordModalVisible(false)}
      />

      <EditProfileModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        initialData={{
          name: displayName,
          email,
          phone,
        }}
        onSave={updateProfileData}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  headerBanner: {
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatarPlaceholder: {
    width: 80,
    height: 84,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  avatarImageWrapper: {
    width: 80,
    height: 84,
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  imageLoaderOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  cameraBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#FFFFFF",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  userEmail: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  userPhone: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 1,
  },
  tagRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: -20,
    marginHorizontal: 20,
    zIndex: 10,
    elevation: 4,
    shadowColor: "#0F2D5C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    height: 70,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F2D5C",
  },
  statLabel: {
    fontSize: 11,
    color: "#8C9DB5",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E2EDFB",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8C9DB5",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
  },
  unboughtPlanCard: {
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    borderStyle: "dashed",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  choosePackageButton: {
    borderWidth: 1.5,
    borderColor: "#212e4455",
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  choosePackageButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212e44b9",
  },
  cardGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#0f2d5c43",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowTextContainer: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F2D5C",
  },
  rowSubtitle: {
    fontSize: 11,
    color: "#8C9DB5",
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: "#CBD5E1",
    fontWeight: "300",
  },
  itemDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginLeft: 64,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 12,
  },
  langText: {
    fontSize: 12,
    fontWeight: "700",
  },
  langActive: {
    color: "#8C9DB5",
  },
  langInactive: {
    color: "#CBD5E1",
  },
});
