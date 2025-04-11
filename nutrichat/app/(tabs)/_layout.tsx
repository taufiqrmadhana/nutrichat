import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          name="todo"
          options={{
            title: 'To do',
            tabBarIcon: ({ color }) => <IconSymbol size={26} name="arrow.uturn.down" color={color} />,
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Community',
            tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.3.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="tracker"
          options={{
            title: 'Tracker',
            tabBarIcon: ({ color }) => <IconSymbol size={26} name="checklist" color={color} />,
          }}
        />
        <Tabs.Screen
          name="evaluate"
          options={{
            title: 'Evaluate',
            tabBarIcon: ({ color }) => <IconSymbol size={26} name="rosette" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
