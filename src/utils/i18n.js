export const strings = {
  en: {
    home: 'Home',
    cart: 'Cart',
    add: 'Add to Cart',
    added: 'Added',
    settings: 'Settings',
    language: 'Language',
    english: 'English',
    arabic: 'Arabic',
    delete: 'Delete',
    emptyCart: 'Your cart is empty.',
    close: 'Close',
  },
  ar: {
    home: 'الرئيسية',
    cart: 'السلة',
    add: 'أضف إلى السلة',
    added: 'تمت الإضافة',
    settings: 'الإعدادات',
    language: 'اللغة',
    english: 'الإنجليزية',
    arabic: 'العربية',
    delete: 'حذف',
    emptyCart: 'سلتك فارغة.',
    close: 'إغلاق',
  },
};

export const t = (lang, key) => strings[lang]?.[key] ?? key;
