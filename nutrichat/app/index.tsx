import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { useFocusEffect } from "expo-router";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    title: "Take Step Towards An Active Life",
    description:
      "Track the nutritional information in your foods and create a balance in your diet, helping you achieve health goals.",
    image: require("../assets/preapp1.png"),
  },
  {
    title: "Track, Train, Thrive",
    description:
      "Keep track of your progress with healthy meal suggestions based on your goals. Design your diet plan for maximum results.",
    image: require("../assets/preapp2.png"),
  },
  {
    title: "Let's get started",
    description:
      "Begin your health journey right now. Talk to our smart assistant who will guide you towards better health outcomes.",
    image: require("../assets/preapp3.png"),
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(0);
    }, [])
  );

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleReady = () => {
    try {
      router.push("/(auth)/login");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Animated.View
        key={currentPage}
        entering={FadeIn.duration(500)}
        style={styles.page}
      >
        <Image
          source={onboardingData[currentPage].image}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{onboardingData[currentPage].title}</Text>
          <Text style={styles.description}>
            {onboardingData[currentPage].description}
          </Text>

          <View style={styles.paginationContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentPage && styles.activeDot,
                ]}
              />
            ))}
          </View>

          {currentPage < onboardingData.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleReady}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.brandText}>NutriChat</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  page: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width,
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    color: "#FF7F27",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555555",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FF7F27",
    width: 20,
  },
  button: {
    backgroundColor: "#FF7F27",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  brandText: {
    color: "#FF7F27",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});