import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AlertIcon } from "../../../components/icons/AlertIcon";
import { CommunityIcon } from "../../../components/icons/CommunityIcon";
import { HomeIcon } from "../../../components/icons/HomeIcon";
import { ProfileIcon } from "../../../components/icons/ProfileIcon";
import { StudyIcon } from "../../../components/icons/StudyIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0F2D5C",
        tabBarInactiveTintColor: "#8C9DB5",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              {focused && <View style={styles.activeTopLine} />}
              <View style={[styles.circle, focused && styles.activeCircle]}>
                <HomeIcon color={color} size={22} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="study"
        options={{
          title: "Study",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              {focused && <View style={styles.activeTopLine} />}
              <View style={[styles.circle, focused && styles.activeCircle]}>
                <StudyIcon color={color} size={22} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              {focused && <View style={styles.activeTopLine} />}
              <View style={[styles.circle, focused && styles.activeCircle]}>
                <CommunityIcon color={color} size={22} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              {focused && <View style={styles.activeTopLine} />}
              <View style={[styles.circle, focused && styles.activeCircle]}>
                <AlertIcon color={color} size={22} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              {focused && <View style={styles.activeTopLine} />}
              <View style={[styles.circle, focused && styles.activeCircle]}>
                <ProfileIcon color={color} size={22} />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 84,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E2EDFB",
    paddingBottom: 14,
    paddingTop: 5,
    elevation: 0,
  },
  tabBarItem: {
    paddingBottom: 4,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  activeTopLine: {
    position: "absolute",
    top: -10, // Negative offset grounds it flush against the top border line with zero space
    width: 38,
    height: 3,
    backgroundColor: "#0F2D5C",
    borderRadius: 8,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  activeCircle: {
    backgroundColor: "#EBF4FF",
  },
});
