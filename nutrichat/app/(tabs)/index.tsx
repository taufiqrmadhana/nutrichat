import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function HomePage() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrichat</Text>
        <TouchableOpacity>
          <View style={styles.menuButton}>
            <Text style={styles.menuText}>≡</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: "https://via.placeholder.com/60" }} style={styles.profileImage} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>Timotius Vivaldi G.</Text>
          <Text style={styles.profileLevel}>Lvl 1</Text>
          <View style={styles.progressBarContainer}>
            <LinearGradient colors={["#ff7300", "#ffb300"]} style={styles.progressBar} />
            <Text style={styles.progressText}>200/500</Text>
          </View>
        </View>
      </View>

      <View style={styles.evaluationCard}>
        <Text style={styles.evaluationTitle}>Evaluasi Harian</Text>
        <Text style={styles.evaluationText}>
          Minggu ini kamu mengonsumsi kalori 10% lebih banyak daripada minggu lalu! Kamu hampir memenuhi target.
        </Text>

        <View style={styles.evaluationStats}>
          <View>
            <Text style={styles.evaluationNumber}>2081 kkal</Text>
            <Text style={styles.evaluationLabel}>Total Kalori</Text>
          </View>
          <View>
            <Text style={styles.evaluationNumber}>68%</Text>
            <Text style={styles.evaluationLabel}>Persentase RDI</Text>
          </View>
        </View>

        <View style={styles.nutritionBreakdown}>
          <View style={styles.nutritionItem}>
            <View style={[styles.nutritionCircle, { backgroundColor: "#6b46c1" }]}> 
              <Text style={styles.nutritionText}>85%</Text>
            </View>
            <Text style={styles.nutritionLabel}>Protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <View style={[styles.nutritionCircle, { backgroundColor: "#e53e3e" }]}> 
              <Text style={styles.nutritionText}>62%</Text>
            </View>
            <Text style={styles.nutritionLabel}>Karbohidrat</Text>
          </View>
          <View style={styles.nutritionItem}>
            <View style={[styles.nutritionCircle, { backgroundColor: "#d69e2e" }]}> 
              <Text style={styles.nutritionText}>45%</Text>
            </View>
            <Text style={styles.nutritionLabel}>Lemak</Text>
          </View>
        </View>
      </View>

      <View style={styles.mealButtons}>
        {["Breakfast", "Lunch", "Dinner", "Snack"].map((meal) => (
          <TouchableOpacity key={meal} style={styles.mealButton}>
            <Text style={styles.mealButtonText}>Add {meal}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
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
    fontWeight: "600",
  },
  profileLevel: {
    color: "gray",
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    width: 112,
    borderRadius: 4,
  },
  progressText: {
    marginLeft: 8,
    color: "gray",
    fontSize: 12,
  },
  evaluationCard: {
    marginTop: 24,
    backgroundColor: "#1c1c1c",
    padding: 16,
    borderRadius: 16,
  },
  evaluationTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  evaluationText: {
    color: "gray",
    fontSize: 14,
    marginTop: 4,
  },
  evaluationStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  evaluationNumber: {
    color: "#FFA500",
    fontSize: 24,
    fontWeight: "bold",
  },
  evaluationLabel: {
    color: "gray",
    fontSize: 12,
  },
  nutritionBreakdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  nutritionText: {
    color: "white",
  },
  nutritionLabel: {
    color: "gray",
    fontSize: 12,
    marginTop: 4,
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
  mealButtonText: {
    color: "white",
    fontSize: 16,
  },
});