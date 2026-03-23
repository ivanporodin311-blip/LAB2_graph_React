// src/pages/MorphingPage.jsx
import { useEffect, useRef } from 'react';
import { useAssetPath } from '../hooks/useAssetPath';

const MorphingPage = () => {
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);
  const { getPath } = useAssetPath();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const slider = sliderRef.current;
    const w = 550, h = 350;

    const img1 = new Image();
    const img2 = new Image();
    
    // ✅ Используем getPath для правильных путей
    img1.src = getPath('videos/photo6.jpg');
    img2.src = getPath('videos/photo7.jpg');
    
    img1.crossOrigin = 'anonymous';
    img2.crossOrigin = 'anonymous';

    let imagesLoaded = 0;
    
    const checkImagesLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) {
        renderMorph(0.5);
      }
    };

    const drawImageScaled = (img, ctx, w, h) => {
      const scaleX = w / img.width;
      const scaleY = h / img.height;
      const scale = Math.min(scaleX, scaleY);
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      const x = (w - newWidth) / 2;
      const y = (h - newHeight) / 2;
      ctx.drawImage(img, x, y, newWidth, newHeight);
    };

    const getImageData = (img) => {
      drawImageScaled(img, ctx, w, h);
      return ctx.getImageData(0, 0, w, h);
    };

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

    const handleSliderChange = (e) => {
      renderMorph(parseFloat(e.target.value));
    };

    const handleCanvasClick = () => {
      slider.value = '0.5';
      renderMorph(0.5);
    };

    slider.addEventListener('input', handleSliderChange);
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      slider.removeEventListener('input', handleSliderChange);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [getPath]);

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        <div style={styles.morphContainer}>
          <canvas 
            ref={canvasRef}
            width="550" 
            height="350" 
            style={styles.canvas}
          />
          <div style={styles.sliderWrapper}>
            <input 
              ref={sliderRef}
              type="range" 
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
  morphContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
  },
  canvas: {
    width: '100%',
    maxWidth: '700px',
    height: 'auto',
    borderRadius: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  },
  sliderWrapper: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  },
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '50px',
    background: 'linear-gradient(90deg, #0066ff, #ff7f50)',
    WebkitAppearance: 'none',
    appearance: 'none',
    outline: 'none',
    cursor: 'pointer'
  },
};

export default MorphingPage;