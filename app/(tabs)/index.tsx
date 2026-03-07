import React from 'react';
// Nhớ import thêm Text từ react-native
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Exercise42Screen() {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Mở thẻ View ra và kẹp Text vào giữa */}
      <View style={[styles.square, { backgroundColor: '#FF3B30' }]}>
        <Text style={styles.text}>Ô số 1</Text>
      </View>
      
      <View style={[styles.square, { backgroundColor: '#34C759' }]}>
        <Text style={styles.text}>Ô số 2</Text>
      </View>
      
      <View style={[styles.square, { backgroundColor: '#007AFF' }]}>
        <Text style={styles.text}>Ô số 3</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  square: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 8,
    // Thêm 2 dòng này để căn giữa nội dung (chữ) nằm BÊN TRONG hình vuông:
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  // Thêm style cho chữ để dễ nhìn hơn
  text: {
    color: '#FFFFFF', // Chữ màu trắng
    fontWeight: 'bold', // In đậm
    fontSize: 16,
  }
});