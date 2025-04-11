import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

export default function TrackerPage() {
  const topThree = [
    { name: "Thalita.S", streak: 365, location: "Jakarta", badge: "Saved 50kg CO2", rank: 1 },
    { name: "Naomi P.", streak: 364, location: "Sidoarjo", rank: 2 },
    { name: "Viktor A.", streak: 363, location: "Madura", rank: 3 },
  ];

  const rankings = [
    { name: "Megawati", streak: 362, badge: "2 weeks streak", rank: 4 },
    { name: "Jokowi", streak: 361, badge: "Shared 50 meals", rank: 5 },
    { name: "King Eleng", streak: 360, rank: 6 },
    { name: "Anda", streak: 1, rank: 100 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      
      <View style={styles.topThreeContainer}>
        {topThree.map((user, index) => (
          <View key={index} style={styles.topThreeCard}>
            <Image source={{ uri: "https://via.placeholder.com/60" }} style={styles.topThreeImage} />
            <Text style={styles.topThreeName}>{user.name}</Text>
            <Text style={styles.streakText}>{user.streak} Streaks</Text>
            {user.badge && <Text style={styles.badge}>{user.badge}</Text>}
            <Text style={styles.locationText}>{user.location}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.leaderboardContainer}>
        <View style={styles.leaderboardHeader}>
          <Text style={styles.leaderboardHeaderText}>Rank</Text>
          <Text style={styles.leaderboardHeaderText}>User</Text>
          <Text style={styles.leaderboardHeaderText}>Streaks</Text>
        </View>

        {rankings.map((user, index) => (
          <View key={index} style={[styles.leaderboardRow, index % 2 ? styles.rowDark : styles.rowLight]}>
            <Text style={styles.text}>{user.rank}</Text>
            <View style={styles.userContainer}>
              <Image source={{ uri: "https://via.placeholder.com/40" }} style={styles.userImage} />
              <View>
                <Text style={styles.text}>{user.name}</Text>
                {user.badge && <Text style={styles.badge}>{user.badge}</Text>}
              </View>
            </View>
            <Text style={styles.text}>{user.streak}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", paddingHorizontal: 16, paddingVertical: 24 },
  header: { color: "white", textAlign: "center", fontSize: 24, fontWeight: "bold" },
  topThreeContainer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  topThreeCard: { backgroundColor: "#1E1E1E", padding: 16, marginHorizontal: 8, borderRadius: 12, alignItems: "center", width: 96 },
  topThreeImage: { width: 56, height: 56, borderRadius: 28 },
  topThreeName: { color: "white", textAlign: "center", fontWeight: "bold", marginTop: 8 },
  streakText: { color: "#B0B0B0", fontSize: 12 },
  badge: { fontSize: 12, backgroundColor: "#FF6B00", color: "white", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: 4, textAlign: "center" },
  locationText: { color: "#888", fontSize: 12 },
  leaderboardContainer: { marginTop: 24 },
  leaderboardHeader: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#333", padding: 12, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  leaderboardHeaderText: { color: "white", fontWeight: "bold" },
  leaderboardRow: { flexDirection: "row", justifyContent: "space-between", padding: 12, alignItems: "center" },
  rowDark: { backgroundColor: "#1E1E1E" },
  rowLight: { backgroundColor: "#333" },
  userContainer: { flexDirection: "row", alignItems: "center" },
  userImage: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  text: { color: "white" },
});
