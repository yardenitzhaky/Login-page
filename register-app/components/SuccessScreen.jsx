import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

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



export default SuccessScreen;