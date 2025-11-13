import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import { t } from '../utils/i18n';

export default function ProductCard({ item, index }) {
  const { state, dispatch } = useContext(AppContext);
  const isAdded = state.cart.some(i => i.id === item.id);

  const handleToggle = () => {
    // Only allow adding/removing the 4th item (index === 3)
    if (index === 3) {
      if (isAdded) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
      } else {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      }
    }
  };

  const isAllowed = index === 3;

  return (
    <View style={styles.card}>
      <Text style={{ textAlign: state.language === 'ar' ? 'right' : 'left' }}>
        {item.title}
      </Text>
      <TouchableOpacity
        testID={`product_${index + 1}_add_button`}
        onPress={handleToggle}
        disabled={!isAllowed} // disable button for non-4th items
        style={[
          styles.button,
          isAdded && styles.added,
          !isAllowed && styles.disabled,
        ]}
      >
        <Text style={styles.buttonText}>
          {isAdded
            ? t(state.language, 'added')
            : isAllowed
            ? t(state.language, 'add')
            : t(state.language, 'add')}{' '}
          {/* still shows "Add" but disabled */}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 6,
  },
  added: { backgroundColor: '#28a745' },
  disabled: { backgroundColor: '#999' }, // grey out disabled buttons
  buttonText: { color: '#fff', textAlign: 'center' },
});
