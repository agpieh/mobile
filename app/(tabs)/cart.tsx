import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartContext } from '../../context/CartContext';

export default function CartScreen() {
  // Lấy danh sách sản phẩm và hàm Xóa từ Context
  const { cart, addToCart, decreaseQuantity } = useContext(CartContext);
  const router = useRouter();

  // Tính tổng tiền an toàn (phòng trường hợp sản phẩm không có giá)
  const totalPrice = cart.reduce((sum: number, item: any) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header: Nút Back */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Your Cart 👍</Text>

      {/* KIỂM TRA GIỎ HÀNG TRỐNG */}
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color="#D3D3D3" />
          <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống!</Text>
          <TouchableOpacity style={styles.shopNowBtn} onPress={() => router.push('/home')}>
            <Text style={styles.shopNowText}>Quét ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* DANH SÁCH SẢN PHẨM */}
          {/* Cấp paddingBottom 150 để cuộn không bị vướng phần thanh toán */}
          <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
            {cart.map((item: any) => (
              <View key={item.cartId} style={styles.cartItem}>
                <View style={styles.itemLeft}>
                  {/* Dùng ảnh thật của sản phẩm (nếu có), nếu không dùng ảnh mặc định */}
                  <Image 
                    source={item.image ? item.image : require('../../assets/images/glass-bottle-mockups-for-food-and-beverage-packaging-cover 1.png')} 
                    style={styles.itemImage} 
                    resizeMode="contain"
                  />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={styles.brandText}>{item.brand}</Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>₹ {item.price}</Text>
                  </View>
                </View>
                
                {/* Bộ nút Tăng/Giảm/Xóa */}
                <View style={styles.quantityBox}>
                  {/* Nút Trừ */}
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.qtyBtn}>
                    <Ionicons name="remove" size={16} color="#F48B60" />
                  </TouchableOpacity>
                  
                  {/* Hiển thị số lượng thật */}
                  <Text style={styles.qtyText}>{item.quantity || 1}</Text>
                  
                  {/* Nút Cộng */}
                  <TouchableOpacity onPress={() => addToCart(item)} style={styles.qtyBtn}>
                    <Ionicons name="add" size={16} color="#F48B60" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* FOOTER: Tổng tiền & Nút Thanh Toán */}
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹ {totalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => alert('Chức năng đang phát triển!')}>
              <Text style={styles.checkoutText}>Proceed to checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingHorizontal: 25, marginTop: 40 },
  backButton: { width: 45, height: 45, backgroundColor: '#FFF', borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginLeft: 25, marginTop: 15, marginBottom: 20 },
  
  // Style cho Empty State
  emptyCart: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 },
  emptyText: { fontSize: 16, color: '#A0A0A0', marginTop: 15, marginBottom: 20 },
  shopNowBtn: { backgroundColor: '#F48B60', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 20 },
  shopNowText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  // Style cho Danh sách sản phẩm
  cartList: { paddingHorizontal: 25 },
  cartItem: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 20, padding: 15, marginBottom: 15, justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  itemImage: { width: 60, height: 60, borderRadius: 12, backgroundColor: '#F9F9F9' },
  brandText: { fontSize: 12, color: '#A0A0A0', marginBottom: 2 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  itemPrice: { fontSize: 16, fontWeight: '900', color: '#F48B60' },
  
  // Style cho Nút số lượng
  quantityBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 8 },
  qtyBtn: { width: 24, height: 24, backgroundColor: '#FFF', borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  qtyText: { fontSize: 14, fontWeight: 'bold', color: '#333', marginHorizontal: 12 },

  // Style cho Footer Thanh toán (Đẩy lên cao để không bị Nav Bar đè)
  footer: { position: 'absolute', bottom: 90, width: '100%', paddingHorizontal: 25, backgroundColor: '#FAFAFA', paddingTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, alignItems: 'center' },
  totalLabel: { fontSize: 18, fontWeight: '600', color: '#A0A0A0' },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  checkoutBtn: { backgroundColor: '#F48B60', paddingVertical: 18, borderRadius: 20, alignItems: 'center', shadowColor: '#F48B60', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  checkoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});