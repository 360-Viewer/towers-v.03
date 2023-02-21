import React, { useContext, useEffect, useState } from 'react';
import { panos } from '../assets/constants';
import styles from "./Menu.module.css";
import moon from "../assets/icons/moon.svg";
import sun from "../assets/icons/sun.svg";
import { loadPanorama } from './Panorama';
import { AppContext } from '../App';

export const TimeItem = ({ psvRef, currentPanoProps, setCurrentPanoProps }) => {
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
        {block.replace(/-/g, ' ')}
      </p>
    </button>
  )
}

function Menu({ psvRef }) {
  const [currentPanoProps, setCurrentPanoProps] = useState(localStorage.getItem("pano-props") || panos["first-pano-props"]);
  const [levelsHovered, setLevelsHovered] = useState(true);
  const [blockHovered, setBlockHovered] = useState(true);
  const [timeHovered, setTimeHovered] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLevelsHovered(false);
      setBlockHovered(false);
      setTimeHovered(false);
    }, 2000);
  }, []);

  return (
    <>
      <div className={styles.verticalContainer}
        onMouseEnter={() => {
          setLevelsHovered(true);
          setTimeHovered(true);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setLevelsHovered(false);
            setTimeHovered(false);
          }, 2000);
        }}
        style={{
          left: "12px", top: "12px",
          opacity: levelsHovered || timeHovered ? 1 : 0.3,
          transition: levelsHovered || timeHovered ? "opacity 0.5s" : "opacity 0.5s 2s",
        }}>
        <div className={styles.verticalContainerItem} style={{ marginBottom: "5px" }}>
          <TimeItem
            psvRef={psvRef}
            currentPanoProps={currentPanoProps}
            setCurrentPanoProps={setCurrentPanoProps}
          />
        </div>
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
        <div onMouseEnter={() => setBlockHovered(true)}
          onMouseLeave={() => {
            setTimeout(() => {
              setBlockHovered(false);
            }, 2000);
          }}
          style={{
            opacity: blockHovered ? 1 : 0.3,
            transition: blockHovered ? "opacity 0.5s" : "opacity 0.5s 2s",
          }}>
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
    </>
  )
}

export default Menu
