import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  // State for form data (username, email, password)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State for indicating registration in progress
  const [loading, setLoading] = useState(false);

  // Form validation logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
    };

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Update errors state
    setErrors(newErrors);
    return isValid;
  };

  // Handle the registration process
  const handleRegister = async () => {
    // Stop if form validation fails
    if (!validateForm()) {
      Toast.show('Please fix the form errors', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#ff4444',
      });
      return;
    }

    try {
      setLoading(true); // Show loading indicator

      // Send registration data to the server
      const response = await fetch('http://192.168.10.21:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      // Show success message and navigate to login screen
      const data = await response.json();
      Toast.show(data.welcomeMessage || 'Welcome to our app!', {
        duration: 4000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      navigation.navigate('Login');
    } catch (error) {
      // Handle errors and display a toast message
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
          delay: 0,
          backgroundColor: '#ff4444',
        }
      );
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Navigate to the login screen
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* App Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>S</Text>
          </View>
        </View>

        {/* Page Title */}
        <Text style={styles.title}>Register</Text>

        {/* Registration Form */}
        <View style={styles.form}>
          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={formData.username}
              onChangeText={(text) => {
                setFormData({ ...formData, username: text });
                if (errors.username) setErrors({ ...errors, username: '' });
              }}
              autoCapitalize="none"
            />
          </View>
          {/* Display username validation error */}
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => {
                setFormData({ ...formData, email: text });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {/* Display email validation error */}
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => {
                setFormData({ ...formData, password: text });
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              secureTextEntry={!showPassword} // Toggle visibility
            />
            {/* Show/Hide Password Button */}
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#666"
              />
            </Pressable>
          </View>
          {/* Display password validation error */}
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          {/* Register Button */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              (!formData.username || !formData.email || !formData.password || loading) &&
                styles.registerButtonDisabled,
            ]}
            disabled={!formData.username || !formData.email || !formData.password || loading}
            onPress={handleRegister}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          {/* Or Separator */}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.orLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={20} color="#DB4437" style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={20} color="#4267B2" style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.hasAccountText}>Already have an account?</Text>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4355B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    color: '#4355B9',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#4355B9',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 4,
  },
  registerButton: {
    backgroundColor: '#4355B9',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonDisabled: {
    backgroundColor: '#B4BEE6',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  orText: {
    color: '#666',
    paddingHorizontal: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4355B9',
    borderRadius: 25,
    padding: 12,
    width: '48%',
    backgroundColor: '#fff',
  },
  socialIcon: {
    marginRight: 8,
  },
  socialButtonText: {
    color: '#333',
    fontSize: 14,
  },
  loginContainer: {
    alignItems: 'center',
    gap: 8,
  },
  hasAccountText: {
    color: '#666',
  },
  loginButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#4355B9',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginButtonText: {
    color: '#4355B9',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegisterScreen;