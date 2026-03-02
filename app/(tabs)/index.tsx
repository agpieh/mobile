import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// 1. Import useRouter từ expo-router
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // 2. Khởi tạo router
  const router = useRouter(); 

  // 3. Viết hàm xử lý khi bấm nút
  const handleLogin = () => {
    // router.push('/tên_file') sẽ chuyển bạn đến file đó trong thư mục app
    // Ở đây ta chuyển đến file app/notifications.tsx
    router.push('/notifications'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        
        <Text style={styles.title}>Đăng nhập</Text>
        <View style={styles.separator} />
        <Text style={styles.subtitle}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholderTextColor="#A0A0A0"
        />

        {/* 4. Gắn hàm handleLogin vào sự kiện onPress của nút */}
        <TouchableOpacity 
          disabled={phoneNumber.length === 0} 
          onPress={handleLogin} // <--- Thêm dòng này
          style={[
            styles.button,
            { backgroundColor: phoneNumber.length > 0 ? '#007AFF' : '#F5F5F5' }
          ]}
        >
          <Text style={[
            styles.buttonText,
            { color: phoneNumber.length > 0 ? '#FFFFFF' : '#A0A0A0' }
          ]}>
            Tiếp tục
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// ... (Phần const styles = StyleSheet.create({...}) giữ nguyên như cũ)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    lineHeight: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 40,
    color: '#000',
  },
  button: {
    backgroundColor: '#F5F5F5', // Màu xám nhạt khi chưa nhập gì (theo style OneHousing)
    // Hoặc dùng màu xanh nếu muốn: backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A0A0A0', // Màu chữ nhạt
  },
});