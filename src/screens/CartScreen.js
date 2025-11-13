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
// import back-button.png from '../assets/back-button.png';
import { t } from '../utils/i18n';
import { useNavigation } from '@react-navigation/native';
// import { Image } from 'react-native/types_generated/index';

export default function CartScreen() {
  const { state, dispatch } = useContext(AppContext);
  //   const [isrtl, setIsrtl] = React.useState(I18nManager.isRTL);
  const cartItems = state.cart;
  const language = state.language;
  const navigation = useNavigation();
  console.log('CartScreen Rendered', { cartItems, language });

  const handleDelete = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.itemRow,
        {
          flexDirection: language === 'ar' ? 'row-reverse' : 'row',
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            marginRight: language === 'ar' ? 0 : 180,
            marginLeft: language === 'ar' ? 180 : 0,
          },
        ]}
      >
        {item.title}
      </Text>
      <TouchableOpacity
        testID={`cart_item_delete_${index + 1}`}
        onPress={() => handleDelete(item.id)}
        style={styles.deleteBtn}
      >
        <Text style={styles.deleteText}>🗑️ {t(language, 'delete')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} testID="cart_screen">
      {/* Header with Back Button */}
      <View
        style={[
          styles.header,
          { flexDirection: language === 'ar' ? 'row-reverse' : 'row' },
        ]}
      >
        <TouchableOpacity
          testID="back_button"
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, language === 'ar' && styles.backBtnRTL]}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../assets/back-button.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t(language, 'cart')}</Text>
        <View style={{ width: 40 }} /> {/* Spacer for symmetry */}
      </View>

      {/* Cart Items */}
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>{t(language, 'emptyCart')}</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
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
  backBtnRTL: {
    transform: [{ rotateY: '180deg' }],
  },
  backText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  container: { flex: 1 },
  list: { padding: 16 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  title: { fontSize: 16, flex: 1, marginRight: 180 },
  deleteBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
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
