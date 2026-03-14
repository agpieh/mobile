import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function SignUpScreen() {
  const { setIsLoggedIn } = useContext(AppContext);
  const router = useRouter();

  const handleSignUp = () => {
    // Đăng ký thành công -> Đổi state -> Auth Guard tự động đẩy vào (tabs)
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Màn hình Đăng Ký (SignUp)</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Đăng ký & Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => router.back()}>
        <Text style={styles.linkText}>Quay lại Đăng nhập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: { backgroundColor: '#34C759', padding: 15, borderRadius: 8, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkButton: { marginTop: 20 },
  linkText: { color: '#007AFF', fontSize: 16 }
});