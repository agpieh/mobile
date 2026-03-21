import { Tabs } from 'expo-router';
import React from 'react';
// Quan trọng: Import Image và View từ react-native
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#6FC1E6', // Màu xanh khi được chọn
      tabBarInactiveTintColor: '#C4C4C4', // Màu xám khi bỏ chọn
      headerShown: false,
      tabBarShowLabel: false, // Ẩn chữ theo đúng thiết kế
      tabBarStyle: { height: 80, paddingBottom: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: '#FFF', position: 'absolute' }
    }}>
      
      {/* 1. Tab Home */}
      <Tabs.Screen 
        name="home" 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/Group 152.png')} 
              // tintColor giúp ảnh tự động đổi màu xanh/xám khi bấm
              style={{ width: 24, height: 24, tintColor: focused ? '#6FC1E6' : '#C4C4C4' }} 
              resizeMode="contain"
            />
          ) 
        }} 
      />

      {/* 2. Tab Notifications (Cái chuông) */}
      <Tabs.Screen 
        name="notifications" 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              // 👉 SỬA DÒNG DƯỚI: Thay tên ảnh cái chuông của bạn vào đây
              source={require('../../assets/images/Group 153.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#6FC1E6' : '#C4C4C4' }} 
              resizeMode="contain"
            />
          ) 
        }} 
      />
      
      {/* 3. Tab Scan (Nút to ở giữa) */}
      <Tabs.Screen 
        name="scan" 
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <Image 
              // 👉 SỬA DÒNG DƯỚI: Thay tên ảnh cái chuông của bạn vào đây
              source={require('../../assets/images/Vector.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#6FC1E6' : '#C4C4C4' }} 
              resizeMode="contain"
            />
          )
        }} 
      />
      
      {/* 4. Tab History (Lịch sử) */}
      <Tabs.Screen 
        name="history" 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={ require('../../assets/images/Group 154.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#6FC1E6' : '#C4C4C4' }} 
              resizeMode="contain"
            />
          ) 
        }} 
      />

      {/* 5. Tab Cart (Giỏ hàng) */}
      <Tabs.Screen 
        name="cart" 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              // 👉 SỬA DÒNG DƯỚI: Thay tên ảnh giỏ hàng của bạn vào đây
              source={require('../../assets/images/Group 161.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#6FC1E6' : '#C4C4C4' }} 
              resizeMode="contain"
            />
          ) 
        }} 
      />

    </Tabs>
  );
}