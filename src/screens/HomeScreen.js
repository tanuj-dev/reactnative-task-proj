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
    // Loop through the same 20 items; give unique ids per "page"
    const nextPage = page + 1;
    const nextChunk = BASE_PRODUCTS.map((p, idx) => ({
      ...p,
      id: `p${nextPage}-${idx + 1}`,
    }));
    setData(prev => [...prev, ...nextChunk]);
    setPage(nextPage);
  };

  const renderItem = ({ item, index }) => (
    <ProductCard language={language} item={item} index={index} />
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
});
