import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartContext } from '../../context/CartContext';
// 👉 BỔ SUNG: Import thêm useLocalSearchParams
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ScanScreen() {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();
  const [showNotification, setShowNotification] = React.useState(false); // Dùng để bật/tắt thông báo
  // 👉 HỨNG DỮ LIỆU TỪ TRANG HOME GỬI SANG
  const params = useLocalSearchParams();

  // 👉 TẠO CÁC BIẾN LINH HOẠT (Nếu có params thì dùng, không có thì dùng mặc định)
  const productName = params.name || 'Orange Juice';
  const productBrand = params.brand || "Lauren's";
  const productPrice = params.price ? Number(params.price) : 99;
  
  // Xử lý ảnh đặc biệt: require() truyền qua router sẽ bị biến thành chuỗi, ta phải ép kiểu về số (Number)
  const productImage = params.image 
    ? Number(params.image) 
    : require('../../assets/images/glass-bottle-mockups-for-food-and-beverage-packaging-cover 1.png');

  // Hàm thêm vào giỏ hàng cũng dùng dữ liệu linh hoạt luôn
  const handleAddToCart = () => {
    // 1. Thêm vào giỏ hàng
    addToCart({ 
      id: params.id || '1', 
      name: productName, 
      brand: productBrand, 
      price: 149, 
      image: productImage 
    });
    
    // 2. Bật thông báo lên
    setShowNotification(true);
    
    // 3. Sau 2 giây tự động tắt đi
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.scanArea}>
          {/* 👉 1. DÙNG BIẾN productImage Ở ĐÂY */}
          <Image source={productImage} style={styles.productImage} resizeMode="contain" />
          
          {/* Khung quét */}
          <Image source={require('../../assets/images/Group 5.png')} style={styles.scanFrame} resizeMode="contain" />
        </View>

        {/* Thẻ thông tin sản phẩm */}
        <View style={styles.productCard}>
          <View style={styles.productInfo}>
            {/* 👉 2. DÙNG BIẾN productImage Ở ĐÂY */}
            <Image source={productImage} style={styles.thumb} />
            <View style={{ marginLeft: 15 }}>
              {/* 👉 3. DÙNG BIẾN productBrand VÀ productName Ở ĐÂY */}
              <Text style={styles.brandText}>{productBrand}</Text>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={{ color: '#F48B60', fontWeight: 'bold', marginTop: 3 }}>₹ {productPrice}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Ionicons name="add" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
        {/* Thông báo dạng Toast mượt mà */}
        {showNotification && (
          <View style={styles.toastNotification}>
            <Ionicons name="checkmark-circle" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.toastText}>Đã thêm +1 vào giỏ hàng</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFDFD1' }, 
  backButton: { width: 45, height: 45, backgroundColor: '#FFF', borderRadius: 12, justifyContent: 'center', alignItems: 'center',  marginTop: 40, marginHorizontal: 25 , zIndex: 10 },
  scanArea: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 },
  scanFrame: { position: 'absolute', width: 430, height: 430, zIndex: 2 },
  productImage: { width: 450, height: 460, zIndex: 1 },
  productCard: { position: 'absolute', bottom: 40, zIndex: 999, alignSelf: 'center', width: '85%', backgroundColor: '#FFF', borderRadius: 25, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 5 },
  productInfo: { flexDirection: 'row', alignItems: 'center' },
  thumb: { width: 50, height: 50, borderRadius: 10, backgroundColor: '#F5F5F5', resizeMode: 'cover' },
  brandText: { color: '#A0A0A0', fontSize: 12 },
  productName: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  toastNotification: { 
    position: 'absolute', 
    top: 50, 
    alignSelf: 'center', 
    backgroundColor: '#48C795', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    zIndex: 1000,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5
  },
  toastText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  addButton: { width: 50, height: 50, backgroundColor: '#5D5FEF', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }
});