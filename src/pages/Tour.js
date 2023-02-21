import React, { useEffect, useRef, useState } from 'react';
import Panorama from '../components/Panorama';
import { panos } from '../assets/constants'
import styles from "../styles/Tour.module.css";
import Menu from '../components/Menu';


function Tour() {
  const psvRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [panoData, setPanoData] = useState(null);

  return (
    <div className={styles.tour}>
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