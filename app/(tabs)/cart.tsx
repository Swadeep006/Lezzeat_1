import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { CartContext } from '@/context/CartContext';
import { ThemeContext } from '@/context/ThemeContext';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import PickupTimeModal from '@/components/PickupTimeModal';

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [showPickupModal, setShowPickupModal] = useState(false);

  const tax = getTotalPrice() * 0.05; // 5% tax
  const totalWithTax = getTotalPrice() + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checkout.');
      return;
    }
    setShowPickupModal(true);
  };

  const handleConfirmOrder = (pickupTime: string) => {
    // Generate OTP for pickup
    const otp = Math.floor(100000 + Math.random() * 900000);
    Alert.alert(
      'Order Confirmed!',
      `Your order has been placed.\nPickup Time: ${pickupTime}\nOTP: ${otp}\n\nShow this OTP during pickup.`,
      [{ text: 'OK' }]
    );
    setShowPickupModal(false);
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' }]}>
        <View style={styles.emptyCart}>
          <Text style={[styles.emptyCartText, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptyCartSubtext, { color: isDarkMode ? '#6B7280' : '#9CA3AF' }]}>
            Add some delicious food items to get started!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
          My Cart
        </Text>
      </View>

      <ScrollView style={styles.cartItems}>
        {cartItems.map((item) => (
          <View
            key={item.id}
            style={[styles.cartItem, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={[styles.itemName, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                {item.name}
              </Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={[styles.quantity, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemActions}>
              <Text style={[styles.itemTotal, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                ₹{item.price * item.quantity}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Trash2 size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Total Section */}
      <View style={[styles.totalSection, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalText, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Subtotal:
          </Text>
          <Text style={[styles.totalValue, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            ₹{getTotalPrice().toFixed(2)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.totalText, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Tax (5%):
          </Text>
          <Text style={[styles.totalValue, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            ₹{tax.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.totalRow, styles.finalTotal]}>
          <Text style={[styles.finalTotalText, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Total:
          </Text>
          <Text style={[styles.finalTotalValue, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            ₹{totalWithTax.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      <PickupTimeModal
        visible={showPickupModal}
        onClose={() => setShowPickupModal(false)}
        onConfirm={handleConfirmOrder}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 14,
  },
  cartItems: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: '#F97316',
    fontWeight: '500',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#F97316',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
  },
  totalSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalText: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  finalTotal: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
  },
  finalTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});