import React from "react";
import { useNavigate } from 'react-router-dom'
import styles from "./Controls.module.css";
import zoom_in from "../assets/icons/zoom-in.svg";
import zoom_out from "../assets/icons/zoom-out.svg";
import left from "../assets/icons/left.svg";
import right from "../assets/icons/right.svg";
import fullscreen from "../assets/icons/fullscreen.svg";
import autorotate from "../assets/icons/autorotate.svg";
import home from "../assets/icons/home.svg";


function Controls({ psvRef, homeIconExists }) {
  const navigate = useNavigate();

  const handleLeftClick = () => {
    psvRef.current.animate({
      yaw: psvRef.current.getPosition().yaw - 0.5,
      pitch: psvRef.current.getPosition().pitch,
      speed: '3rpm',
    });
  }

  const handleRightClick = () => {
    psvRef.current.animate({
      yaw: psvRef.current.getPosition().yaw + 0.5,
      pitch: psvRef.current.getPosition().pitch,
      speed: '3rpm',
    });
  }

  const handleZoomIn = () => {
    psvRef.current.animate({
      zoom: psvRef.current.getZoomLevel() + 20,
      speed: '3rpm',
    });
  }

  const handleZoomOut = () => {
    psvRef.current.animate({
      zoom: psvRef.current.getZoomLevel() - 20,
      speed: '3rpm',
    });
  }

  const handleHomeClick = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        {homeIconExists && <button onClick={handleHomeClick}>
          <img src={home} />
        </button>}
        <button onClick={handleLeftClick}>
          <img src={left} />
        </button>
        <button onClick={handleRightClick}>
          <img src={right} />
        </button>
        <button onClick={() => psvRef.current.toggleAutorotate()}>
          <img src={autorotate} />
        </button>
        <button onClick={handleZoomIn}>
          <img src={zoom_in} />
        </button>
        <button onClick={handleZoomOut}>
          <img src={zoom_out} />
        </button>
        <button onClick={() => { psvRef.current.toggleFullscreen(); }}>
          <img src={fullscreen} />
        </button>
      </div>
    </div>
  )
}

export default Controls;