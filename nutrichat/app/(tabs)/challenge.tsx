import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ChallengePage() {
  const [profileName, setProfileName] = useState("Timotius Vivaldi G.");
  const [level] = useState(1);
  const [currentExp] = useState(200);
  const [maxExp] = useState(500);
  const { email } = useAuth();

  useEffect(() => { setProfileName(email as string); });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrichat</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <Text style={styles.profileName}>{profileName}</Text>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Lvl {level}</Text>
            <View style={styles.expBar}>
              <View style={[styles.expProgress, { width: `${(currentExp/maxExp)*100}%` }]} />
              <Text style={styles.expText}>EXP    {currentExp}/{maxExp}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Badge</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>40</Text>
            <Text style={styles.statLabel}>Complete Task</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2000</Text>
            <Text style={styles.statLabel}>Point</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Challenges</Text>
        
        {[
          { name: "Jalan 5000 Langkah", exp: 50, progress: 38 },
          { name: "Minum 8 Gelas Air", exp: 30, progress: 45 },
          { name: "Tidur 8 Jam", exp: 75, progress: 28 }
        ].map((challenge, index) => (
          <View key={index} style={styles.challengeCard}>
            <Text style={styles.challengeTitle}>{challenge.name}</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${challenge.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{challenge.progress}% (+{challenge.exp} EXP)</Text>
            </View>
          </View>
        ))}

        <Link href="/(leaderboard)/leaderboard" asChild>
          <TouchableOpacity style={styles.leaderboardButton}>
            <Text style={styles.leaderboardButtonText}>Lihat Leaderboard</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: { color: "#FFA500", fontSize: 24, fontWeight: "bold" },
  time: { color: "#333", fontSize: 16 },
  contentContainer: { paddingHorizontal: 16 },
  profileSection: { marginTop: 20 },
  profileName: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  levelContainer: { marginTop: 16 },
  levelText: { color: "#FFA500", fontSize: 18, marginBottom: 8 },
  expBar: {
    backgroundColor: "#333",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  expProgress: { backgroundColor: "#4CAF50", height: "100%" },
  expText: {
    position: "absolute",
    right: 10,
    color: "#fff",
    top: 2,
    fontSize: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 20,
  },
  statItem: { alignItems: "center" },
  statNumber: { color: "#FFA500", fontSize: 24, fontWeight: "bold" },
  statLabel: { color: "#fff", fontSize: 12, marginTop: 4 },
  sectionTitle: { color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 24, marginBottom: 16 },
  challengeCard: {
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  challengeTitle: { color: "#fff", fontSize: 16, marginBottom: 8 },
  progressContainer: { flexDirection: "row", alignItems: "center" },
  progressBar: { flex: 1, height: 8, backgroundColor: "#333", borderRadius: 4, marginRight: 8, overflow: "hidden" },
  progressFill: { backgroundColor: "#4CAF50", height: "100%" },
  progressText: { color: "#fff", fontSize: 14 },
  leaderboardButton: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    padding: 16,
    marginTop: 24,
    alignItems: "center",
  },
  leaderboardButtonText: { color: "#000", fontWeight: "bold" },
});