import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Option {
  label: string;
  value: string | number;
}

interface AssessmentQuestionProps {
  title: string;
  question: string;
  options?: Option[];
  isNumericInput?: boolean;
  numericValue?: string;
  setNumericValue?: (value: string) => void;
  placeholder?: string;
  showBottomTabs?: boolean;
  onNext: (value?: string | number) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function AssessmentQuestion({
  title,
  question,
  options = [],
  isNumericInput = false,
  numericValue = "",
  setNumericValue,
  placeholder = "Enter value",
  showBottomTabs = true,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: AssessmentQuestionProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>{question}</Text>

        {isNumericInput ? (
          <View style={styles.numericInputContainer}>
            <TextInput
              style={styles.numericInput}
              value={numericValue}
              onChangeText={setNumericValue}
              keyboardType="numeric"
              placeholder={placeholder}
              placeholderTextColor="#777"
            />
          </View>
        ) : (
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => onNext(option.value)}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {isNumericInput && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => onNext(numericValue)}
          >
            <Text style={styles.continueButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {showBottomTabs && (
        <View style={styles.tabIndicator}>
          <View style={styles.tabsContainer}>
            {Array.from({ length: totalSteps }).map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.tab, 
                  index + 1 === currentStep ? styles.activeTab : {}
                ]} 
              />
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 40,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  question: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: 'Inter-Bold',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontFamily: 'Inter-Regular',
  },
  numericInputContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  numericInput: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 15,
    width: "70%",
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    fontFamily: 'Inter-Regular',
  },
  bottomButtonContainer: {
    padding: 20,
  },
  continueButton: {
    backgroundColor: "#FF7F27",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Inter-Bold',
  },
  tabIndicator: {
    paddingBottom: 20,
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    padding: 10,
  },
  tab: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3A3A3A",
    marginHorizontal: 3,
  },
  activeTab: {
    backgroundColor: "#FF7F27",
  },
});
