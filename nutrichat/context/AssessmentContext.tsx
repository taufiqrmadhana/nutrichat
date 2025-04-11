import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AssessmentContextType {
  assessmentAnswers: Record<string, string>;
  setAnswer: (key: string, value: string) => void;
  getAllAnswers: () => string[];
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});

  const setAnswer = (key: string, value: string) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const getAllAnswers = (): string[] => {
    return Object.values(assessmentAnswers);
  };

  return (
    <AssessmentContext.Provider value={{ assessmentAnswers, setAnswer, getAllAnswers }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}