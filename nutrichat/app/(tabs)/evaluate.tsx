import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export default function EvaluatePage() {
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("weekly")}
          style={[styles.toggleButton, activeTab === "weekly" && styles.activeButton]}
        >
          <Text style={styles.buttonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("monthly")}
          style={[styles.toggleButton, activeTab === "monthly" && styles.activeButton]}
        >
          <Text style={styles.buttonText}>Monthly</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Evaluasi Mingguan</Text>
      <Text style={styles.subtitle}>15-21 Oct 24</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Summary</Text>
        <Text style={styles.cardText}>
          This week you had 100% more activities and 5% more completion rate than last week. Great!
        </Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.highlightedText}>18 hr 20 min</Text>
          <Text style={styles.highlightedText}>53%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Activity</Text>
        <Text style={styles.cardText}>This week you completed 4 kinds of activities</Text>

        <View style={styles.activityContainer}>
          {[
            { name: "Olahraga", percent: 70, time: "6 hr 40 min" },
            { name: "Belajar", percent: 15, time: "1 hr 15 min" },
            { name: "Membaca", percent: 35, time: "3 hr 30 min" },
            { name: "Main", percent: 28, time: "6 hr" },
          ].map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityHeader}>
                <Text style={styles.text}>{activity.name}</Text>
                <Text style={styles.grayText}>{activity.time}</Text>
              </View>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBar, { width: `${activity.percent}%` }]} />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", paddingHorizontal: 16, paddingVertical: 24 },
  toggleContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 16 },
  toggleButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginHorizontal: 8, backgroundColor: "#444" },
  activeButton: { backgroundColor: "#ff7300" },
  buttonText: { color: "white", fontWeight: "bold" },
  title: { color: "white", textAlign: "center", fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "#aaa", textAlign: "center", marginTop: 4 },
  card: { backgroundColor: "#222", padding: 16, marginTop: 16, borderRadius: 8 },
  cardTitle: { color: "white", fontWeight: "bold", fontSize: 18 },
  cardText: { color: "#aaa", fontSize: 14, marginTop: 4 },
  summaryContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  highlightedText: { color: "#ff7300", fontSize: 20, fontWeight: "bold" },
  activityContainer: { marginTop: 12 },
  activityItem: { marginBottom: 12 },
  activityHeader: { flexDirection: "row", justifyContent: "space-between" },
  text: { color: "white" },
  grayText: { color: "#aaa" },
  progressBarBackground: { width: "100%", height: 8, backgroundColor: "#444", borderRadius: 4, marginTop: 4 },
  progressBar: { height: 8, backgroundColor: "#ff7300", borderRadius: 4 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  button: { backgroundColor: "#333", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
});
