import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { AppContext, AppProvider } from '../context/AppContext';

// Tạo một Component con để có thể gọi được useContext và useRouter
function RootNavigation() {
  const { isLoggedIn } = useContext(AppContext);
  const segments = useSegments(); // Theo dõi xem người dùng đang ở nhóm đường dẫn nào
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra xem có đang ở trong nhóm Main Stack (các tabs) hay không
    const inTabsGroup = segments[0] === '(tabs)';

    if (!isLoggedIn && inTabsGroup) {
      // 1. Chưa đăng nhập mà đòi vào trong Tab -> Đá ra ngoài màn hình Đăng nhập
      router.replace('/');
    } else if (isLoggedIn && !inTabsGroup) {
      // 2. Đã đăng nhập rồi mà đang đứng ở ngoài -> Đưa thẳng vào màn hình Explorer/Home
      router.replace('/(tabs)/home'); 
    }
  }, [isLoggedIn, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

// Layout gốc bọc Provider ra ngoài cùng
export default function RootLayout() {
  return (
    <AppProvider>
      <RootNavigation />
    </AppProvider>
  );
}