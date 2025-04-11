import { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function HomePage() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [profileName, setProfileName] = useState("Timotius Vivaldi Gobo.");
  const [profilePic, setProfilePic] = useState(require("@/assets/image2.png"));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrichat</Text>
        <TouchableOpacity>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <Image source={profilePic} style={styles.profileImage} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{profileName}</Text>
            <Text style={styles.healthOverview}>Health Overview</Text>
          </View>
        </View>
        <Text style={styles.today}>Today</Text>
        <View style={styles.circleRow}>
          {[...Array(7)].map((_, i) => (
            <View key={i} style={[styles.circle, i < 5 ? styles.activeCircle : {}]} />
          ))}
        </View>
        <View style={styles.logRow}>
          <Image
                source={require('@/assets/Vector(4).png')}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
          <Text style={styles.foodstreak}>Food logging streak of 5 days</Text>
        </View>
        <View style={styles.mealButtons}>
          <TouchableOpacity style={styles.mealButton}>
            <View style={styles.mealButtonContent}>
              <View style={styles.mealLabelContainer}>
                <Image
                  source={require('@/assets/breakfast.png')}
                  style={styles.mealIcon}
                />
                <Text style={styles.mealButtonText}>Add Breakfast</Text>
              </View>
              <Image
                source={require('@/assets/ic_baseline-plus.png')}
                style={styles.plusIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mealButton}>
            <View style={styles.mealButtonContent}>
              <View style={styles.mealLabelContainer}>
                <Image
                  source={require('@/assets/lunch.png')}
                  style={styles.mealIcon}
                />
                <Text style={styles.mealButtonText}>Add Lunch</Text>
              </View>
              <Image
                source={require('@/assets/ic_baseline-plus.png')}
                style={styles.plusIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mealButton}>
            <View style={styles.mealButtonContent}>
              <View style={styles.mealLabelContainer}>
                <Image
                  source={require('@/assets/dinner.png')}
                  style={styles.mealIcon}
                />
                <Text style={styles.mealButtonText}>Add Dinner</Text>
              </View>
              <Image
                source={require('@/assets/ic_baseline-plus.png')}
                style={styles.plusIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mealButton}>
            <View style={styles.mealButtonContent}>
              <View style={styles.mealLabelContainer}>
                <Image
                  source={require('@/assets/ic_round-mode-night.png')}
                  style={styles.mealIcon}
                />
                <Text style={styles.mealButtonText}>Add Snack</Text>
              </View>
              <Image
                source={require('@/assets/ic_baseline-plus.png')}
                style={styles.plusIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
        <View style={styles.chartRow}>
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Calories</Text>
            <Image
              source={require('@/assets/chart5fix.png')}
              style={{ width: 150, height: 150}}
            />
          </View>
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Nutrition</Text>
            <Image
              source={require('@/assets/chart7fix.png')}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "grey",
    padding: 8,
    paddingTop: 50,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: "#FFA500",
    fontSize: 24,
    fontWeight: "bold",
  },
  menuButton: {
    width: 32,
    height: 32,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    color: "white",
    fontSize: 18,
  },
  profileSection: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  profileTextContainer: {
    marginLeft: 16,
  },
  profileName: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  healthOverview: {
    color: "white",
    fontSize: 28,
    fontWeight: "400",
  },
  circleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    marginHorizontal: 4,
  },
  foodstreak: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  mealButtons: {
    marginTop: 24,
  },
  mealButton: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  mealButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  plusIcon: {
    width: 24,
    height: 24,
  },
  mealButtonText: {
    color: "white",
    fontSize: 16,
  },
  dashboardTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "600",
    padding: 5,
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 24,
  },
  chartCard: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    borderRadius: 32,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
  },
  chartTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  logRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingTop: 15,
    marginHorizontal: 13
  },
  today: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  activeCircle: {
    backgroundColor: "#4CAF50",
  },
});