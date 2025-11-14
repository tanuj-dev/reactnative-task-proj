import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
  Image,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

import { t } from '../utils/i18n';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const { state, dispatch } = useContext(AppContext);
  const cartItems = state.cart || [];
  const language = state.language || 'en';
  const navigation = useNavigation();
  // console.log('CartScreen Rendered', { cartItems, language });

  const handleDelete = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.itemRow,
        { flexDirection: language === 'ar' ? 'row-reverse' : 'row' },
      ]}
    >
      <View style={styles.itemLeft}>
        <Text
          style={[
            styles.title,
            { textAlign: language === 'ar' ? 'right' : 'left' },
          ]}
        >
          {item.title}
        </Text>
      </View>

      <TouchableOpacity
        testID={`cart_item_delete_${item.id.match(/\d+$/)?.[0]}`}
        onPress={() => handleDelete(item.id)}
        style={styles.deleteBtn}
        accessibilityLabel={`cart_item_delete_${index + 1}`}
      >
        <Text style={styles.deleteText}>🗑️ {t(language, 'delete')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} testID="cart_screen">
      <View
        style={[
          styles.header,
          { flexDirection: language === 'ar' ? 'row-reverse' : 'row' },
        ]}
      >
        <TouchableOpacity
          testID="back_button"
          onPress={() => navigation.goBack()}
          style={[styles.backBtn]}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../assets/back-button.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle} accessibilityRole="header">
          {t(language, 'cart')}
        </Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>{t(language, 'emptyCart')}</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  backBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    color: '#111',
  },
  container: { flex: 1 },
  list: { padding: 16, paddingBottom: 32 },
  itemRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
  },
  itemLeft: {
    flex: 1,
    paddingRight: 8,
    paddingLeft: 8,
  },
  title: { fontSize: 16, color: '#111' },
  deleteBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  deleteText: { color: '#fff', fontWeight: '600' },
  emptyText: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});
