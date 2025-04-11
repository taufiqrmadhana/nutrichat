import React from 'react';
import { useFonts } from 'expo-font';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AssessmentFlow from '../../components/AssessmentFlow';

export default function IndexScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../../assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter_18pt-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <AssessmentFlow />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
