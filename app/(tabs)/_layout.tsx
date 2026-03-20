import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={({ route }) => ({
        // Cấu hình màu sắc chuẩn theo Snack của thầy
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tabs.Screen
        name="home" 
        options={{
          title: 'Explorer', 
          tabBarIcon: ({ color, size }) => (
            // Icon la bàn cho Tab Explorer
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile" 
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            // Icon người cho Tab Account
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}