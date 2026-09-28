import { useState, useEffect, useRef } from 'react';
import { initImageSequence } from './utils/frameSequence';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import AcquisitionDrawer from './components/AcquisitionDrawer';
import CustomCursor from './components/CustomCursor';
import CanvasEngine from './components/CanvasEngine';
import ScrollSections from './components/ScrollSections';

function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    initImageSequence({
      onProgress: (loadedCount, total) => {
        const percent = Math.min(100, Math.round((loadedCount / total) * 100));
        setLoadProgress(percent);
      },
      onInitialReady: () => {
        setTimeout(() => setIsInitialReady(true), 400);
      },
    });
  }, []);

  const handleAcquire = (product) => {
    setSelectedProduct(product || {
      id: 'ameer',
      name: 'Al Noble Ameer',
      concentration: '30% Extrait De Parfum',
      price: '$185',
    });
    setIsBagOpen(true);
  };

  return (
    <div className="relative text-[#f7ecd5] selection:bg-[#d4af37]/30 selection:text-white">
      <CustomCursor />
      <LoadingScreen 
        progress={loadProgress} 
        isReady={isInitialReady} 
        hasEntered={hasEntered}
        onEnter={() => setHasEntered(true)}
      />
      <Navbar onOpenBag={() => setIsBagOpen(true)} cartCount={cartCount} />

      {/*
        Architecture:
        - CanvasEngine: fixed/sticky background layer — always visible, draws frames driven by scroll
        - ScrollSections: the tall scroll spacer + all overlaid content sections
        - Footer: below everything, after scroll completes
      */}
      <CanvasEngine />
      <ScrollSections onAcquireClick={handleAcquire} />
      <Footer />

      <AcquisitionDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        selectedItem={selectedProduct}
        cartCount={cartCount}
        setCartCount={setCartCount}
      />
    </div>
  );
}

export default App;
