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
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [numericInputValues, setNumericInputValues] = useState<Record<string, string>>({});
  const [textInputValues, setTextInputValues] = useState<Record<string, string>>({});
  const [multiInputValues, setMultiInputValues] = useState<Record<string, string[]>>({});

  const currentQuestion = assessmentQuestions[currentQuestionIndex];

  const handleAnswer = (value: string | number | string[]) => {
    if (!currentQuestion) return;
    
    let processedValue: any = value;
    
    // Ensure we're storing the right type of value based on question type
    if ((currentQuestion.type === "numeric" || currentQuestion.type === "text") && typeof value === "string") {
      processedValue = value.trim() === "" ? (currentQuestion.type === "numeric" ? "0" : "") : value;
    } else if (currentQuestion.multiInput && Array.isArray(value)) {
      processedValue = value.length > 0 ? value : [];
    }

    // Update answers in local state
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: processedValue,
    };
    setAnswers(newAnswers);
    
    // Update the global context
    const stringValue = Array.isArray(processedValue) 
      ? processedValue.join(", ") 
      : processedValue.toString();
    setAnswer(currentQuestion.id, stringValue);

    // Move to next question or finish
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Assessment completed
      router.push("/(tabs)");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const updateNumericValue = (value: string) => {
    if (!currentQuestion) return;
    setNumericInputValues(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const updateTextValue = (value: string) => {
    if (!currentQuestion) return;
    setTextInputValues(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const updateMultiTextValues = (values: string[]) => {
    if (!currentQuestion) return;
    setMultiInputValues(prev => ({
      ...prev,
      [currentQuestion.id]: values
    }));
  };

  if (!currentQuestion) return null;

  // Get the appropriate values based on the question type
  const numericValue = numericInputValues[currentQuestion.id] || "";
  const textValue = textInputValues[currentQuestion.id] || "";
  const multiTextValues = multiInputValues[currentQuestion.id] || [];

  // Determine input type
  const isNumericInput = currentQuestion.type === "numeric";
  const isTextInput = currentQuestion.type === "text" && !currentQuestion.multiInput;
  const isMultiTextInput = currentQuestion.multiInput === true;

  return (
    <View style={{ flex: 1 }}>
      <AssessmentQuestion
        title={currentQuestion.title}
        question={currentQuestion.question}
        options={currentQuestion.type === "options" ? currentQuestion.options : []}
        isNumericInput={isNumericInput}
        numericValue={numericValue}
        setNumericValue={updateNumericValue}
        isTextInput={isTextInput}
        textValue={textValue}
        setTextValue={updateTextValue}
        isMultiTextInput={isMultiTextInput}
        multiTextValues={multiTextValues}
        setMultiTextValues={updateMultiTextValues}
        placeholder={currentQuestion.placeholder || "Enter value"}
        onNext={handleAnswer}
        onBack={handleBack}
        showBottomTabs={true}
        currentStep={currentQuestionIndex + 1}
        totalSteps={assessmentQuestions.length}
      />
    </View>
  );
}