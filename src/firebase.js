import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvV8LhgqHMmvqWITkUaR2m35IRmxak_Oo',
  authDomain: 'e-commerce-product-store-3ade6.firebaseapp.com',
  projectId: 'e-commerce-product-store-3ade6',
  storageBucket: 'e-commerce-product-store-3ade6.firebasestorage.app',
  messagingSenderId: '306404160001',
  appId: '1:306404160001:web:463418e5714bb0da5e0600',
  measurementId: 'G-EVEQDHQN5S',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const analyticsPromise = isSupported().then((supported) => {
  if (!supported) return null;
  return getAnalytics(app);
});

