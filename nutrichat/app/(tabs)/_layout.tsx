import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';
import { HapticTab } from '@/components/HapticTab';

const TabIcon = ({ source, tintColor }: { source: any; tintColor: string }) => (
  <Image
    source={source}
    style={{ width: 26, height: 26, tintColor }}
    resizeMode="contain"
  />
);

export default function TabLayout() {
  return (
    <View style={{ backgroundColor: '#000', flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ff7f00',
          tabBarInactiveTintColor: '#fff',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: '#000',
            height: 70,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 10,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <TabIcon source={require('@/assets/icons/home.png')} tintColor={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Community',
            tabBarIcon: ({ color }) => (
              <TabIcon source={require('@/assets/icons/community.png')} tintColor={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color }) => (
              <TabIcon source={require('@/assets/icons/chat.png')} tintColor={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="feeds"
          options={{
            title: 'Feeds',
            tabBarIcon: ({ color }) => (
              <TabIcon source={require('@/assets/icons/feeds.png')} tintColor={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="challenge"
          options={{
            title: 'Challenge',
            tabBarIcon: ({ color }) => (
              <TabIcon source={require('@/assets/icons/challenge.png')} tintColor={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
