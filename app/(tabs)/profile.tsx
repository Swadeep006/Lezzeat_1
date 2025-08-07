import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { Camera, CreditCard as Edit2, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const [profileImage, setProfileImage] = useState(null);

  // Mock user data - in real app this would come from authentication context
  const userData = {
    name: 'Rahul Sharma',
    username: 'rahul_cs21',
    rollNumber: 'CS21B1234',
    joinedDate: 'Jul 31, 2025',
    accountStatus: 'Active',
    email: 'rahul.sharma@college.edu',
  };

  const handleImageUpload = () => {
    Alert.alert(
      'Update Profile Photo',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Gallery', onPress: () => console.log('Open gallery') },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
          Profile
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <LogOut size={24} color={isDarkMode ? '#FFFFFF' : '#1F2937'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoContainer} onPress={handleImageUpload}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profilePhoto} />
            ) : (
              <View style={[styles.photoPlaceholder, { backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB' }]}>
                <Camera size={40} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
              </View>
            )}
            <View style={styles.editIcon}>
              <Edit2 size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* User Information */}
        <View style={styles.infoSection}>
          <View style={[styles.infoCard, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}>
            <Text style={[styles.label, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
              Full Name
            </Text>
            <View style={[styles.valueContainer, { backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>
              <Text style={[styles.value, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                {userData.name}
              </Text>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}>
            <Text style={[styles.label, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
              Username
            </Text>
            <View style={[styles.valueContainer, styles.nonEditable, { backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6' }]}>
              <Text style={[styles.value, { color: isDarkMode ? '#D1D5DB' : '#4B5563' }]}>
                {userData.username}
              </Text>
              <Text style={[styles.nonEditableText, { color: isDarkMode ? '#6B7280' : '#9CA3AF' }]}>
                (Non-editable)
              </Text>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}>
            <Text style={[styles.label, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
              Roll Number
            </Text>
            <View style={[styles.valueContainer, styles.nonEditable, { backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6' }]}>
              <Text style={[styles.value, { color: isDarkMode ? '#D1D5DB' : '#4B5563' }]}>
                {userData.rollNumber}
              </Text>
              <Text style={[styles.nonEditableText, { color: isDarkMode ? '#6B7280' : '#9CA3AF' }]}>
                (Non-editable)
              </Text>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}>
            <Text style={[styles.label, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
              Email
            </Text>
            <View style={[styles.valueContainer, { backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>
              <Text style={[styles.value, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                {userData.email}
              </Text>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}>
            <Text style={[styles.label, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
              Joined Date
            </Text>
            <View style={[styles.valueContainer, { backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>
              <Text style={[styles.value, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                Joined: {userData.joinedDate}
              </Text>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}>
            <Text style={[styles.label, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
              Account Status
            </Text>
            <View style={[styles.valueContainer, { backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={[styles.value, { color: isDarkMode ? '#10B981' : '#10B981' }]}>
                  {userData.accountStatus}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}>
            <Text style={[styles.actionButtonText, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
              Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}>
            <Text style={[styles.actionButtonText, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
              Help & Support
            </Text>
          </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  photoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F97316',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    marginBottom: 30,
  },
  infoCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  valueContainer: {
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nonEditable: {
    opacity: 0.7,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  nonEditableText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  actionSection: {
    marginBottom: 30,
  },
  actionButton: {
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});