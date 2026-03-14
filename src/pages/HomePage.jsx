// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.cardsLogo}>
        Лабораторная работа №2
      </h1>
      <h1 style={styles.cardsh1}>
        Выполнил студент группы 8К32 Породин Иван
      </h1>
      <div style={styles.cards}>
        <Link to="/morphing" style={styles.card}>
          <h2 style={styles.cardTitle}>Морфинг</h2>
          <p style={styles.cardText}>Плавное преобразование одного изображения в другое</p>
        </Link>
        
        <Link to="/trajectory" style={styles.card}>
          <h2 style={styles.cardTitle}>Движение</h2>
          <p style={styles.cardText}>Движение объекта по сложной траектории</p>
        </Link>
        
        <Link to="/mask" style={styles.card}>
          <h2 style={styles.cardTitle}>Маска</h2>
          <p style={styles.cardText}>Окно-маска для просмотра спрятанного изображения</p>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: 'white',
    textAlign: 'center'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    color: 'linear-gradient(90deg, #ff7e5f, #feb47b)'
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '3rem',
    opacity: 0.8
  },

  cardsLogo: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '25px auto auto',
    fontSize: '3.5rem',
  },

  cardsh1: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '50px auto 75px',
    fontSize: '2.4rem',
  },
  
  cards: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '2rem',
    width: '300px',
    textDecoration: 'none',
    color: 'white',
    transition: 'transform 0.3s ease, backgroundColor 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer'
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  cardText: {
    fontSize: '1rem',
    opacity: 0.8,
    lineHeight: '1.5'
  }
};

// Добавляем эффект наведения через глобальный стиль
const style = document.createElement('style');
style.textContent = `
  a:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 255, 255, 0.15) !important;
  }
`;
document.head.appendChild(style);

export default HomePage;