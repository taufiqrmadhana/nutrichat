import { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export default function HomePage() {
  const [profileName] = useState("Timotius Vivaldi Gobo.");
  const [profilePic] = useState(require("@/assets/image2.png"));

  const breakfastData = [
    {
      name: "Wheat Toast",
      quantity: "2 slices",
      nutrients: { sod: 320, fat: 4.96, carbs: 47.38, prot: 7.73, cals: 256 }
    },
    {
      name: "Orange Juice",
      quantity: "1 cup",
      nutrients: { sod: 2, fat: 0.50, carbs: 25.79, prot: 1.74, cals: 112 }
    },
    {
      name: "Cappuccino",
      quantity: "1 mug (8 fl oz)",
      nutrients: { sod: 66, fat: 0.25, carbs: 6.21, prot: 4.31, cals: 45 }
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrichat</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={profilePic} style={styles.profileImage} />
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.profileName}>{profileName}</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level 2 Explorer</Text>
            </View>
          </View>
        </View>

        <View style={styles.streakContainer}>
          <Image source={require('@/assets/Vector(4).png')} style={styles.streakIcon} />
          <Text style={styles.streakText}>Food logging streak of 5 days</Text>
        </View>

        <View style={styles.mealButtons}>
          {[
            { icon: require('@/assets/breakfast.png'), label: 'Add Breakfast' },
            { icon: require('@/assets/lunch.png'), label: 'Add Lunch' },
            { icon: require('@/assets/dinner.png'), label: 'Add Dinner' },
            { icon: require('@/assets/ic_round-mode-night.png'), label: 'Add Snack' }
          ].map((meal, index) => (
            <TouchableOpacity key={index} style={styles.mealButton}>
              <View style={styles.mealContent}>
                <Image source={meal.icon} style={styles.mealIcon} />
                <Text style={styles.mealButtonText}>{meal.label}</Text>
              </View>
              <Image source={require('@/assets/ic_baseline-plus.png')} style={styles.plusIcon} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mealSection}>
          <Text style={styles.sectionHeader}>Breakfast - 418 kcal</Text>
          <View style={styles.nutrientHeader}>
            <Text style={styles.nutrientLabel}>Food Item</Text>
            <Text style={styles.nutrientLabel}>Sod</Text>
            <Text style={styles.nutrientLabel}>Fat</Text>
            <Text style={styles.nutrientLabel}>Carbs</Text>
            <Text style={styles.nutrientLabel}>Prot</Text>
            <Text style={styles.nutrientLabel}>Cals</Text>
          </View>
          
          {breakfastData.map((item, index) => (
            <View key={index} style={styles.foodItem}>
              <View style={styles.foodHeader}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodQuantity}>{item.quantity}</Text>
              </View>
              <View style={styles.nutrientRow}>
                <Text style={styles.nutrientValue}>{item.nutrients.sod}</Text>
                <Text style={styles.nutrientValue}>{item.nutrients.fat}g</Text>
                <Text style={styles.nutrientValue}>{item.nutrients.carbs}g</Text>
                <Text style={styles.nutrientValue}>{item.nutrients.prot}g</Text>
                <Text style={styles.calorieValue}>{item.nutrients.cals}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.dashboardTitle}>Health Overview</Text>
        
        <View style={styles.dashboardCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Berat Badan</Text>
            <Text style={styles.cardSubtitle}>Scat ini</Text>
          </View>
          <Text style={styles.weightText}>90Kg</Text>
          <View style={styles.timelineContainer}>
            {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((month, index) => (
              <Text key={index} style={styles.monthText}>{month}</Text>
            ))}
          </View>
        </View>

        <View style={styles.dashboardCard}>
          <Text style={styles.cardTitle}>Food Distribution</Text>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Calories</Text>
              <Text style={styles.nutritionValue}>1,950 kcal</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Carbohydrates</Text>
              <Text style={styles.nutritionValue}>133g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Proteins</Text>
              <Text style={styles.nutritionValue}>109.6g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Fats</Text>
              <Text style={styles.nutritionValue}>69.3g</Text>
            </View>
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
    backgroundColor: "white",
    padding: 16,
    paddingTop: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: "#FFA500",
    fontSize: 24,
    fontWeight: "bold",
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
    marginLeft: 0,
  },
  profileName: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },
  levelBadge: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  levelText: {
    color: "#FFA500",
    fontSize: 12,
    fontWeight: '600',
  },
  greeting: {
    color: "#888",
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  streakIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  streakText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  mealButtons: {
    marginTop: 24,
  },
  mealButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  mealContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  mealButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  plusIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFA500",
  },
  dashboardTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
  },
  dashboardCard: {
    backgroundColor: "#1c1c1c",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 16,
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "500",
  },
  weightText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  timelineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  monthText: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
  },
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  nutritionItem: {
    width: "48%",
    marginBottom: 16,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 12,
  },
  nutritionLabel: {
    color: "#888",
    fontSize: 14,
    marginBottom: 4,
  },
  nutritionValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  mealSection: {
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  sectionHeader: {
    color: "#FFA500",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  nutrientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nutrientLabel: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  foodItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 12,
  },
  foodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  foodName: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    flex: 2,
  },
  foodQuantity: {
    color: "#888",
    fontSize: 12,
    flex: 1,
    textAlign: "right",
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutrientValue: {
    color: "white",
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
  calorieValue: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
});