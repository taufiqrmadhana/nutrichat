import React from 'react';
import { Stack } from 'expo-router';
import { AssessmentProvider } from '../../context/AssessmentContext';

export default function Layout() {
  return (
    <AssessmentProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="results" />
      </Stack>
    </AssessmentProvider>
  );
}