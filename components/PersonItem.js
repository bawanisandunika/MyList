import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { styles } from '../styles/appStyles';

// Component to render individual person card
export default function PersonItem({ item, onDelete }) {
  
  // Handle tap action
  const handlePress = () => {
    Alert.alert('Selection', `You selected: ${item.name}`);
  };

  // Handle long press action
  const handleLongPress = () => {
    Alert.alert(
      'Delete Person',
      'Delete this person?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => onDelete(item.id), style: 'destructive' }
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress} 
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );
}
