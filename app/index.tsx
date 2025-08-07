import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function RootIndex() {
  useEffect(() => {
    // Check if user is authenticated - for now, redirect to login
    // In a real app, check authentication state here
    const isAuthenticated = false; // Mock auth state

    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/auth/login');
    }
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});