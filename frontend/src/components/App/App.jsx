import { Route, Routes } from 'react-router';
import { Header } from '../Header/Header';
import { HomePage } from '../../pages/HomePage/HomePage';
import { AboutShopPage } from '../../pages/AboutShopPage/AboutShopPage';
import { Footer } from '../Footer/Footer';
import { BasketPage } from '../../pages/BasketPage/BasketPage';
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage';
import { ContactsPage } from '../../pages/ContactsPage/ContactsPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart.html" element={<BasketPage />} />
        <Route path="/about.html" element={<AboutShopPage />} />
        <Route path="/catalog.html" element={<CatalogPage />} />
        <Route path="/contacts.html" element={<ContactsPage />} />
        <Route path="/404.html" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
