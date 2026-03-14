// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import MorphingPage from "./pages/MorphingPage";
import TrajectoryPage from "./pages/TrajectoryPage";
import MaskPage from "./pages/MaskPage";
import Silk from "./components/Silk"; // Импортируем Silk

function App() {
  return (
    <BrowserRouter>
      {/* Silk фон на весь экран */}
      <div style={styles.background}>
        <Silk
          speed={5}
          scale={1}
          color="#240cd6" /*"#240cd6"*/
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      
      {/* Контент поверх фона */}
      <div style={styles.content}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/morphing" element={<MorphingPage />} />
          <Route path="/trajectory" element={<TrajectoryPage />} />
          <Route path="/mask" element={<MaskPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  content: {
    position: 'relative',
    zIndex: 1,
    minHeight: '100vh'
  }
};

export default App;