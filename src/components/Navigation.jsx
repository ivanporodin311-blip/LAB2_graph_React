// src/components/Navigation.jsx (обновите стили для лучшей видимости на фоне)
import { NavLink } from 'react-router-dom';
import { color } from 'three/tsl';

const Navigation = () => {
  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: isActive ? '600' : '400',
    padding: '0.5rem 1.2rem',
    borderRadius: '20px',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    backdropFilter: isActive ? 'blur(5px)' : 'none',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)' // Добавляем тень для читаемости
  });

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        <ul style={styles.navLinks}>
          <li style={styles.navItem}>
            <NavLink to="/" style={getActiveStyle}>
              Home
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="/morphing" style={getActiveStyle}>
              Морфинг
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="/trajectory" style={getActiveStyle}>
              Движение
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="/mask" style={getActiveStyle}>
              Маска
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  wrapper: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 2rem 0 2rem',
  width: 'fit-content',
  margin: '0 auto',
  boxSizing: 'border-box'
  },

  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.8rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(15px) saturate(180%)',
    borderRadius: '50px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  logo: {
    marginRight: '2rem'
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '0.5rem'
  },
  navItem: {
    margin: 0
  }
};

export default Navigation;