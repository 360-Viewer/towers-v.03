import React, { useContext, useEffect, useRef, useState } from 'react';
import Panorama, { loadPanorama } from '../components/Panorama';
import { home_img, panos } from '../assets/constants'
import styles from "../styles/Tour.module.css";
import Menu from '../components/Menu';
import { AppContext } from '../App';
import loader from "../assets/icons/loader.svg";



function Tour() {
  const psvRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.tour}>
      {/* {!isLoaded &&
        <div className={styles.loadingScreen}>
          <img src={home_img} className={styles.home} />
        </div>
      } */}
      <div style={{ opacity: isLoaded ? 1 : 0.5 }}>
        <Panorama
          psvRef={psvRef}
          pano={localStorage.getItem("pano") || panos["first-pano"]}
          panoData={localStorage.getItem("pano-data") || panos["first-pano-data"]}
          setIsLoaded={setIsLoaded}
        />
      </div>
      {isLoaded && <Menu psvRef={psvRef} />}
    </div>
  )
}

export default Tour