import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize';
import './assets/styles/styles.css';
import App from './App/App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import ReactModal from 'react-modal';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// clientId={GOOGLE_CLIENT_ID} додати до GoogleOAuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <GoogleOAuthProvider
            clientId={GOOGLE_CLIENT_ID}
            onScriptLoadError={() =>
              console.error('Google script failed to load')
            }
          >
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

ReactModal.setAppElement('#root');
