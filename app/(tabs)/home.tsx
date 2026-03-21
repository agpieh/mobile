import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Import thêm useRouter để thực hiện lệnh chuyển trang
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  // Khởi tạo router
  const router = useRouter();

  // Dữ liệu giả lập cho danh sách Explore
  const exploreProducts = [
    { id: 1, name: "Apple Juice", brand: "Lauren's", price: 149, image: require('../../assets/images/Rectangle 31.png')},
    { id: 2, name: "Fresh Milk", brand: "Dairy Co.", price: 119, image: require('../../assets/images/Rectangle 45 (1).png') },
    { id: 3, name: "Mineral Water", brand: "Aqua", price: 199, image: require('../../assets/images/Rectangle 45 (2).png') }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello 👋</Text>
            <Text style={styles.name}>Christie Doe</Text>
          </View>
          <Image source={require('../../assets/images/profile.jpg')} style={styles.avatar} />
        </View>

        {/* Your Insights */}
        <Text style={styles.sectionTitle}>Your Insights</Text>
        <View style={styles.insightsGrid}>
          {/* Nút Scan ở insight cũng có thể bấm để chuyển trang */}
          <TouchableOpacity style={styles.insightCard} onPress={() => router.push('/scan')}>
            <Image source={require('../../assets/images/Group 157.png')} style={styles.iconImage} />
            <Text style={styles.cardTitle}>Scan new</Text>
            <Text style={styles.cardSub}>Scanned 483</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.insightCard}>
            <Image source={require('../../assets/images/Rectangle 33.png')} style={styles.iconImage} />
            
            <Text style={styles.cardTitle}>Counterfeits</Text>
            <Text style={styles.cardSub}>Counterfeited 32</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.insightCard}>
            <Image source={require('../../assets/images/Group 160.png')} style={styles.iconImage} />
            
            <Text style={styles.cardTitle}>Success</Text>
            <Text style={styles.cardSub}>Checkouts 8</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.insightCard}>
            <Image source={require('../../assets/images/Group 159.png')} style={styles.iconImage} />
            
            <Text style={styles.cardTitle}>Directory</Text>
            <Text style={styles.cardSub}>History 26</Text>
          </TouchableOpacity>
        </View>

        {/* Explore More */}
        <View style={styles.exploreHeader}>
          <Text style={styles.sectionTitle}>Explore</Text>
          {/* Mũi tên trỏ sang phải */}
          <Text style={styles.arrowRight}>➔</Text> 
        </View>
        
        {/* Danh sách thẻ sản phẩm cuộn ngang */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 25, paddingRight: 15 }}>
          {exploreProducts.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.exploreCard} 
              // Lệnh chuyển sang trang Scan khi bấm vào thẻ sản phẩm
              onPress={() => router.push({
                pathname: '/scan',
                params: {
                  id: item.id,
                  name: item.name,
                  brand: item.brand,
                  image: item.image, // Gửi luôn cả cái ảnh đi
                  price: item.price
                }
              })}
            >
              <Image source={item.image} style={styles.exploreImage} />
              <View style={styles.exploreInfo}>
                <Text style={styles.exploreBrand}>{item.brand}</Text>
                <Text style={styles.exploreName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, marginTop: 20 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  name: { fontSize: 16, color: '#666', marginTop: 5 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginLeft: 25, marginTop: 10, marginBottom: 15 },
  insightsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingHorizontal: 15 },
  insightCard: { width: '45%', backgroundColor: '#FFF', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
  iconBox: { width: 50, height: 50, borderRadius: 15, marginBottom: 15 },
  iconImage: { width: 50, height: 50, marginBottom: 15, resizeMode: 'contain' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardSub: { fontSize: 12, color: '#A0A0A0', marginTop: 5 },
  
  // Style cho phần Explore
  exploreHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingRight: 25, alignItems: 'center', marginTop: 10 },
  arrowRight: { fontSize: 20, color: '#333', marginBottom: 5 },
  exploreCard: { width: 140, height: 180, backgroundColor: '#FFF', borderRadius: 20, marginRight: 15, marginTop: 10, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  exploreImage: { width: '100%', height: 120, resizeMode: 'cover' },
  exploreInfo: { padding: 10 },
  exploreBrand: { fontSize: 10, color: '#A0A0A0' },
  exploreName: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 2 }
});