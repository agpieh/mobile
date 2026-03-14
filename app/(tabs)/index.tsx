import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// 1. Import useRouter từ expo-router
import { useRouter } from 'expo-router';

export default function SignInAdvancedScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  
  // 2. Khởi tạo router
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      Alert.alert("Chào mừng", "Chào mừng bạn đến với ứng dụng!");
    }, 500); 
    return () => clearTimeout(timer); 
  }, []);

  const formatPhoneNumber = (text) => {
    const cleaned = ('' + text).replace(/\D/g, ''); 
    let formatted = '';
    
    if (cleaned.length > 0) formatted += cleaned.substring(0, 3);
    if (cleaned.length > 3) formatted += ' ' + cleaned.substring(3, 6);
    if (cleaned.length > 6) formatted += ' ' + cleaned.substring(6, 8);
    if (cleaned.length > 8) formatted += ' ' + cleaned.substring(8, 10);
    
    return formatted;
  };

  const handleChangeText = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);

    const cleanedLength = formatted.replace(/\D/g, '').length;
    if (cleanedLength > 0 && cleanedLength < 10) {
      setError('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
    } else {
      setError(''); 
    }
  };

  const handleContinue = () => {
    const cleanedLength = phoneNumber.replace(/\D/g, '').length;
    
    // 3. Nếu số hợp lệ -> Chuyển sang màn hình Home
    if (cleanedLength === 10 && phoneNumber.startsWith('0')) {
      setError('');
      // Dòng code điều hướng sang file app/home.tsx
      router.push('/home'); 
    } else {
      setError('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View style={styles.separator} />
        <Text style={styles.subtitle}>Nhập số điện thoại</Text>

        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={handleChangeText}
          placeholderTextColor="#A0A0A0"
          maxLength={13} 
        />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          disabled={phoneNumber.length === 0} 
          onPress={handleContinue} 
          style={[
            styles.button,
            { backgroundColor: phoneNumber.length > 0 ? '#007AFF' : '#F5F5F5' },
            { marginTop: error ? 15 : 40 } 
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
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  content: { paddingHorizontal: 20, paddingTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  separator: { height: 1, backgroundColor: '#E0E0E0', marginBottom: 30 },
  subtitle: { fontSize: 18, fontWeight: '500', color: '#000', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderBottomColor: '#E0E0E0', fontSize: 16, paddingVertical: 10, color: '#000' },
  inputError: { borderBottomColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginTop: 5 },
  button: { paddingVertical: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: '600' },
});