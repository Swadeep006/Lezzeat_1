import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { Calendar, Filter } from 'lucide-react-native';

const orderHistory = [
  {
    id: 1,
    orderNumber: 'Order #1',
    status: 'confirmed',
    placedTime: 'Jul 31, 2025, 12:15 PM',
    pickupTime: '2:36 PM',
    total: 40.00,
    items: [
      { name: 'Aloo Paratha', quantity: 1, price: 40.00 }
    ],
    paymentStatus: 'Paid',
    paymentId: 'pay_1753964143112_uajsqhkxm',
    otp: '123456'
  },
  {
    id: 2,
    orderNumber: 'Order #2',
    status: 'ready',
    placedTime: 'Jul 30, 2025, 1:45 PM',
    pickupTime: '3:15 PM',
    total: 95.00,
    items: [
      { name: 'Biryani', quantity: 1, price: 95.00 }
    ],
    paymentStatus: 'Paid',
    paymentId: 'pay_1753864143112_xbjsqhkxn',
    otp: '789012'
  },
  {
    id: 3,
    orderNumber: 'Order #3',
    status: 'picked_up',
    placedTime: 'Jul 29, 2025, 11:30 AM',
    pickupTime: '1:00 PM',
    total: 55.00,
    items: [
      { name: 'Samosa', quantity: 2, price: 15.00 },
      { name: 'Masala Chai', quantity: 1, price: 10.00 },
      { name: 'Pakora', quantity: 1, price: 25.00 }
    ],
    paymentStatus: 'Paid',
    paymentId: 'pay_1753764143112_ycjsqhkxo'
  }
];

export default function OrdersScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#F59E0B';
      case 'preparing':
        return '#3B82F6';
      case 'ready':
        return '#10B981';
      case 'picked_up':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup';
      case 'picked_up':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
          Order History
        </Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={isDarkMode ? '#FFFFFF' : '#1F2937'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ordersList}>
        {orderHistory.map((order) => (
          <View
            key={order.id}
            style={[styles.orderCard, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}
          >
            <View style={styles.orderHeader}>
              <Text style={[styles.orderNumber, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                {order.orderNumber}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
              </View>
            </View>

            <View style={styles.orderInfo}>
              <Text style={[styles.orderTime, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
                Placed: {order.placedTime}
              </Text>
              <Text style={[styles.orderTime, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
                Pickup: {order.pickupTime}
              </Text>
              <Text style={[styles.orderTotal, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                ₹{order.total.toFixed(2)}
              </Text>
            </View>

            <View style={styles.itemsList}>
              <Text style={[styles.itemsHeader, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                Items Ordered:
              </Text>
              {order.items.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <Text style={[styles.itemDetail, { color: isDarkMode ? '#D1D5DB' : '#4B5563' }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.itemDetail, { color: isDarkMode ? '#D1D5DB' : '#4B5563' }]}>
                    Qty: {item.quantity} @ ₹{item.price.toFixed(2)} each
                  </Text>
                  <Text style={[styles.itemTotal, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.paymentInfo}>
              <Text style={[styles.paymentStatus, { color: isDarkMode ? '#10B981' : '#10B981' }]}>
                Payment Status: {order.paymentStatus}
              </Text>
              {order.paymentId && (
                <Text style={[styles.paymentId, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
                  Payment ID: {order.paymentId}
                </Text>
              )}
              {order.otp && (
                <Text style={[styles.otp, { color: isDarkMode ? '#F59E0B' : '#F59E0B' }]}>
                  Pickup OTP: {order.otp}
                </Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 8,
  },
  ordersList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  orderCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  orderInfo: {
    marginBottom: 15,
  },
  orderTime: {
    fontSize: 14,
    marginBottom: 2,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  itemsList: {
    marginBottom: 15,
  },
  itemsHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  orderItem: {
    marginBottom: 8,
  },
  itemDetail: {
    fontSize: 14,
    marginBottom: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
  },
  paymentInfo: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  paymentStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentId: {
    fontSize: 12,
    marginBottom: 4,
  },
  otp: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});