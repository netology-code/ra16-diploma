//ошибка 404
import { Link } from 'react-router-dom';
// import styles from './not-found.module.css';

export const NotFoundPage = () => {
  return (
    <div>
      <h2>404</h2>
      <p>Такой страницы нет!</p>
      <br />
      <br />
      <Link to="/">
        <button>Вернуться на главную</button>
      </Link>
    </div>
  );
};
