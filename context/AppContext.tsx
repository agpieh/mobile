import React, { createContext, useState } from 'react';

// 1. Tạo Context
export const AppContext = createContext<any>(null);

// 2. Tạo Provider để bọc ứng dụng và cung cấp state
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Biến toàn cục kiểm tra trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};