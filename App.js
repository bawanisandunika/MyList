import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import PersonItem from './components/PersonItem';
import AddPersonForm from './components/AddPersonForm';
import { styles } from './styles/appStyles';

export default function App() {
  // Initial state with John, Susan, Peter, Mary
  const [people, setPeople] = useState([
    { id: '1', name: 'John' },
    { id: '2', name: 'Susan' },
    { id: '3', name: 'Peter' },
    { id: '4', name: 'Mary' }
  ]);

  // Function to add a new person dynamically
  const addPerson = (name) => {
    setPeople((prevPeople) => [
      ...prevPeople,
      { id: Math.random().toString(), name }
    ]);
  };

  // Function to remove a person from the list
  const deletePerson = (id) => {
    setPeople((prevPeople) => prevPeople.filter(person => person.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Centered title */}
      <Text style={styles.header}>My List App</Text>

      {/* Input form to add a person */}
      <AddPersonForm onAdd={addPerson} />

      {/* List rendering using FlatList */}
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PersonItem item={item} onDelete={deletePerson} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
