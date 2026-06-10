import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NameItem = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.iconButton, styles.editButton]} onPress={() => onEdit(item)}>
          <MaterialIcons name="edit" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.deleteButton]} onPress={() => onDelete(item.id)}>
          <MaterialIcons name="delete" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    // Soft shadow for modern look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
    backgroundColor: '#f5f5f5',
  },
  editButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
});

export default NameItem;
