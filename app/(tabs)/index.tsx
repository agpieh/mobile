import React from 'react';
import { Alert, Button, Platform, SafeAreaView, StyleSheet, View } from 'react-native';

export default function ButtonExerciseScreen() {
  
  // Hàm xử lý sự kiện khi bấm nút
  const handlePress = () => {
    // Với React Native, dùng Alert.alert là chuẩn nhất, 
    // nhưng nếu code chạy trên nền web (Expo Web), bạn có thể dùng alert() mặc định của trình duyệt.
    if (Platform.OS === 'web') {
      alert('hello');
    } else {
      Alert.alert('Thông báo', 'hello');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Component Button cơ bản của React Native */}
        <Button 
          title="Nhấn vào tôi" 
          onPress={handlePress} 
          color="#007AFF" // Bạn có thể đổi màu nút tùy ý
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Căn giữa theo chiều dọc
  },
  content: {
    paddingHorizontal: 20,
  },
});