import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Import Context của Buổi 8
import { AppContext } from '../../context/AppContext';

export default function SignInScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AppContext);

  // Tính năng format số có khoảng cách (Buổi 6 & 7)
  const formatPhoneNumber = (text: string) => {
    const cleaned = ('' + text).replace(/\D/g, ''); 
    let formatted = '';
    if (cleaned.length > 0) formatted += cleaned.substring(0, 3);
    if (cleaned.length > 3) formatted += ' ' + cleaned.substring(3, 6);
    if (cleaned.length > 6) formatted += ' ' + cleaned.substring(6, 8);
    if (cleaned.length > 8) formatted += ' ' + cleaned.substring(8, 10);
    return formatted;
  };

  const handleChangeText = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);

    const cleanedLength = formatted.replace(/\D/g, '').length;
    if (cleanedLength > 0 && cleanedLength < 10) {
      setError('Số điện thoại không đúng định dạng.');
    } else {
      setError(''); 
    }
  };

  const handleLogin = () => {
    const cleanedLength = phoneNumber.replace(/\D/g, '').length;
    
    // Nếu nhập đúng 10 số và bắt đầu bằng số 0
    if (cleanedLength === 10 && phoneNumber.startsWith('0')) {
      setError('');
      // 1. Context API: Bật trạng thái đã đăng nhập (Buổi 8)
      setIsLoggedIn(true); 
      // 2. Chuyển sang màn hình bên trong
      router.replace('/home'); 
    } else {
      setError('Số điện thoại không đúng định dạng.');
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
          onPress={handleLogin} 
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
          
          </Text>
          <TouchableOpacity 
          disabled={phoneNumber.length === 0} 
          onPress={handleLogin} 
          style={[ /* style của nút Đăng nhập */ ]}
        >
          <Text style={{ color: '#080c04' }}>Đăng nhập</Text>
        </TouchableOpacity>

        {/* THÊM 2 NÚT NÀY VÀO DƯỚI NÚT ĐĂNG NHẬP */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={{ color: '#007AFF' }}>Đăng ký ngay   </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={{ color: '#007AFF' }}>      Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
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