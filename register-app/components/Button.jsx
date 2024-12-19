import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

// CustomButton component definition
const Button = ({ title, onPress, variant = 'primary', icon, disabled, loading, style }) => (
  <Pressable
    // Apply styles based on variant, FOR ME: REMOVE THE OUTLINE
    style={[
      styles.button,
      variant === 'outline' && styles.buttonOutline,
      disabled && styles.buttonDisabled,
      style
    ]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      // Show loading indicator if loading is true
      <ActivityIndicator color="#fff" />
    ) : (
      <>
        {/* Show icon if provided */}
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={variant === 'outline' ? '#333' : '#fff'} 
            style={styles.buttonIcon} 
          />
        )}
        {/* Show button title */}
        <Text style={[
          styles.buttonText,
          variant === 'outline' && styles.buttonTextOutline
        ]}>
          {title}
        </Text>
      </>
    )}
  </Pressable>
);

export default Button;