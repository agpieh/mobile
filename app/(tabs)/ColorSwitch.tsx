import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';

// 1. Tạo Custom Component "ColorButton" nhận Props và Callback
const ColorButton = ({ title, buttonColor, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: buttonColor }]} 
      // Gọi hàm callback và truyền màu sắc tương ứng lên cho Component cha
      onPress={() => onPress(buttonColor)}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function BackgroundColorScreen() {
  // 2. Khởi tạo State cho màu nền của Component cha, mặc định là màu trắng
  const [bgColor, setBgColor] = useState('#FFFFFF');

  // 3. Hàm Callback để nhận màu từ Component con và cập nhật lại State
  const changeBackground = (color) => {
    setBgColor(color);
  };

  return (
    // Sử dụng State bgColor làm màu nền cho View cha
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle={bgColor === '#FFFFFF' || bgColor === 'yellow' ? 'dark-content' : 'light-content'} />
      
      <View style={styles.content}>
        {/* Truyền Props và Callback xuống các Component con */}
        <ColorButton title="GREEN" buttonColor="green" onPress={changeBackground} />
        <ColorButton title="BLUE" buttonColor="blue" onPress={changeBackground} />
        <ColorButton title="BROWN" buttonColor="brown" onPress={changeBackground} />
        <ColorButton title="YELLOW" buttonColor="yellow" onPress={changeBackground} />
        <ColorButton title="RED" buttonColor="red" onPress={changeBackground} />
        <ColorButton title="BLACK" buttonColor="black" onPress={changeBackground} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // Thêm hiệu ứng chuyển màu mượt mà (chỉ hoạt động tốt trên nền tảng hỗ trợ)
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    // Đổ bóng để nút nổi bật lên kể cả khi trùng màu nền
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)', // Viền nhẹ để tách biệt nút
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    // Thêm viền đen mờ cho chữ để hiển thị rõ trên các nút màu sáng (như Yellow)
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});