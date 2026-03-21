import { Stack } from 'expo-router';
import React from 'react';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Chỉ load thư mục tabs, bỏ qua mọi màn hình khác */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CartProvider>
  );
}