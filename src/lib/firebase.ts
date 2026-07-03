import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyA...',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'example.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'example-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'example.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456:web:123'
};

// Attempt to load from JSON if available (AI Studio environment)
try {
  // @ts-ignore
  const localConfig = import('../../firebase-applet-config.json');
  localConfig.then((config) => {
    if (config.default) {
       Object.assign(firebaseConfig, config.default);
    }
  }).catch(() => {}); // Catch missing file at runtime
} catch (e) {
  // Ignore
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

const requestedScopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.activity',
  'https://www.googleapis.com/auth/drive.activity.readonly',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.apps.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.install',
  'https://www.googleapis.com/auth/drive.meet.readonly',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.scripts'
];

requestedScopes.forEach(scope => googleAuthProvider.addScope(scope));
