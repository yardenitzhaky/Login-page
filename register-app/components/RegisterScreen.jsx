import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Toast from 'react-native-root-toast';
import styles from './styles';
import Input from './Input';
import Button from './Button';

const API_URL = 'https://register-hca8e4dba2eafxec.israelcentral-01.azurewebsites.net';

const RegisterScreen = ({ navigation }) => {
  // State variables
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle registration action
  const handleRegister = async () => {
    if (!validateForm()) {
      Toast.show('Please fix the form errors', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#ff4444',
      });
      return;
    }

    try {
      setLoading(true);
      const registrationData = {
        ...formData,
        username: formData.email.split('@')[0]
      };

      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      Toast.show(data.welcomeMessage || 'Welcome to our app!', {
        duration: 4000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });

      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration error:', error);
      Toast.show(
        error.message === 'Network request failed'
          ? 'Unable to connect to server. Please check your connection.'
          : error.message || 'Registration failed. Please try again.',
        {
          duration: 4000,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: '#ff4444',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Register</Text>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <Input
            icon="mail-outline"
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => {
              setFormData(prev => ({ ...prev, email: text }));
              if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          {/* Password Input */}
          <Input
            icon="lock-closed-outline"
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => {
              setFormData(prev => ({ ...prev, password: text }));
              if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
            }}
            secureTextEntry={!showPassword}
            isPassword
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          {/* Register Button */}
          <Button
            title="Register"
            onPress={handleRegister}
            loading={loading}
            disabled={!formData.email || !formData.password}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Footer with Login Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Button
              title="Log in"
              variant="outline"
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;