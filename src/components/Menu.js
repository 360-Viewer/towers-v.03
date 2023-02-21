import React, { useContext, useEffect, useState } from 'react';
import { panos } from '../assets/constants';
import styles from "./Menu.module.css";
import moon from "../assets/icons/moon.svg";
import sun from "../assets/icons/sun.svg";
import right from "../assets/icons/right.svg";
import right_active from "../assets/icons/right-active.svg";
import loader from "../assets/icons/loader.svg";
import { useNavigate } from 'react-router-dom'
import { loadPanorama } from './Panorama';
import { AppContext } from '../App';

const TimeItem = ({ psvRef, time, currentPanoProps, setCurrentPanoProps }) => {
  const appContext = useContext(AppContext);
  const { setPanoChanged } = appContext;

  function handleClick() {
    const newTime = currentPanoProps.time === "Day" ? "Night" : "Day";
    setCurrentPanoProps({ ...currentPanoProps, time: newTime });
    loadPanorama(psvRef,
      panos[currentPanoProps.block][currentPanoProps.level][newTime],
      panos[currentPanoProps.block][currentPanoProps.level]["panoData"],
      setPanoChanged);
  }
  return (
    <button className={styles.viewButton} onClick={handleClick}>
      <img
        src={currentPanoProps.time === "Day" ? moon : sun}
        className={styles.icon} />
    </button>
  )
}

const LevelItem = ({ psvRef, level, currentPanoProps, setCurrentPanoProps }) => {
  const [isActive, setIsActive] = useState(false);
  const appContext = useContext(AppContext);
  const { setPanoChanged } = appContext;

  useEffect(() => {
    setIsActive(level === currentPanoProps.level);
  }, [level, currentPanoProps.level]);

  function handleClick() {
    setCurrentPanoProps({ ...currentPanoProps, level: level });
    loadPanorama(psvRef,
      panos[currentPanoProps.block][level][currentPanoProps.time],
      panos[currentPanoProps.block][level]["panoData"],
      setPanoChanged);

    // print pano, pano-data and pano-props
    console.log("pano: ", panos[currentPanoProps.block][level][currentPanoProps.time]);
    console.log("pano-data: ", panos[currentPanoProps.block][level]["panoData"]);
    console.log("pano-props: ", { ...currentPanoProps, level: level });

    // save pano, pano-data and pano-props to local storage
    // localStorage.setItem("pano", panos[currentPanoProps.block][level][currentPanoProps.time]);
    // localStorage.setItem("pano-data", panos[currentPanoProps.block][level]["panoData"]);
    // localStorage.setItem("pano-props", JSON.stringify({ ...currentPanoProps, level: level }));
  }

  return (
    <button
      className={`${styles.verticalContainerItem} ${isActive ? styles.verticalContainerItemActive : ""}`}
      onClick={handleClick}>
      <p className={`${styles.text} ${isActive ? styles.textActive : ""}`}>
        {level}
      </p>
    </button>
  )
}

const BlockItem = ({ psvRef, block, currentPanoProps, setCurrentPanoProps }) => {
  const [isActive, setIsActive] = useState(false);
  const appContext = useContext(AppContext);
  const { setPanoChanged } = appContext;

  useEffect(() => {
    setIsActive(block === currentPanoProps.block);
  }, [block, currentPanoProps.block]);

  function handleClick() {
    setCurrentPanoProps({ ...currentPanoProps, block: block, level: Object.keys(panos[block])[0] });
    loadPanorama(psvRef,
      panos[block][Object.keys(panos[block])[0]][currentPanoProps.time],
      panos[block][Object.keys(panos[block])[0]]["panoData"],
      setPanoChanged);
  }

  return (
    <button
      className={`${styles.verticalContainerItem} ${isActive ? styles.verticalContainerItemActive : ""}`}
      onClick={handleClick}>
      <p className={`${styles.text} ${isActive ? styles.textActive : ""}`}>
        {block}
      </p>
    </button>
  )
}

function Menu({ psvRef }) {
  const [currentPanoProps, setCurrentPanoProps] = useState(localStorage.getItem("pano-props") || panos["first-pano-props"]);

  function handleTimeClick() { }

  return (
    <div>
      <div className={styles.verticalContainer} style={{ left: "12px", top: "12px" }}>
        <TimeItem
          psvRef={psvRef}
          time={currentPanoProps.time}
          currentPanoProps={currentPanoProps}
          setCurrentPanoProps={setCurrentPanoProps}

        />
        {Object.keys(panos[currentPanoProps.block]).map((level) => {
          return (
            <LevelItem
              key={level}
              psvRef={psvRef}
              level={level}
              currentPanoProps={currentPanoProps}
              setCurrentPanoProps={setCurrentPanoProps}
            />
          );
        })}
      </div>
      <div className={styles.verticalContainer} style={{ right: "12px", top: "12px" }}>
        {panos["blocks"].map((block) => {
          return (
            <BlockItem
              key={block}
              psvRef={psvRef}
              block={block}
              currentPanoProps={currentPanoProps}
              setCurrentPanoProps={setCurrentPanoProps}
            />
          );
        })}
      </div>
    </div>
  )
}

export default Menu
