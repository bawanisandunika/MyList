import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { styles } from '../styles/appStyles';

// Component for the input field and add button
export default function AddPersonForm({ onAdd }) {
  const [name, setName] = useState('');

  const handleAdd = () => {
    // Prevent empty submissions
    if (name.trim().length === 0) {
      Alert.alert('Validation Error', 'Please enter a name before adding.');
      return;
    }
    
    // Add person and clear input
    onAdd(name.trim());
    setName('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new name..."
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Person</Text>
      </TouchableOpacity>
    </View>
  );
}
