import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CommunityPage() {
  const router = useRouter();

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
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Timotius Vivaldi G.</Text>
          <Text style={styles.profileLevel}>Lvl 1</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
            <Text style={styles.progressText}>200/500</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="🔍 Search" placeholderTextColor="#aaa" />
      </View>

      <View style={styles.dailyQuoteContainer}>
        <Text style={styles.dailyQuoteTitle}>Your Daily Quote:</Text>
        <Text style={styles.dailyQuoteText}>
          "Small steps every day lead to big changes. Start today and let your journey inspire others."
        </Text>
      </View>

      <Text style={styles.communityTitle}>Community recommendations</Text>
      <View style={styles.communityList}>
        {[
          { name: "Active Tribe", members: "180+" },
          { name: "Run Squad", members: "100+" },
        ].map((community, index) => (
          <View key={index} style={styles.communityCard}>
            <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.communityImage} />
            <View style={styles.communityInfo}>
              <Text style={styles.communityName}>{community.name}</Text>
              <Text style={styles.communityMembers}>{community.members} members</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", paddingHorizontal: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  title: { color: "#ff7300", fontSize: 24, fontWeight: "bold" },
  menuButton: { width: 32, height: 32, backgroundColor: "#333", borderRadius: 8, alignItems: "center", justifyContent: "center" },
  menuText: { color: "white", fontSize: 18 },
  profileSection: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  profileImage: { width: 56, height: 56, borderRadius: 28 },
  profileInfo: { marginLeft: 16 },
  profileName: { color: "white", fontSize: 18, fontWeight: "600" },
  profileLevel: { color: "#888" },
  progressBarContainer: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  progressBar: { height: 8, width: 112, backgroundColor: "#ff7300", borderRadius: 4 },
  progressText: { marginLeft: 8, color: "#888", fontSize: 12 },
  searchBarContainer: { marginTop: 24 },
  searchBar: { backgroundColor: "#333", color: "white", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  dailyQuoteContainer: { marginTop: 24, backgroundColor: "#222", padding: 16, borderRadius: 12 },
  dailyQuoteTitle: { color: "white", fontWeight: "600" },
  dailyQuoteText: { color: "#888", fontSize: 14, marginTop: 4 },
  communityTitle: { color: "white", fontSize: 18, fontWeight: "600", marginTop: 24 },
  communityList: { marginTop: 16 },
  communityCard: { backgroundColor: "#333", padding: 16, borderRadius: 12, flexDirection: "row", alignItems: "center", marginBottom: 12 },
  communityImage: { width: 64, height: 64, borderRadius: 8 },
  communityInfo: { marginLeft: 16, flex: 1 },
  communityName: { color: "white", fontSize: 18, fontWeight: "600" },
  communityMembers: { color: "#888", fontSize: 12 },
  joinButton: { backgroundColor: "#ff7300", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  joinButtonText: { color: "white", fontWeight: "600" },
});
