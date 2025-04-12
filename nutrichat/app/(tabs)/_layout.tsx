import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
            tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Community',
            tabBarIcon: ({ color }) => <IconSymbol size={26} name="group" color={color} />,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color }) => <IconSymbol size={26} name="chat" color={color} />,
          }}
          />
        <Tabs.Screen
          name="feeds"
          options={{
            title: 'Feeds',
            tabBarIcon: ({ color }) => <IconSymbol size={26} name="newspaper" color={color} />,
          }}
        />
        <Tabs.Screen
          name="challenge"
          options={{
            title: 'Challenge',
            tabBarIcon: ({ color }) => <IconSymbol size={26} name="rosette" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}