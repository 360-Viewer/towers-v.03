import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { panos } from '../assets/constants';
import Panorama, { loadPanorama } from '../components/Panorama';
import moon from "../assets/icons/moon.svg";
import sun from "../assets/icons/sun.svg";
import styles from "../components/Menu.module.css";
import tourStyles from "../styles/Tour.module.css";
import Redirect404 from './Redirect404';
import { TimeItem } from '../components/Menu';


function TourDetailed() {
  const [currentPanoProps, setCurrentPanoProps] = useState(null);
  const navigate = useNavigate();
  const { block, level } = useParams();
  const psvRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (block === "test" && level === "test") {
      setCurrentPanoProps({
        block: "test",
        level: "test",
        time: "Day"
      });
    }
    else if (panos[block] && panos[block][level] && panos[block][level]["Day"]) {
      setCurrentPanoProps({
        block: block,
        level: level,
        time: "Day"
      });
    } else {
      navigate("/404");
    }
  }, [block, level, navigate]);

  return (
    <div className={tourStyles.tourDetailed}>
      {currentPanoProps &&
        <>
          <div className={styles.verticalContainer} style={{ top: "12px", left: "12px" }}>
            <div className={styles.verticalContainerItem}>
              <TimeItem
                psvRef={psvRef}
                currentPanoProps={currentPanoProps ? currentPanoProps : {}}
                setCurrentPanoProps={setCurrentPanoProps}
              />
            </div>
          </div>
          <Panorama
            psvRef={psvRef}
            pano={panos[currentPanoProps?.block][currentPanoProps?.level][currentPanoProps?.time]}
            panoData={panos[currentPanoProps?.block][currentPanoProps?.level]["panoData"]}
            setIsLoaded={setIsLoaded}
            homeIconExists={true}
          />
        </>
      }
    </div>
  )
}

export default TourDetailed