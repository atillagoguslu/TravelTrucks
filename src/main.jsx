import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import { Provider } from 'react-redux';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
