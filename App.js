import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

// Import our custom components and utils
import SearchBar from './src/components/SearchBar';
import NameItem from './src/components/NameItem';
import NameModal from './src/components/NameModal';
import { loadNames, saveNames } from './src/utils/storage';

export default function App() {
  // Application State
  const [names, setNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingName, setEditingName] = useState(null);

  // Load data on initial render
  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    const storedNames = await loadNames();
    setNames(storedNames);
    setIsLoading(false);
  };

  // --- CRUD Handlers ---

  const handleSaveName = async (newNameText) => {
    let updatedNames;
    
    if (editingName) {
      // Update existing
      updatedNames = names.map((item) => 
        item.id === editingName.id ? { ...item, name: newNameText } : item
      );
    } else {
      // Check for exact duplicates before adding
      const isDuplicate = names.some(n => n.name.toLowerCase() === newNameText.toLowerCase());
      if (isDuplicate) {
        Alert.alert('Duplicate', 'This name already exists in your list.');
        return; // Don't save, let user fix it
      }
      
      // Add new
      const newNameObj = {
        id: Date.now().toString(),
        name: newNameText,
      };
      updatedNames = [newNameObj, ...names];
    }

    setNames(updatedNames);
    await saveNames(updatedNames);
    closeModal();
  };

  const handleDeleteName = (id) => {
    Alert.alert(
      "Delete Name",
      "Are you sure you want to remove this name?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            const updatedNames = names.filter(item => item.id !== id);
            setNames(updatedNames);
            await saveNames(updatedNames);
          }
        }
      ]
    );
  };

  // --- Modal Helpers ---

  const openAddModal = () => {
    setEditingName(null);
    setModalVisible(true);
  };

  const openEditModal = (item) => {
    setEditingName(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingName(null);
  };

  // --- Filter Logic ---

  const filteredNames = names.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Render Helpers ---

  const renderEmptyList = () => {
    if (isLoading) return <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />;
    
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="person-search" size={60} color="#E5E5EA" />
        <Text style={styles.emptyText}>
          {searchQuery ? "No names match your search." : "Your list is empty.\nTap the + button to add a name."}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Contacts</Text>
        <Text style={styles.headerSubtitle}>{names.length} {names.length === 1 ? 'person' : 'people'}</Text>
      </View>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* List */}
      <FlatList
        data={filteredNames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NameItem 
            item={item} 
            onEdit={openEditModal} 
            onDelete={handleDeleteName} 
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
      />

      {/* Floating Action Button */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab} onPress={openAddModal} activeOpacity={0.8}>
          <MaterialIcons name="add" size={30} color="#ffffff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Add/Edit Modal */}
      <NameModal 
        visible={modalVisible} 
        onClose={closeModal} 
        onSave={handleSaveName}
        editingName={editingName}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7', // iOS subtle gray background
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20, // Add padding for Android status bar
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8E8E93',
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 100, // Space for the FAB
    flexGrow: 1,
  },
  loader: {
    marginTop: 50,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF', // Vibrant iOS Blue
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
