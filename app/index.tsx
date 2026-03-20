import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AppContext);

  const handleLogin = () => {
    if (email.includes('@') && password.length >= 6) {
      setIsLoggedIn(true); 
    } else {
      Alert.alert('Lỗi đăng nhập', 'Email phải hợp lệ và mật khẩu tối thiểu 6 ký tự.');
    }
  };

  // Hàm xử lý khi bấm nút Google/Facebook
  const handleSocialLogin = (provider: string) => {
    // Vì đây là bài tập UI/Flow, ta mô phỏng việc đăng nhập thành công luôn
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Text style={styles.title}>Đăng Nhập</Text>
        <Text style={styles.subtitle}>Vui lòng đăng nhập để tiếp tục</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email của bạn"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>

        {/* --- PHẦN THÊM MỚI: Dòng kẻ "Hoặc" --- */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Hoặc đăng nhập bằng</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* --- PHẦN THÊM MỚI: Nút Google & Facebook --- */}
        <View style={styles.socialContainer}>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: '#DB4437' }]} 
            onPress={() => handleSocialLogin('Google')}
          >
            <Ionicons name="logo-google" size={20} color="#FFF" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: '#4267B2' }]} 
            onPress={() => handleSocialLogin('Facebook')}
          >
            <Ionicons name="logo-facebook" size={20} color="#FFF" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={styles.linkText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.linkText}>Đăng ký tài khoản</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40, textAlign: 'center' },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', 
    borderRadius: 10, marginBottom: 20, paddingHorizontal: 15, height: 55 
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  button: { 
    backgroundColor: '#007AFF', borderRadius: 10, height: 55, 
    justifyContent: 'center', alignItems: 'center', marginTop: 10,
    shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  
  /* Style cho dải phân cách */
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  dividerText: { marginHorizontal: 10, color: '#666', fontSize: 14 },
  
  /* Style cho nút Social */
  socialContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  socialButton: { 
    flex: 1, flexDirection: 'row', height: 50, borderRadius: 10, 
    justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 
  },
  socialButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  
  footerLinks: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  linkText: { color: '#007AFF', fontSize: 14, fontWeight: '600' }
});