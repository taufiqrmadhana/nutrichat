import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CommunityPage() {
  const router = useRouter();
  const [profileName, setProfileName] = useState("Timotius Vivaldi Gobo.");
  const [profilePic, setProfilePic] = useState(require("@/assets/image2.png"));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrichat</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <Image source={profilePic} style={styles.profileImage} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{profileName}</Text>
            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>Level 3</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBackground}>
                  <View style={[styles.progressFill, { width: "60%" }]} />
                </View>
                <Text style={styles.progressText}>60/100</Text>
              </View>
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
            { 
              name: "Active Tribe", 
              members: "180+",
              image: "https://www.datocms-assets.com/159868/1744397101-activetribe.jpg" 
            },
            { 
              name: "Run Squad", 
              members: "100+",
              image: "https://www.datocms-assets.com/159868/1744397101-20190723-running.jpg" 
            },
            { 
              name: "Healthy Eaters", 
              members: "250+",
              image: "https://www.datocms-assets.com/159868/1744397101-secrets-healthy-eating-01.webp" 
            },
            { 
              name: "Yoga Lovers", 
              members: "150+",
              image: "https://www.datocms-assets.com/159868/1744397101-mengenal-hatha-yoga-dasar-dari-segala-jenis-yoga.jpg" 
            },
            { 
              name: "Fit Fam", 
              members: "300+",
              image: "https://www.datocms-assets.com/159868/1744397101-01j2x4xfeyggfye9q88916bdrg.jpg" 
            },
            { 
              name: "Cycling Club", 
              members: "120+",
              image: "https://www.datocms-assets.com/159868/1744397110-find-an-event-1.jpeg" 
            },
          ].map((community, index) => (
            <View key={index} style={styles.communityCard}>
              <Image source={{ uri: community.image }} style={styles.communityImage} />
              <View style={styles.communityInfo}>
                <Text style={styles.communityName}>{community.name}</Text>
                <Text style={styles.communityMembers}>{community.members} members</Text>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View All Communities</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "white",
    padding: 16,
    paddingTop: 50,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentContainer: { paddingHorizontal: 16 },
  profileTextContainer: { marginLeft: 16 },
  title: { color: "#FFA500", fontSize: 24, fontWeight: "bold" },
  profileSection: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  profileImage: { width: 56, height: 56, borderRadius: 28 },
  profileName: { color: "white", fontSize: 18, fontWeight: "600" },
  levelContainer: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  levelText: { color: "#ff7300", marginRight: 8, fontSize: 14 },
  progressBarContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
  progressBackground: { flex: 1, height: 8, backgroundColor: "#333", borderRadius: 4, marginRight: 8 },
  progressFill: { height: "100%", backgroundColor: "#ff7300", borderRadius: 4 },
  progressText: { color: "#888", fontSize: 12 },
  searchBarContainer: { marginTop: 24 },
  searchBar: { backgroundColor: "#333", color: "white", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  dailyQuoteContainer: { marginTop: 24, backgroundColor: "#222", padding: 16, borderRadius: 12 },
  dailyQuoteTitle: { color: "white", fontWeight: "600" },
  dailyQuoteText: { color: "#888", fontSize: 14, marginTop: 4 },
  communityTitle: { color: "white", fontSize: 18, fontWeight: "600", marginTop: 24 },
  communityList: { marginTop: 16, paddingBottom: 20 },
  communityCard: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  communityImage: { width: 80, height: 80, borderRadius: 8, resizeMode: 'contain' },
  communityInfo: { marginLeft: 16, flex: 1 },
  communityName: { color: "white", fontSize: 18, fontWeight: "600" },
  communityMembers: { color: "#888", fontSize: 12 },
  joinButton: { backgroundColor: "#ff7300", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  joinButtonText: { color: "white", fontWeight: "600" },
  viewAllButton: {
    borderWidth: 1,
    borderColor: "#ff7300",
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  viewAllButtonText: {
    color: "#ff7300",
    fontWeight: "600",
    fontSize: 16
  },
});