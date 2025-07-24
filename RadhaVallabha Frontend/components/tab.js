import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomTabBar() {
  const router = useRouter();
  const segments = useSegments();

  // Join segments to compare full route path
  const currentPath = segments.join('/');

  const renderTab = (route, iconName, iconSize = 24) => {
    const isActive = currentPath === route;
    return (
      <TouchableOpacity
        onPress={() => router.push(`../${route}`)}
        style={[styles.tabItem, isActive && styles.activeTabItem]}
      >
        <Ionicons name={iconName} size={iconSize} color={isActive ? "#7e57c2" : "white"} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBackground}>
      {renderTab('quotes/quotes', 'chatbubble-ellipses-outline')}
        {renderTab('admin/admin_dashboard', 'heart', 28)}
        {renderTab('dashboard/dashboard', 'home', 28)}
        {renderTab('courses/courses', 'school-outline')}
        {renderTab('profile', 'person-outline')}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    alignItems: "center",
  },
  tabBackground: {
    flexDirection: "row",
    backgroundColor: "#7e57c2",
    borderRadius: 40,
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    width: "100%",
    paddingHorizontal: 20,
  },
  tabItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabItem: {
    backgroundColor: "white",
    width: 58,
    height: 58,
    borderRadius: 29,
    top: -18,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
