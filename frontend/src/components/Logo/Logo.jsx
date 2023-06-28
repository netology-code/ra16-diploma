import { NavLink } from 'react-router-dom';

export default function Logo({ src }) {
  return (
    <NavLink to="/" className="navbar-brand">
      <img src={src} alt="Bosa Noga" />
    </NavLink>
  );
}
