import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TodosContextProvider } from './context/TodosContext'; // Update to TodosContextProvider
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodosContextProvider> {/* Update to use TodosContextProvider */}
        <App />
      </TodosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
