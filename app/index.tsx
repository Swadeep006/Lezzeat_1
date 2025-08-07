import React from 'react';
import { Redirect } from 'expo-router';

export default function RootIndex() {
  // Check if user is authenticated - for now, redirect to login
  // In a real app, check authentication state here
  const isAuthenticated = false; // Mock auth state

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/auth/login" />;
  }
}