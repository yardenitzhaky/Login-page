import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SuccessScreen = ({ route, navigation }) => {
  const { username } = route.params;

  const handleBack = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#4355B9" />
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Successfully logged in!</Text>
        <Text style={styles.username}>Welcome, {username}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4355B9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#4355B9',
    fontWeight: '600',
    marginBottom: 16,
  },
  username: {
    fontSize: 18,
    color: '#666',
  },
});

export default SuccessScreen;