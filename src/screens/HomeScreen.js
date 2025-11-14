import React, { useState, useMemo, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import LanguageModal from '../components/LanguageModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

// 20 static products
const BASE_PRODUCTS = Array.from({ length: 20 }).map((_, i) => ({
  id: `prod-${i + 1}`,
  title: `Product ${i + 1}`,
}));

export default function HomeScreen() {
  const { state, dispatch } = useContext(AppContext);
  const cartItems = state.cart;
  const language = state.language;
  console.log('HomeScreen Rendered', { cartItems, language });
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(() =>
    BASE_PRODUCTS.map((p, idx) => ({ ...p, id: `p1-${idx + 1}` })),
  );

  const loadMore = () => {
    const nextPage = page + 1;
    const nextChunk = BASE_PRODUCTS.map((p, idx) => ({
      ...p,
      id: `p${nextPage}-${idx + 1}`,
    }));
    setData(prev => [...prev, ...nextChunk]);
    setPage(nextPage);
  };

  // 🧩 Each item now gets a unique testID for Maestro targeting
  const renderItem = ({ item, index }) => (
    <View
      testID={`product_item_${index + 1}`}
      accessible={true}
      accessibilityLabel={`product_item_${index + 1}`}
      style={styles.itemWrapper}
    >
      <ProductCard
        language={language}
        item={item}
        index={index}
        testID={`product_${index + 1}_add_button`} // optional if ProductCard uses this
      />
    </View>
  );

  const keyExtractor = useMemo(() => item => item.id, []);

  return (
    <SafeAreaView style={styles.safe} testID="home_screen">
      <Header language={language} onSettings={() => setSettingsVisible(true)} />
      <View style={styles.container}>
        <FlatList
          testID="product_list"
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.content}
          onEndReachedThreshold={0.4}
          onEndReached={loadMore}
        />
      </View>

      <LanguageModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f7f7' },
  container: { flex: 1 },
  content: { padding: 12 },
  row: { justifyContent: 'space-between' },
  itemWrapper: { flex: 1, marginBottom: 12 },
});
