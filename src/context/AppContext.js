import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { cart: [], language: 'en' };
export const AppContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.cart.find(i => i.id === action.payload.id)) return state;
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(i => i.id !== action.payload),
      };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem('appState').then(data => {
      if (data) dispatch({ type: 'LOAD_STATE', payload: JSON.parse(data) });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
