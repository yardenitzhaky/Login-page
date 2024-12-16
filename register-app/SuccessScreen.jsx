import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const SuccessScreen = ({ route }) => {
  const { username } = route.params;

  return (
    <SafeAreaView style={styles.container}>
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