import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- DATA GIẢ LẬP ĐỂ HIỂN THỊ TRÊN FLATLIST ---
const categories = [{ id: '1', name: 'Giày dép' }, { id: '2', name: 'Quần áo' }, { id: '3', name: 'Phụ kiện' }, { id: '4', name: 'Điện tử' }];
const popularItems = [{ id: '1', name: 'Sản phẩm A', price: '200.000đ' }, { id: '2', name: 'Sản phẩm B', price: '450.000đ' }, { id: '3', name: 'Sản phẩm C', price: '150.000đ' }];
const saleItems = [{ id: '1', name: 'Hàng sale 1', price: '99.000đ' }, { id: '2', name: 'Hàng sale 2', price: '149.000đ' }, { id: '3', name: 'Hàng sale 3', price: '199.000đ' }];

// --- COMPONENT DÙNG CHUNG (HEADER + FLATLIST) ---
const SectionBlock = ({ title, data, renderItem }: { title: string, data: any[], renderItem: any }) => (
  <View style={styles.sectionContainer}>
    {/* Header dùng chung */}
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllText}>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
    {/* Flatlist dùng chung (cuộn ngang) */}
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  </View>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* GROUP 1: SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput placeholder="Tìm kiếm sản phẩm..." style={styles.searchInput} />
        </View>

        {/* GROUP 2: TOP CATEGORIES */}
        <SectionBlock 
          title="Top Categories" 
          data={categories} 
          renderItem={({ item }: any) => (
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryCircle}><Ionicons name="pricetag-outline" size={24} color="#007AFF" /></View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )} 
        />

        {/* GROUP 3: POPULAR ITEMS */}
        <SectionBlock 
          title="Popular Items" 
          data={popularItems} 
          renderItem={({ item }: any) => (
            <TouchableOpacity style={styles.productCard}>
              <View style={styles.productImagePlaceholder} />
              <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          )} 
        />

        {/* GROUP 4: SALE-OFF ITEMS */}
        <SectionBlock 
          title="Sale-off Items" 
          data={saleItems} 
          renderItem={({ item }: any) => (
            <TouchableOpacity style={styles.productCard}>
              <View style={[styles.productImagePlaceholder, { backgroundColor: '#FFE0E0' }]} />
              <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.productPrice, { color: '#E53935' }]}>{item.price}</Text>
            </TouchableOpacity>
          )} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  // Style Search Bar
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', margin: 15, paddingHorizontal: 15, borderRadius: 10, height: 45 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  // Style Section dùng chung
  sectionContainer: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  seeAllText: { color: '#007AFF', fontSize: 14 },
  // Style items bên trong Flatlist
  categoryItem: { alignItems: 'center', marginRight: 20 },
  categoryCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  categoryText: { fontSize: 12, color: '#333' },
  productCard: { width: 120, marginRight: 15 },
  productImagePlaceholder: { width: 120, height: 120, borderRadius: 10, backgroundColor: '#F5F5F5', marginBottom: 8 },
  productName: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 4 },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#007AFF' }
});