import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { Menu, Search, Sun, Moon } from 'lucide-react-native';
import { CartContext } from '@/context/CartContext';
import { ThemeContext } from '@/context/ThemeContext';

const foodItems = {
  specials: [
    {
      id: 1,
      name: 'Special Thali',
      price: 85,
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
      category: 'special'
    },
    {
      id: 2,
      name: 'Butter Chicken',
      price: 120,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      category: 'special'
    },
    {
      id: 3,
      name: 'Paneer Masala',
      price: 110,
      image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg',
      category: 'special'
    },
  ],
  all: [
    {
      id: 4,
      name: 'Samosa',
      price: 15,
      image: 'https://images.pexels.com/photos/14477798/pexels-photo-14477798.jpeg',
      category: 'snacks'
    },
    {
      id: 5,
      name: 'Masala Chai',
      price: 10,
      image: 'https://images.pexels.com/photos/1252835/pexels-photo-1252835.jpeg',
      category: 'beverages'
    },
    {
      id: 6,
      name: 'Dosa',
      price: 45,
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
      category: 'meals'
    },
    {
      id: 7,
      name: 'Gulab Jamun',
      price: 25,
      image: 'https://images.pexels.com/photos/8104342/pexels-photo-8104342.jpeg',
      category: 'desserts'
    },
    {
      id: 8,
      name: 'Chole Bhature',
      price: 60,
      image: 'https://images.pexels.com/photos/5560748/pexels-photo-5560748.jpeg',
      category: 'meals'
    },
  ],
  beverages: [
    {
      id: 9,
      name: 'Cold Coffee',
      price: 30,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      category: 'beverages'
    },
    {
      id: 10,
      name: 'Fresh Lime Soda',
      price: 20,
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
      category: 'beverages'
    },
  ],
  desserts: [
    {
      id: 11,
      name: 'Rasgulla',
      price: 30,
      image: 'https://images.pexels.com/photos/8104342/pexels-photo-8104342.jpeg',
      category: 'desserts'
    },
    {
      id: 12,
      name: 'Ice Cream',
      price: 35,
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg',
      category: 'desserts'
    },
  ],
  meals: [
    {
      id: 13,
      name: 'Rajma Rice',
      price: 70,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      category: 'meals'
    },
    {
      id: 14,
      name: 'Biryani',
      price: 95,
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg',
      category: 'meals'
    },
  ],
  snacks: [
    {
      id: 15,
      name: 'Pakora',
      price: 25,
      image: 'https://images.pexels.com/photos/14477798/pexels-photo-14477798.jpeg',
      category: 'snacks'
    },
    {
      id: 16,
      name: 'Sandwich',
      price: 40,
      image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg',
      category: 'snacks'
    },
  ],
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const [showMenu, setShowMenu] = useState(false);

  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const renderFoodItem = (item: any, horizontal = false) => {
    const quantity = getItemQuantity(item.id);
    
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          horizontal ? styles.horizontalCard : styles.verticalCard,
          { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <View style={styles.foodInfo}>
          <Text style={[styles.foodName, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            {item.name}
          </Text>
          <Text style={[styles.foodPrice, { color: isDarkMode ? '#F97316' : '#F97316' }]}>
            ₹{item.price}
          </Text>
          <TouchableOpacity
            style={[
              styles.addButton,
              { backgroundColor: quantity > 0 ? '#10B981' : '#F97316' }
            ]}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addButtonText}>
              {quantity > 0 ? `Added (x${quantity})` : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <Menu size={24} color={isDarkMode ? '#FFFFFF' : '#1F2937'} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={[styles.appName, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Lezzeat
          </Text>
          <Text style={[styles.tagline, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
            Break your Hunger
          </Text>
        </View>
        <TouchableOpacity onPress={toggleTheme}>
          {isDarkMode ? (
            <Sun size={24} color="#F59E0B" />
          ) : (
            <Moon size={24} color="#6B7280" />
          )}
        </TouchableOpacity>
      </View>

      {/* Hamburger Menu */}
      {showMenu && (
        <View style={[styles.menu, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
              Order History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
              Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
              Help & Support
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Specials */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Today's Specials
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {foodItems.specials.map(item => renderFoodItem(item, true))}
          </ScrollView>
        </View>

        {/* All Items */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            All Items
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {foodItems.all.map(item => renderFoodItem(item, true))}
          </ScrollView>
        </View>

        {/* Beverages */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Beverages
          </Text>
          {foodItems.beverages.map(item => renderFoodItem(item, false))}
        </View>

        {/* Desserts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Desserts
          </Text>
          {foodItems.desserts.map(item => renderFoodItem(item, false))}
        </View>

        {/* Meals */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Meals
          </Text>
          {foodItems.meals.map(item => renderFoodItem(item, false))}
        </View>

        {/* Snacks */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Snacks
          </Text>
          {foodItems.snacks.map(item => renderFoodItem(item, false))}
        </View>
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
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  menu: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 10,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  horizontalScroll: {
    marginBottom: 10,
  },
  horizontalCard: {
    width: 160,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  verticalCard: {
    flexDirection: 'row',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foodImage: {
    width: '100%',
    height: 100,
  },
  foodInfo: {
    padding: 12,
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});