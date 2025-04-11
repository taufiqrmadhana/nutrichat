import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function LeaderboardPage() {
  const leaderboardData = [
    { rank: 1, name: "Yaafi Wasesa", exp: 3640, level: 15, location: "Sidoarjo", streaks: "364 Streaks" },
    { rank: 2, name: "Kevinza Faiz", exp: 3650, level: 16, location: "Jakarta", streaks: "Saved 50kg CO2" },
    { rank: 3, name: "Akmal Galih", exp: 3630, level: 14, location: "Madura", streaks: "363 Streaks" },
    { rank: 4, name: "Juan Siagian", exp: 3620, level: 14, location: "Surabaya", streaks: "2 weeks streak" },
    { rank: 5, name: "Matthew Nicholas", exp: 3610, level: 13, location: "Jakarta", streaks: "Shared 50 meals" },
    { rank: 6, name: "Ricky Shokat", exp: 3600, level: 13, location: "Bandung", streaks: "360 Streaks" },
    { rank: 100, name: "Anda", exp: 200, level: 1, location: "", streaks: "Starting your journey!" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainHeader}>
        <Text style={styles.mainTitle}>Nutrichat</Text>
        <Text style={styles.time}>9:41</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.leaderboardTitle}>🏆 LEADERBOARD</Text>
          <View style={styles.titleLine} />
          <Text style={styles.subtitle}>Global Nutrition Champions</Text>
        </View>

        {leaderboardData.map((user, index) => (
          <View key={index} style={[
            styles.leaderboardCard,
            user.rank === 100 && styles.currentUserCard
          ]}>
            <Text style={[
              styles.rankText,
              user.rank <= 3 && styles.topRankText
            ]}>
              #{user.rank}
            </Text>
            
            <View style={styles.userMainInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.locationText}>{user.location}</Text>
              <Text style={styles.streakText}>{user.streaks}</Text>
            </View>

            <View style={styles.levelInfo}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>Lv. {user.level}</Text>
              </View>
              <View style={styles.expContainer}>
                <View style={styles.expBar}>
                  <View style={[
                    styles.expProgress, 
                    { width: `${(user.exp % 1000)/10}%` }
                  ]}/>
                </View>
                <Text style={styles.expText}>{user.exp} EXP</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <Link href="/(tabs)/challenge" asChild>
          <TouchableOpacity style={styles.leaderboardButton}>
            <Text style={styles.leaderboardButtonText}>Back</Text>
          </TouchableOpacity>
        </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  mainTitle: { 
    color: "#FFA500", 
    fontSize: 24, 
    fontWeight: "bold",
  },
  time: { color: "#333", fontSize: 16 },
  contentContainer: { paddingHorizontal: 16, paddingBottom: 30 },
  titleContainer: {
    alignItems: "center",
    marginVertical: 25,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#FFA50020",
  },
  leaderboardTitle: {
    color: "#FFA500",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 8
  },
  titleLine: {
    width: 50,
    height: 3,
    backgroundColor: "#4CAF50",
    marginBottom: 8
  },
  subtitle: {
    color: "#888",
    fontSize: 14,
    fontStyle: "italic"
  },
  leaderboardCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
  },
  currentUserCard: {
    borderWidth: 2,
    borderColor: "#FFA500",
  },
  rankText: {
    color: "#888",
    fontSize: 18,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  topRankText: {
    color: "#FFA500",
    fontSize: 22,
  },
  userMainInfo: { flex: 1, marginLeft: 10 },
  userName: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  locationText: { color: "#888", fontSize: 12, marginTop: 2 },
  streakText: { color: "#4CAF50", fontSize: 12, marginTop: 4 },
  levelInfo: { alignItems: "flex-end" },
  levelBadge: {
    backgroundColor: "#333",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  levelText: { color: "#FFA500", fontSize: 12, fontWeight: "bold" },
  expContainer: { marginTop: 8, width: 120 },
  expBar: {
    height: 6,
    backgroundColor: "#333",
    borderRadius: 3,
    overflow: "hidden",
  },
  expProgress: {
    backgroundColor: "#4CAF50",
    height: "100%",
  },
  expText: {
    color: "#888",
    fontSize: 10,
    marginTop: 4,
    textAlign: "right",
  },
  leaderboardButton: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    padding: 16,
    marginTop: 12,
    marginBottom:10,
    alignItems: "center",
  },
  leaderboardButtonText: { color: "#000", fontWeight: "bold" },
});