import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

const weeklyData = {
  period: "18-24 Mar 2024",
  totals: {
    calories: { consumed: 10560, target: 12000 },
    protein: { consumed: 432, target: 480 },
    carbs: { consumed: 1280, target: 1400 },
    fat: { consumed: 360, target: 400 },
    sugar: { consumed: 210, target: 105 }
  },
  insights: [
    "🍗 Protein 90% tercapai - Pertahankan!",
    "🍚 35% kalori dari karbohidrat olahan",
    "🥤 Konsumsi gula 2x lipat rekomendasi",
    "🥦 Serat 83% - Tambah sayuran hijau"
  ]
};

const monthlyData = {
  period: "Mar 2024",
  totals: {
    calories: { consumed: 43600, target: 43400 },
    protein: { consumed: 1824, target: 1920 },
    carbs: { consumed: 5440, target: 5600 },
    fat: { consumed: 1620, target: 1600 },
    sugar: { consumed: 890, target: 420 }
  },
  insights: [
    "📉 Defisit kalori 200kcal total",
    "🍗 Protein stabil 88g/hari",
    "🚫 22 hari konsumsi gula >50g",
    "🥑 45% lemak dari sumber sehat"
  ]
};

export default function EvaluationScreen() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");
  const data = activeTab === "weekly" ? weeklyData : monthlyData;

  const ProgressBar = ({ consumed, target }: { consumed: number; target: number }) => {
    const progress = Math.min((consumed / target) * 100, 100);
    return (
      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nutrichat</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
          onPress={() => setActiveTab('weekly')}
        >
          <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>Mingguan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
          onPress={() => setActiveTab('monthly')}
        >
          <Text style={[styles.tabText, activeTab === 'monthly' && styles.activeTabText]}>Bulanan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {/* Nutrition Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>{data.period}</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.round(data.totals.calories.consumed/7)}</Text>
              <Text style={styles.statLabel}>Kalori/hari</Text>
              <ProgressBar consumed={data.totals.calories.consumed} target={data.totals.calories.target} />
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#4D96FF' }]}>{data.totals.protein.consumed}g</Text>
              <Text style={styles.statLabel}>Protein</Text>
              <ProgressBar consumed={data.totals.protein.consumed} target={data.totals.protein.target} />
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#6C5CE7' }]}>{data.totals.carbs.consumed}g</Text>
              <Text style={styles.statLabel}>Karbohidrat</Text>
              <ProgressBar consumed={data.totals.carbs.consumed} target={data.totals.carbs.target} />
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#FFD93D' }]}>{data.totals.fat.consumed}g</Text>
              <Text style={styles.statLabel}>Lemak</Text>
              <ProgressBar consumed={data.totals.fat.consumed} target={data.totals.fat.target} />
            </View>
          </View>
        </View>

        {/* Health Insights */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Analisis Kesehatan</Text>
          
          <View style={styles.healthMetric}>
            <Text style={styles.metricLabel}>🚨 Asupan Gula</Text>
            <Text style={styles.metricValue}>{data.totals.sugar.consumed}g 
              <Text style={styles.metricSubtext}> ({Math.round(data.totals.sugar.consumed/data.totals.sugar.target*100)}% target)</Text>
            </Text>
          </View>
          
          <View style={styles.healthMetric}>
            <Text style={styles.metricLabel}>📊 Trend Kalori</Text>
            <Text style={styles.metricValue}>
              {activeTab === 'weekly' ? '↓8% dari minggu lalu' : '→ Stabil 3 bulan terakhir'}
            </Text>
          </View>
          
          <View style={styles.healthMetric}>
            <Text style={styles.metricLabel}>🥦 Variasi Makanan</Text>
            <Text style={styles.metricValue}>
              {activeTab === 'weekly' ? '32 jenis bahan' : '89 jenis bahan'}
            </Text>
          </View>
        </View>

        {/* Nutrition Insights */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Insight Nutrisi</Text>
          {data.insights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <Text style={styles.insightText}>{insight}</Text>
            </View>
          ))}
        </View>
      </View>
      <Link href="/(tabs)" style={styles.evalButton}>
        <Text style={styles.evalButtonText}>
          Back
        </Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    backgroundColor: "white",
    padding: 16,
    paddingTop: 50,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16
  },
  headerTitle: {
    color: "#FFA500",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left"
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: "#FFA500",
  },
  tabText: {
    textAlign: "center",
    color: "#888",
    fontWeight: "600",
    fontSize: 14,
  },
  activeTabText: {
    color: "black",
  },
  card: {
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    color: "#FFA500",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
  },
  statValue: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  statLabel: {
    color: "#888",
    fontSize: 12,
    marginBottom: 8,
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFA500",
    borderRadius: 2,
  },
  healthMetric: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  metricLabel: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
  },
  metricValue: {
    color: "#FFA500",
    fontSize: 16,
    fontWeight: "600",
  },
  metricSubtext: {
    color: "#888",
    fontSize: 12,
  },
  insightItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  insightText: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  evalButton: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    alignItems: "center"
  },
  evalButtonText: {
    color: "#FFA500",
    fontSize: 16,
    fontWeight: "600",
    textAlign:"center"
  },
});