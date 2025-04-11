// components/ResultsScreen.tsx
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAssessment } from "../context/AssessmentContext";

export default function ResultsScreen() {
  const router = useRouter();
  const { assessmentAnswers, getAllAnswers } = useAssessment();
  const allAnswersArray = getAllAnswers();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assessment Results</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Your Assessment Information</Text>
        
        {Object.entries(assessmentAnswers).map(([key, value]) => (
          <View key={key} style={styles.resultItem}>
            <Text style={styles.resultKey}>{key}:</Text>
            <Text style={styles.resultValue}>{value}</Text>
          </View>
        ))}
        
        <Text style={styles.sectionTitle}>All Answers:</Text>
        {allAnswersArray.map((answer, index) => (
          <Text key={index} style={styles.answerText}>
            {index + 1}. {answer}
          </Text>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    fontFamily: 'Inter-Bold',
  },
  resultItem: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
  },
  resultKey: {
    color: "#AAAAAA",
    fontSize: 16,
    width: 130,
    fontFamily: 'Inter-Regular',
  },
  resultValue: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    fontFamily: 'Inter-Regular',
  },
  answerText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'Inter-Regular',
  },
  buttonContainer: {
    padding: 20,
  },
  doneButton: {
    backgroundColor: "#FF7F27",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Inter-Bold',
  },
});