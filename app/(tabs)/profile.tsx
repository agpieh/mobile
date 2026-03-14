import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../context/AppContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AppContext);

  const handleSignOut = () => {
    // 1. Cập nhật state toàn cục thành Chưa đăng nhập
    setIsLoggedIn(false); 
    // 2. Trở về Auth Stack (Màn hình SignIn)
    router.replace('/'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>
      
      {/* Nút Sign Out theo yêu cầu slide */}
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out (Đăng xuất)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  button: { backgroundColor: '#FF3B30', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});