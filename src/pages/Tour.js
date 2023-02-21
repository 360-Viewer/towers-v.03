import React, { useRef, useState } from 'react';
import Panorama from '../components/Panorama';
import { panos } from '../assets/constants'
import styles from "../styles/Tour.module.css";
import Menu from '../components/Menu';


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
      <div>
        <Panorama
          psvRef={psvRef}
          pano={panos["first-pano"]}
          panoData={panos["first-pano-data"]}
          setIsLoaded={setIsLoaded}
        />
      </div>
      {isLoaded && <Menu psvRef={psvRef} />}
    </div>
  )
}

export default Tour