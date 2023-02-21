import React, { useState, useMemo, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './styles/App.module.css';
import Costum404 from './pages/Costum404';
import Tour from './pages/Tour';
import TourDetailed from './pages/TourDetailed';

export const AppContext = createContext();

function App() {
  const [panoChanged, setPanoChanged] = useState(false);

  // prevent right click
  // useEffect(() => {
  //   document.addEventListener("contextmenu", (e) => e.preventDefault());
  // }, []);

  const value = useMemo(() => ({
    panoChanged,
    setPanoChanged
  }), [
    panoChanged,
    setPanoChanged,
  ]);

  return (
    <div className={styles.app} onDragStart={(e) => e.preventDefault()}>
      <AppContext.Provider value={value}>
        <Routes>
          <Route path={"/"} element={<Tour />} />
          <Route path={`/:block/:level/`} element={<TourDetailed />} />
          <Route path={"/404"} element={<Costum404 />} />
          <Route path="*" element={<Costum404 />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
