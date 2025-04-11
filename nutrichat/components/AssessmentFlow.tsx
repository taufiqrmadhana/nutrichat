// components/AssessmentFlow.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import AssessmentQuestion from "./AssessmentQuestion";
import { assessmentQuestions } from "../data/questions";
import { useAssessment } from "../context/AssessmentContext";

export default function AssessmentFlow() {
  const router = useRouter();
  const { setAnswer } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  
  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = {
      ...answers,
      [questionId]: value,
    };
    
    setAnswers(newAnswers);
    setAnswer(questionId, value);
    
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      router.push('/(results)');
    }
  };
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    } else {
      // Handle back on first question (if needed)
    }
  };
  
  if (!currentQuestion) return null;
  
  return (
    <View style={{ flex: 1 }}>
      <AssessmentQuestion
        title={currentQuestion.title}
        question={currentQuestion.question}
        options={currentQuestion.type === "options" ? currentQuestion.options : []}
        isNumericInput={currentQuestion.type === "numeric"}
        numericValue={answers[currentQuestion.id] || ""}
        setNumericValue={(value) => 
          setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
        }
        placeholder={currentQuestion.placeholder || "Enter value"}
        onNext={(value) => handleAnswer(
          currentQuestion.id, 
          typeof value === "string" ? value : value?.toString() || ""
        )}
        onBack={handleBack}
        showBottomTabs={true}
        currentStep={currentQuestionIndex + 1}
        totalSteps={assessmentQuestions.length}
      />
    </View>
  );
}