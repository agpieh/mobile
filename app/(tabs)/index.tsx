import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';

export default function HomeScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Để tránh thanh trạng thái đè lên nội dung trên Android */}
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Tiêu đề lớn */}
        <Text style={styles.title}>Đăng nhập</Text>

        <View style={styles.separator} />

        {/* Tiêu đề phụ */}
        <Text style={styles.subtitle}>Nhập số điện thoại</Text>

        {/* Mô tả */}
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        {/* Ô nhập liệu */}
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholderTextColor="#A0A0A0"
        />

        {/* Nút Tiếp tục */}
        {/* Nút Tiếp tục - Code mới */}
        <TouchableOpacity 
          // Nếu phoneNumber có dữ liệu thì disabled = false (bấm được), ngược lại là true
          disabled={phoneNumber.length === 0} 
          style={[
            styles.button,
            // Logic đổi màu nền: Có chữ -> Màu xanh, Không có chữ -> Màu xám nhạt
            { backgroundColor: phoneNumber.length > 0 ? '#007AFF' : '#F5F5F5' }
          ]}
        >
          <Text style={[
            styles.buttonText,
            // Logic đổi màu chữ: Có chữ -> Màu trắng, Không có chữ -> Màu xám đậm
            { color: phoneNumber.length > 0 ? '#FFFFFF' : '#A0A0A0' }
          ]}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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