// src/pages/MaskPage.jsx
import { useEffect, useRef, useState } from 'react';

const MaskPage = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 300, y: 200 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsMoving(true);
    };

    const handleMouseLeave = () => {
      setIsMoving(false);
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Перемещайте мышь по изображению, чтобы увидеть спрятанную картинку</h1>
      
      <div 
        ref={containerRef}
        style={styles.maskContainer}
      >
        {/* Фоновое изображение (видимое всегда) */}
        <img 
          src="\videos\photo1.jpg"
          style={styles.backgroundImage}
          alt="Background"
        />
        
        {/* Спрятанное изображение с маской */}
        <div 
          style={{
            ...styles.hiddenLayer,
            WebkitMaskImage: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, transparent 99%, black 100%)`,
            maskImage: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, transparent 99%, black 100%)`,
            opacity: isMoving ? 1 : 0.8
          }}
        >
          <img 
            src="\videos\photo2.jpg"
            style={styles.hiddenImage}
            alt="Hidden"
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Вот это нужно вместо flexDirection
  maxWidth: '700px',
  fontSize: '2rem',
  marginBottom: '1rem',
  textAlign: 'center', // Добавьте для надежности
  width: '100%' // Чтобы занимал всю ширину
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    opacity: 0.8
  },
  maskContainer: {
    position: 'relative',
    width: '600px',
    height: '400px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    cursor: 'crosshair'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  hiddenLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskComposite: 'exclude',
    maskComposite: 'exclude',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  },
  hiddenImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  hint: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    backdropFilter: 'blur(5px)',
    pointerEvents: 'none',
    whiteSpace: 'nowrap'
  }
};

export default MaskPage;