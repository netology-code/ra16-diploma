import { Route, Routes } from 'react-router';
import { Header } from '../Header/Header';
import { HomePage } from '../../pages/HomePage/HomePage';
import { AboutShopPage } from '../../pages/AboutShopPage/AboutShopPage';
import { Footer } from '../Footer/Footer';
import { CartPage } from '../../pages/CartPage/CartPage';
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage';
import { ContactsPage } from '../../pages/ContactsPage/ContactsPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { Bunner } from '../Banner/Banner';
import banner from '../../img/banner.jpg';

function App() {
  return (
    <>
      <Header />
      <main class="container">
        <div class="row">
          <div class="col">
            <Bunner src={banner} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart.html" element={<CartPage />} />
              <Route path="/about.html" element={<AboutShopPage />} />
              <Route path="/catalog.html" element={<CatalogPage />} />
              {/* <Route path="/catalog.html/:id" element={<CardProduct />}/> */}
              <Route path="/contacts.html" element={<ContactsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
