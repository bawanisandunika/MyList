import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@names_list';

/**
 * Loads the list of names from AsyncStorage.
 * @returns {Promise<Array>} Array of name objects { id, name }
 */
export const loadNames = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load names from storage', e);
    return [];
  }
};

/**
 * Saves the list of names to AsyncStorage.
 * @param {Array} names - Array of name objects { id, name }
 */
export const saveNames = async (names) => {
  try {
    const jsonValue = JSON.stringify(names);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save names to storage', e);
  }
};
