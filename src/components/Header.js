import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { t } from '../utils/i18n';

export default function Header({ language, onSettings }) {
  const { state } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        { flexDirection: language === 'ar' ? 'row-reverse' : 'row' },
      ]}
    >
      <Text style={styles.title}>{t(state.language, 'home')}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          testID="cart_icon"
          onPress={() => navigation.navigate('Cart')}
        >
          <Text>🛒 {state.cart.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="settings_icon" onPress={onSettings}>
          <Text>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 16 },
});
