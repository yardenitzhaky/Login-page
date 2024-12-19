import React from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

// CustomInput component definition
const CustomInput = ({ icon, error, onChangeText, ...props }) => (
  <View>
    <View style={styles.inputContainer}>
      {/* Icon on the left */}
      <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />
      {/* Text input field */}
      <TextInput 
        style={styles.input}
        onChangeText={onChangeText}
        {...props}
      />
      {/* Show/Hide password icon */}
      {props.isPassword && (
        <Pressable onPress={props.onTogglePassword} style={styles.eyeIcon}>
          <Ionicons
            name={props.showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#666"
          />
        </Pressable>
      )}
    </View>
    {/* Error message */}
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

export default CustomInput;