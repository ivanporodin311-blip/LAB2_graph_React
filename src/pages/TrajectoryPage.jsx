// src/pages/TrajectoryPage.jsx
import { useEffect, useRef } from 'react';

const TrajectoryPage = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Параметры спирографа
    const R = 150; // Радиус большого круга
    const r = 24;  // Радиус маленького круга
    const d = 50;  // Расстояние от центра маленького круга до точки
    
    const drawTrajectory = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'; // Золотой цвет
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      // Рисуем траекторию спирографа
      for (let t = 0; t <= Math.PI * 20; t += 0.05) {
        // Формула спирографа (гипоциклоида)
        const x = 300 + (R - r) * Math.cos(t) + d * Math.cos((R - r) * t / r);
        const y = 200 + (R - r) * Math.sin(t) - d * Math.sin((R - r) * t / r);
        
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      /*
      // Рисуем фон
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      */      
      // Рисуем траекторию спирографа
      drawTrajectory();
      
      // Увеличиваем время
      timeRef.current += 0.00301;
      
      // Вычисляем позицию объекта по траектории спирографа
      const t = timeRef.current;
      
      // Формула спирографа
      const x = 300 + (R - r) * Math.cos(t) + d * Math.cos((R - r) * t / r);
      const y = 200 + (R - r) * Math.sin(t) - d * Math.sin((R - r) * t / r);
      
      
      // Рисуем корону
      ctx.font = ' 30px "Segoe UI", Arial, sans-serif';
      ctx.fillText('🚗', x - 17, y + 10);
      
      // Сбрасываем настройки
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Фигура Спирограф (Рулетты) - сложная траектория</h1>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={400} 
        style={styles.canvas}
      />
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
  canvas: {
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#1a1a2e'
  }
};

export default TrajectoryPage;