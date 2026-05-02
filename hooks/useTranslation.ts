"use client";

import { useSystemStore } from "@/store/useSystemStore";

const translations = {
  en: {
    marketplace: "Marketplace",
    categories: "Categories",
    vendors: "Vendors",
    pricing: "Pricing",
    signIn: "Sign In",
    joinBazar: "Join Bazar",
    checkout: "Checkout Now",
    subtotal: "Subtotal",
    clearCart: "Clear Cart",
    yourCart: "Your Cart",
    shippingDetails: "Shipping Details",
    paymentMethod: "Payment Method",
    reviewOrder: "Review & Confirm",
    placeOrder: "Place Order",
    exploreHub: "Explore Marketplace",
    launchStore: "Launch Your Store",
    featuredProducts: "Featured Products",
    verifiedVendor: "Verified Vendor",
    addToCart: "Add to Cart",
    stock: "Stock",
    rating: "Rating",
    category: "Category",
    products: "Products",
  },
  np: {
    marketplace: "बजार",
    categories: "कोटिहरू",
    vendors: "विक्रेताहरू",
    pricing: "मूल्य निर्धारण",
    signIn: "साइन इन",
    joinBazar: "बजारमा जोडिनुहोस्",
    checkout: "चेकआउट गर्नुहोस्",
    subtotal: "कुल रकम",
    clearCart: "कार्ट खाली गर्नुहोस्",
    yourCart: "तपाईंको कार्ट",
    shippingDetails: "ढुवानी विवरण",
    paymentMethod: "भुक्तानी विधि",
    reviewOrder: "पुनरावलोकन र पुष्टि",
    placeOrder: "अर्डर गर्नुहोस्",
    exploreHub: "बजार अन्वेषण गर्नुहोस्",
    launchStore: "तपाईंको पसल सुरु गर्नुहोस्",
    featuredProducts: "विशेष उत्पादनहरू",
    verifiedVendor: "प्रमाणित विक्रेता",
    addToCart: "कार्टमा थप्नुहोस्",
    stock: "स्टक",
    rating: "रेटिङ",
    category: "कोटि",
    products: "उत्पादनहरू",
  }
};

export function useTranslation() {
  const { language } = useSystemStore();
  
  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || key;
  };

  return { t, language };
}
