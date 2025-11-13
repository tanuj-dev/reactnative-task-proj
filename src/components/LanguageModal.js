import React, { useContext } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from 'react-native';
import RNRestart from 'react-native-restart'; // 👈 install this package
import { AppContext } from '../context/AppContext';
import { t } from '../utils/i18n';

export default function LanguageModal({ visible, onClose }) {
  const { state, dispatch } = useContext(AppContext);

  const handleLanguageChange = lang => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });

    // const isRTL = lang === 'ar';
    // if (I18nManager.isRTL !== isRTL) {
    //   I18nManager.allowRTL(true);
    //   I18nManager.forceRTL(isRTL);
    //   RNRestart.Restart(); // 👈 triggers full app reload
    // }

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.headerText}>{t(state.language, 'language')}</Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              testID="lang_en"
              style={[
                styles.langButton,
                state.language === 'en' && styles.activeLang,
              ]}
              onPress={() => handleLanguageChange('en')}
            >
              <Text
                style={[
                  styles.langText,
                  state.language === 'en' && styles.activeText,
                ]}
              >
                {t(state.language, 'english')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="lang_ar"
              style={[
                styles.langButton,
                state.language === 'ar' && styles.activeLang,
              ]}
              onPress={() => handleLanguageChange('ar')}
            >
              <Text
                style={[
                  styles.langText,
                  state.language === 'ar' && styles.activeText,
                ]}
              >
                {t(state.language, 'arabic')}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            testID="language_modal_close"
            onPress={onClose}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>{t(state.language, 'close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
    paddingHorizontal: 20,
  },
  sheet: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
  },
  buttonGroup: {
    flexDirection: 'column',
    gap: 10,
  },
  langButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  langText: {
    fontSize: 16,
    color: '#333',
  },
  activeLang: {
    backgroundColor: '#007bff15',
    borderColor: '#007bff',
  },
  activeText: {
    color: '#007bff',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
