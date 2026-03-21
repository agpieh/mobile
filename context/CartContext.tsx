import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('CART_ITEMS');
        if (savedCart) setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Lỗi đọc giỏ hàng", error);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('CART_ITEMS', JSON.stringify(cart));
  }, [cart]);

  // THÊM SẢN PHẨM (Cộng dồn nếu đã có)
  const addToCart = (product: any) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex >= 0) {
      // Nếu đã có -> Tăng số lượng lên 1
      const newCart = [...cart];
      newCart[existingIndex].quantity = (newCart[existingIndex].quantity || 1) + 1;
      setCart(newCart);
    } else {
      // Nếu chưa có -> Thêm mới với số lượng = 1
      setCart([...cart, { ...product, quantity: 1, cartId: Date.now().toString() }]);
    }
  };

  // GIẢM SỐ LƯỢNG (Nếu về 0 thì xóa luôn)
  const decreaseQuantity = (productId: string) => {
    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex >= 0) {
      const newCart = [...cart];
      if (newCart[existingIndex].quantity > 1) {
        newCart[existingIndex].quantity -= 1;
        setCart(newCart);
      } else {
        // Nếu số lượng = 1 mà bấm trừ -> Xóa sản phẩm
        setCart(cart.filter(item => item.id !== productId));
      }
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};