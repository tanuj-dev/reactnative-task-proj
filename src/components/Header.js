import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { t } from '../utils/i18n';

export default function Header({ language, onSettings }) {
  const { state } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          { flexDirection: language === 'ar' ? 'row-reverse' : 'row' },
        ]}
      >
        <View style={styles.sidePlaceholder} />

        <Text style={styles.title}>{t(state.language, 'home')}</Text>

        <View
          style={[
            styles.actions,
            language === 'ar' && { flexDirection: 'row-reverse' },
          ]}
        >
          <TouchableOpacity
            testID="cart_icon"
            onPress={() => navigation.navigate('Cart')}
            style={styles.iconBtn}
          >
            <Text style={styles.iconText}>🛒 {state.cart.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="settings_icon"
            onPress={onSettings}
            style={styles.iconBtn}
          >
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    // backgroundColor: 'red',
    // elevation: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sidePlaceholder: {
    width: 60,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 60,
    gap: 12,
  },
  iconBtn: {
    paddingHorizontal: 6,
  },
  iconText: {
    fontSize: 18,
  },
});
