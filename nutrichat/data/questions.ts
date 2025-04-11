// questions.ts
export const assessmentQuestions = [
    {
      id: "age",
      title: "Physical Health Assessment",
      question: "What is your age?",
      type: "numeric",
    },
    {
      id: "height",
      title: "Physical Health Assessment",
      question: "What is your height?",
      type: "numeric",
    },
    {
      id: "currentWeight",
      title: "Physical Health Assessment",
      question: "What is your current weight?",
      type: "numeric",
    },
    {
      id: "activityLevel",
      title: "Physical Health Assessment",
      question: "What is your activity level?",
      type: "options",
      options: [
        { label: "Sedentary", value: "sedentary" },
        { label: "Lightly Active", value: "lightly_active" },
        { label: "Moderately Active", value: "moderately_active" },
        { label: "Very Active", value: "very_active" },
        { label: "Extra Active", value: "extra_active" },
      ],
    },
    {
      id: "goals",
      title: "Physical Health Assessment",
      question: "What is your fitness goal?",
      type: "options",
      options: [
        { label: "Lose Weight", value: "lose_weight" },
        { label: "Maintain Weight", value: "maintain_weight" },
        { label: "Gain Weight", value: "gain_weight" },
        { label: "Build Muscle", value: "build_muscle" },
      ],
    },
    // Add more questions as needed
  ];