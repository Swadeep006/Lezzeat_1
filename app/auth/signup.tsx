import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { ThemeContext } from '@/context/ThemeContext';
import { User, Lock, Mail, Hash } from 'lucide-react-native';

export default function SignupScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    rollNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!formData.name || !formData.username || !formData.rollNumber || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    // Mock registration - replace with actual API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        'Account created successfully! You can now login.',
        [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
      );
    }, 1000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
            Join Lezzeat
          </Text>
          <Text style={[styles.subtitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
            Create your account to start ordering
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <User size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#FFFFFF' : '#1F2937',
                  borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                }
              ]}
              placeholder="Full Name"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <User size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#FFFFFF' : '#1F2937',
                  borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                }
              ]}
              placeholder="Username"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={formData.username}
              onChangeText={(value) => updateFormData('username', value)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Hash size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#FFFFFF' : '#1F2937',
                  borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                }
              ]}
              placeholder="Roll Number (e.g., CS21B1234)"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={formData.rollNumber}
              onChangeText={(value) => updateFormData('rollNumber', value)}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Mail size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#FFFFFF' : '#1F2937',
                  borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                }
              ]}
              placeholder="Email Address"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Lock size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#FFFFFF' : '#1F2937',
                  borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                }
              ]}
              placeholder="Password"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Lock size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#FFFFFF' : '#1F2937',
                  borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                }
              ]}
              placeholder="Confirm Password"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry
            />
          </View>

          <Text style={[styles.note, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
            Note: Username and Roll Number cannot be changed after registration
          </Text>

          <TouchableOpacity
            style={[styles.signupButton, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.signupButtonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginLink}>
            <Text style={[styles.loginText, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
              Already have an account?{' '}
            </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLinkText}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    top: 18,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 50,
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  signupButton: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 16,
  },
  loginLinkText: {
    fontSize: 16,
    color: '#F97316',
    fontWeight: '600',
  },
});