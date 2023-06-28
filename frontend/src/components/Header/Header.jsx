import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import logoImg from '../../img/header-logo.png';
import { useState } from 'react';

export function Header() {
  const navigate = useNavigate();

  const activeLink = ({ isActive }) =>
    isActive ? 'nav-item active' : 'nav-item';
  const [activeSearch, setActiveSearch] = useState(false);
  const [value, setValue] = useState('');

  const onCart = () => {
    navigate('/cart.html');
  };

  const onSearch = () => {
    setActiveSearch(!activeSearch);
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Logo src={logoImg} />
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className={activeLink}>
                  <NavLink className="nav-link" to="/" activeclassname="active">
                    Главная
                  </NavLink>
                </li>
                <li className={activeLink}>
                  <NavLink
                    className="nav-link"
                    to="/catalog.html"
                    activeclassname="active"
                  >
                    Каталог
                  </NavLink>
                </li>
                <li className={activeLink}>
                  <NavLink
                    className="nav-link"
                    to="/about.html"
                    activeclassname="active"
                  >
                    О магазине
                  </NavLink>
                </li>
                <li className={activeLink}>
                  <NavLink
                    className="nav-link"
                    to="/contacts.html"
                    activeclassname="active"
                  >
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={onSearch}
                  ></div>
                  {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                  <div
                    className="header-controls-pic header-controls-cart"
                    onClick={onCart}
                  >
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                {activeSearch && (
                  <form
                    data-id="search-form"
                    className={
                      activeSearch
                        ? 'header-controls-search-form form-inline'
                        : 'header-controls-search-form form-inline invisible'
                    }
                  >
                    <input
                      className="form-control"
                      placeholder="Поиск"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </form>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
