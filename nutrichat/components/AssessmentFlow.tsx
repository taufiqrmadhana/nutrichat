import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AssessmentQuestion from "./AssessmentQuestion";
import { assessmentQuestions } from "../data/questions";
import { useAssessment } from "../context/AssessmentContext";
import { useAuth } from "../context/AuthContext";
import { initializeUser } from "../utils/auth";

interface InitializationRequest {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  country: string;
  weight: number;
  height: number;
  food_allergies: string;
  daily_exercises: string;
  daily_activities: string;
  medical_record: string;
  weight_goal: number;
  general_goal: string;
}

export default function AssessmentFlow() {
  const router = useRouter();
  const { assessmentAnswers, setAnswer } = useAssessment();
  const { email } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentQuestion = assessmentQuestions[currentQuestionIndex];

  const mapAnswersToRequest = (): InitializationRequest => ({
    email: email || "",
    first_name: assessmentAnswers["first_name"]?.toString() || "",
    last_name: assessmentAnswers["last_name"]?.toString() || "",
    date_of_birth: assessmentAnswers["date_of_birth"]?.toString() || "",
    gender: assessmentAnswers["gender"]?.toString() || "",
    country: assessmentAnswers["country"]?.toString() || "",
    weight: parseFloat(assessmentAnswers["currentWeight"]?.toString() || "0"),
    height: parseFloat(assessmentAnswers["height"]?.toString() || "0"),
    food_allergies: assessmentAnswers["foodAllergies"]?.toString() || "",
    daily_exercises: assessmentAnswers["dailyExercise"]?.toString() || "",
    daily_activities: assessmentAnswers["activityLevel"]?.toString() || "",
    medical_record: assessmentAnswers["medicalRecords"]?.toString() || "",
    weight_goal: parseFloat(assessmentAnswers["targetWeight"]?.toString() || "0"),
    general_goal: assessmentAnswers["Goals"]?.toString() || "",
  });
  
  const handleSubmitAssessment = async () => {
    try {
      setLoading(true);
      await initializeUser(mapAnswersToRequest());
      router.push("/(tabs)");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Initialization failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (value?: string | number | string[]) => {
    if (!currentQuestion) return;
    const stringValue = Array.isArray(value) ? value.join(", ") : value?.toString();
    if (stringValue)
      setAnswer(currentQuestion.id, stringValue);
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (!currentQuestion) return null;

  return (
    <View style={styles.container}>
      <AssessmentQuestion
        title={currentQuestion.title}
        question={currentQuestion.question}
        options={currentQuestion.options}
        isNumericInput={currentQuestion.type === "numeric"}
        isTextInput={currentQuestion.type === "text"}
        isMultiTextInput={currentQuestion.type === "multi_text"}
        numericValue={currentQuestion.type === "numeric" ? assessmentAnswers[currentQuestion.id]?.toString() || "" : ""}
        setNumericValue={
          currentQuestion.type === "numeric"
            ? (val) => setAnswer(currentQuestion.id, val)
            : undefined
        }
        textValue={currentQuestion.type === "text" ? assessmentAnswers[currentQuestion.id]?.toString() || "" : ""}
        setTextValue={
          currentQuestion.type === "text"
            ? (val) => setAnswer(currentQuestion.id, val)
            : undefined
        }
        multiTextValues={
          currentQuestion.type === "multi_text"
            ? assessmentAnswers[currentQuestion.id]?.split(",").map((s: string) => s.trim()) || []
            : []
        }
        setMultiTextValues={
          currentQuestion.type === "multi_text"
            ? (vals) => setAnswer(currentQuestion.id, vals.join(", "))
            : undefined
        }
        placeholder={currentQuestion.placeholder}
        showBottomTabs={true}
        onNext={handleAnswer}
        onBack={handleBack}
        currentStep={currentQuestionIndex + 1}
        totalSteps={assessmentQuestions.length}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
