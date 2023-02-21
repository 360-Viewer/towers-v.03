import React, { useContext, useEffect, useRef, useState } from 'react';
import Panorama, { loadPanorama } from '../components/Panorama';
import { panos } from '../assets/constants'
import styles from "../styles/Tour.module.css";
import Menu from '../components/Menu';
import { AppContext } from '../App';


function Tour() {
  const appContext = useContext(AppContext);
  const { setPanoChanged } = appContext;

  const psvRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [panoData, setPanoData] = useState(null);

  const nextPano = () => {
    loadPanorama(psvRef, panos["A-Block"]["L100"]["Night"], panoData, setPanoChanged);
  }

  return (
    <div className={styles.tour}>
      <button style={{ position: "absolute", top: 0, left: 0, zIndex: 1000 }} onClick={nextPano}>
        change
      </button>
      <Panorama
        psvRef={psvRef}
        pano={panos["A-Block"]["L100"]["Day"]}
        panoData={panoData}
        setIsLoaded={setIsLoaded}
      />
    </div>
  )
}

export default Tour