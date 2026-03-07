import React, { useState } from 'react';
import { Alert, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInValidationScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  // Hàm kiểm tra định dạng số điện thoại
  const validatePhoneNumber = (phone) => {
    // Biểu thức chính quy (Regex): Bắt đầu bằng số 0 và theo sau là đúng 9 chữ số (tổng 10 số)
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  // Hàm xử lý khi bấm nút Tiếp tục
  const handleContinue = () => {
    if (validatePhoneNumber(phoneNumber)) {
      Alert.alert("Thành công", "Số điện thoại hợp lệ!");
      // Ở đây sau này bạn có thể cho chuyển trang: router.push('/home')
    } else {
      Alert.alert(
        "Lỗi định dạng", 
        "Số điện thoại không hợp lệ! Vui lòng nhập số có 10 chữ số và bắt đầu bằng số 0."
      );
    }
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
          maxLength={10} // Chặn người dùng nhập quá 10 số
        />

        <TouchableOpacity 
          disabled={phoneNumber.length === 0} 
          onPress={handleContinue} 
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
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});