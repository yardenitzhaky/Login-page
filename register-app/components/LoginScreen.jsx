import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import styles from './styles';
import Input from './Input';
import Button from './Button';

const API_URL = 'https://register-hca8e4dba2eafxec.israelcentral-01.azurewebsites.net';

const LoginScreen = ({ navigation }) => {
  // State variables
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle login action
  const handleLogin = async () => {
    if (!formData.email || !formData.password) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');

      // Clear form data and navigate to success screen
      setFormData({ email: '', password: '' });
      navigation.replace('Success', { username: data.user.username });
    } catch (error) {
      Alert.alert('Login Error', error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Log in</Text>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <Input
            icon="mail-outline"
            placeholder="Email"
            value={formData.email}
            onChangeText={(email) => setFormData(prev => ({ ...prev, email }))}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />

          {/* Password Input */}
          <Input
            icon="lock-closed-outline"
            placeholder="Password"
            value={formData.password}
            onChangeText={(password) => setFormData(prev => ({ ...prev, password }))}
            secureTextEntry={!showPassword}
            editable={!isLoading}
            isPassword
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          {/* Forgot Password */}
          <Text style={styles.forgotPassword}>Forgot password?</Text>

          {/* Login Button */}
          <Button
            title={isLoading ? 'Logging in...' : 'Log in'}
            onPress={handleLogin}
            disabled={!formData.email || !formData.password || isLoading}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtons}>
            <Button
              title="Google"
              icon="logo-google"
              variant="outline"
              onPress={() => navigation.replace('Success', { username: 'Google User' })}
              disabled={isLoading}
              style={styles.socialButton}
            />
            <Button
              title="Facebook"
              icon="logo-facebook"
              variant="outline"
              onPress={() => navigation.replace('Success', { username: 'Facebook User' })}
              disabled={isLoading}
              style={styles.socialButton}
            />
          </View>

          {/* Register Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Have no account yet?</Text>
            <Button
              title="Register"
              variant="outline"
              onPress={() => navigation.navigate('Register')}
              disabled={isLoading}
              style={styles.registerButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;