// src/pages/MorphingPage.jsx
import { useEffect, useRef, useState } from 'react';

const MorphingPage = () => {
  const canvasRef = useRef(null);
  const [isMorphing, setIsMorphing] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef(null);

  // Точки для звезды (5-конечная звезда)
  const starPoints = [
    { x: 0, y: -100 },     // верхняя точка
    { x: 30, y: -30 },     // правая верхняя
    { x: 95, y: -30 },     // правая
    { x: 50, y: 10 },      // правый нижний
    { x: 60, y: 80 },      // нижний правый
    { x: 0, y: 40 },       // центр низ
    { x: -60, y: 80 },     // нижний левый
    { x: -50, y: 10 },     // левый нижний
    { x: -95, y: -30 },    // левый
    { x: -30, y: -30 }     // левый верхний
  ];

  // Точки для квадрата
  const squarePoints = [
    { x: -70, y: -70 },    // верхний левый
    { x: 70, y: -70 },     // верхний правый
    { x: 70, y: 70 },      // нижний правый
    { x: -70, y: 70 },     // нижний левый
    { x: -70, y: -70 },    // возврат к началу для замыкания
    { x: 70, y: -70 },
    { x: 70, y: 70 },
    { x: -70, y: 70 },
    { x: -70, y: -70 },
    { x: 70, y: -70 }
  ];

  // Интерполирует точки между звездой и квадратом
  const interpolatePoints = (star, square, t) => {
    return star.map((point, index) => ({
      x: point.x + (square[index].x - point.x) * t,
      y: point.y + (square[index].y - point.y) * t
    }));
  };

  // Рисует фигуру по точкам
  const drawShape = (points, ctx, width, height) => {
    if (points.length < 3) return;

    ctx.beginPath();
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.moveTo(centerX + points[0].x, centerY + points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(centerX + points[i].x, centerY + points[i].y);
    }
    ctx.closePath();
    
    ctx.fillStyle = '#240cd6';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Анимация морфинга
  const startMorphing = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    setIsMorphing(true);
    const startTime = performance.now();
    const duration = 2000; // 2 секунды

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentPoints = interpolatePoints(starPoints, squarePoints, newProgress);
      drawShape(currentPoints, ctx, canvas.width, canvas.height);

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsMorphing(false);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Сброс в исходное состояние (звезда)
  const resetToStar = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    setIsMorphing(true);
    const startTime = performance.now();
    const duration = 2000;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.max(1 - elapsed / duration, 0);
      setProgress(newProgress);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentPoints = interpolatePoints(starPoints, squarePoints, newProgress);
      drawShape(currentPoints, ctx, canvas.width, canvas.height);

      if (newProgress > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsMorphing(false);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Инициализация canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 600;
    
    const ctx = canvas.getContext('2d');
    drawShape(starPoints, ctx, canvas.width, canvas.height);

    // Обработка ресайза
    const handleResize = () => {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentPoints = interpolatePoints(starPoints, squarePoints, progress);
      drawShape(currentPoints, ctx, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={styles.container}>
      
      <div style={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          style={styles.canvas}
        />
        
        <div style={styles.buttonGroup}>
          <button 
            onClick={startMorphing}
            disabled={isMorphing && progress !== 1}
            style={{
              ...styles.button,
              ...styles.morphButton,
              opacity: (isMorphing && progress !== 1) ? 0.5 : 1
            }}
          >
            Морфинг в квадрат
          </button>
          
          <button 
            onClick={resetToStar}
            disabled={isMorphing && progress !== 0}
            style={{
              ...styles.button,
              ...styles.resetButton,
              opacity: (isMorphing && progress !== 0) ? 0.5 : 1
            }}
          >
            Вернуть звезду
          </button>
        </div>
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    opacity: 0.8,
    textAlign: 'center'
  },
  canvasContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem'
  },
  canvas: {
    width: '500px',
    height: '500px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  progressBarContainer: {
    width: '400px',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    transition: 'width 0.016s linear',
    borderRadius: '4px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',

  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  },
  morphButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  resetButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },
  hint: {
    fontSize: '0.9rem',
    opacity: 0.7,

    textAlign: 'center'
  }
};

export default MorphingPage;