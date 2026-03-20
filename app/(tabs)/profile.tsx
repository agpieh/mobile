import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../../context/AppContext';

export default function ProfileScreen() {
  // Rút Email và hàm Đăng xuất từ Context
  const { setIsLoggedIn, userEmail } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* PHẦN 1: HEADER (Avatar và Thông tin) */}
      <View style={styles.headerPart}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
          style={styles.avatar} 
        />
        <Text style={styles.nameText}>Trần Đại Hiệp</Text>
        <Text style={styles.emailText}>{userEmail || 'Chưa cập nhật email'}</Text>
      </View>

      {/* PHẦN 2: THÔNG TIN & NÚT SIGN OUT */}
      <View style={styles.infoPart}>
        <TouchableOpacity style={styles.signOutButton} onPress={() => setIsLoggedIn(false)}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  
  // Style Phần 1
  headerPart: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA'
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15, borderWidth: 2, borderColor: '#007AFF' },
  nameText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  emailText: { fontSize: 16, color: '#666', fontStyle: 'italic' },
  
  // Style Phần 2
  infoPart: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20
  },
  signOutButton: { 
    flexDirection: 'row',
    backgroundColor: '#FF3B30', 
    width: '100%', 
    paddingVertical: 15, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  signOutText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});