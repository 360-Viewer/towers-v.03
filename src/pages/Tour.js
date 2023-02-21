import React, { useContext, useEffect, useRef, useState } from 'react';
import Panorama, { loadPanorama } from '../components/Panorama';
import { panos } from '../assets/constants'
import styles from "../styles/Tour.module.css";
import Menu from '../components/Menu';
import { AppContext } from '../App';


function Tour() {
  const psvRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.tour}>
      <Panorama
        psvRef={psvRef}
        pano={localStorage.getItem("pano") || panos["first-pano"]}
        panoData={localStorage.getItem("pano-data") || panos["first-pano-data"]}
        setIsLoaded={setIsLoaded}
      />
      <Menu psvRef={psvRef} />
    </div>
  )
}

export default Tour