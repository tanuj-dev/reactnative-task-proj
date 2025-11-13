import React from 'react';

import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider, AppContext } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  // enableScreens();

  const { state } = React.useContext(AppContext);

  // React.useEffect(() => {
  //   const isRTL = state.language === 'ar';
  //   if (I18nManager.isRTL !== isRTL) {
  //     I18nManager.allowRTL(true);
  //     I18nManager.forceRTL(isRTL);
  //   }
  // }, [state.language]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Cart"
          component={CartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
