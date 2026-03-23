// src/pages/MorphingPage.jsx
import { useEffect, useRef } from 'react';
const baseUrl = import.meta.env.BASE_URL || '';
const MorphingPage = () => {
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const slider = sliderRef.current;
    const w = 550, h = 350;

    // Загружаем изображения из директории
    const img1 = new Image();
    const img2 = new Image();
    
    // Укажите пути к вашим изображениям
    img1.src =`${baseUrl}/videos/photo6.jpg`;
    img2.src = `${baseUrl}/videos/photo7.jpg`;
    
    img1.crossOrigin = 'anonymous';
    img2.crossOrigin = 'anonymous';

    let imagesLoaded = 0;
    
    const checkImagesLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) {
        renderMorph(0.5);
      }
    };

    // Функция для рисования изображения с масштабированием и черным фоном
    const drawImageScaled = (img, ctx, w, h) => {
      // Заливаем черным фоном
      
      // Вычисляем коэффициент масштабирования чтобы изображение поместилось
      const scaleX = w / img.width;
      const scaleY = h / img.height;
      
      // Используем меньший коэффициент чтобы изображение полностью поместилось
      const scale = Math.min(scaleX, scaleY);
      
      // Вычисляем новые размеры с сохранением пропорций
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      
      // Вычисляем позицию для центрирования
      const x = (w - newWidth) / 2;
      const y = (h - newHeight) / 2;
      
      // Рисуем масштабированное изображение
      ctx.drawImage(img, x, y, newWidth, newHeight);
    };

    // Функция получения данных пикселей
    const getImageData = (img) => {
      drawImageScaled(img, ctx, w, h);
      return ctx.getImageData(0, 0, w, h);
    };

    // Функция морфинга
    const renderMorph = (t) => {
      const dataA = getImageData(img1);
      const dataB = getImageData(img2);
      
      const blended = ctx.createImageData(w, h);
      for (let i = 0; i < dataA.data.length; i += 4) {
        blended.data[i] = dataA.data[i] * (1 - t) + dataB.data[i] * t;
        blended.data[i + 1] = dataA.data[i + 1] * (1 - t) + dataB.data[i + 1] * t;
        blended.data[i + 2] = dataA.data[i + 2] * (1 - t) + dataB.data[i + 2] * t;
        blended.data[i + 3] = 255;
      }
      ctx.putImageData(blended, 0, 0);
    };

    img1.onload = checkImagesLoaded;
    img2.onload = checkImagesLoaded;

    slider.addEventListener('input', (e) => {
      renderMorph(parseFloat(e.target.value));
    });

    canvas.addEventListener('click', () => {
      slider.value = 0.5;
      renderMorph(0.5);
    });

    return () => {
      slider.removeEventListener('input', (e) => {
        renderMorph(parseFloat(e.target.value));
      });
      canvas.removeEventListener('click', () => {
        slider.value = 0.5;
        renderMorph(0.5);
      });
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        <div style={styles.morphContainer}>
          <canvas 
            ref={canvasRef}
            id="morphCanvas" 
            width="500" 
            height="350" 
            style={styles.canvas}
          />
          <div style={styles.sliderWrapper}>
            <input 
              ref={sliderRef}
              type="range" 
              id="morphSlider" 
              min="0" 
              max="1" 
              step="0.01" 
              defaultValue="0.5"
              style={styles.slider}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Стили
const styles = {
  container: {
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  glassCard: {
    maxWidth: '700px',
    width: '100%',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 300,
  },
  titleSpan: {
    background: 'linear-gradient(135deg, #ffb347, #ff7f50)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 600
  },
  morphContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
  },
  canvas: {
    width: '99%',
    maxWidth: '700px',
    height: '99%',
    borderRadius: '40px',
    backdropFilter: 'blur(10px)',
    border: '15px solid rgba(255, 255, 255, 0.15)',
    cursor: 'pointer'
  },
  sliderWrapper: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  },
  sliderLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: '#0066ff',
    fontSize: '1.2rem',
    fontWeight: 500
  },
  slider: {
    width: '100%',
    height: '15px',
    borderRadius: '50px',
    background: 'linear-gradient(90deg, #000000, #ffffff)',
    WebkitAppearance: 'none',
    appearance: 'none',
    outline: 'none'
  },
  hint: {
    
    fontSize: '1.1rem',
    background: 'rgba(255, 0, 0, 0.3)',
    padding: '10px 25px',
    borderRadius: '50px',
    border: '1px solid #ffffff',
    marginTop: '10px'
  },
};

// Стили для ползунка
const sliderStyles = document.createElement('style');
sliderStyles.textContent = `
  #morphSlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 35px;
    height: 35px;
    background: white;
    border-radius: 50%;
    border: 4px solid #000000;
    cursor: pointer;
    transition: 0.1s;
  }
  #morphSlider::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    background: #ffffe0;
  }
`;
document.head.appendChild(sliderStyles);

export default MorphingPage;