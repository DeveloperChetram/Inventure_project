import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { setupAuthInterceptor } from './api/api.js'; // Import the setup function

// Call the setup function with the store
setupAuthInterceptor(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);