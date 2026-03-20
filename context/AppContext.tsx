import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext<any>(null);

const LOGIN_KEY = 'LOGIN_STATUS';
const EMAIL_KEY = 'USER_EMAIL'; // Thêm key để lưu email

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // Biến lưu email
  const [isRestoring, setIsRestoring] = useState(true); 

  useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem(LOGIN_KEY);
        const storedEmail = await AsyncStorage.getItem(EMAIL_KEY); // Đọc email từ bộ nhớ
        
        if (storedState !== null) {
          setIsLoggedIn(JSON.parse(storedState));
        }
        if (storedEmail !== null) {
          setUserEmail(storedEmail);
        }
      } catch (e) {
        console.error("Lỗi đọc bộ nhớ", e);
      } finally {
        setIsRestoring(false);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    if (!isRestoring) { 
      const saveState = async () => {
        try {
          await AsyncStorage.setItem(LOGIN_KEY, JSON.stringify(isLoggedIn));
          // Nếu đăng nhập thì lưu email, đăng xuất thì xóa đi
          if (isLoggedIn) {
            await AsyncStorage.setItem(EMAIL_KEY, userEmail);
          } else {
            await AsyncStorage.removeItem(EMAIL_KEY);
            setUserEmail('');
          }
        } catch (e) {
          console.error("Lỗi lưu bộ nhớ", e);
        }
      };
      saveState();
    }
  }, [isLoggedIn, userEmail, isRestoring]);

  return (
    // Cung cấp thêm userEmail và setUserEmail cho toàn app
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, isRestoring }}>
      {children}
    </AppContext.Provider>
  );
};