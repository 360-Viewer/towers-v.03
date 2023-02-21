import React, { useState, useEffect, useContext } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { AppContext } from "../App";
import Controls from "./Controls";
import styles from "./Panorama.module.css"

export const loadPanorama = (psvRef, pano, panoData, setPanoChanged) => {
  setPanoChanged(true);
  psvRef.current.setPanorama(pano, {
    // transition: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    showLoader: false,
    panoData: panoData,
  }).then(() => {
    setPanoChanged(false);
  });
}

function Panorama({ psvRef, pano, panoData, setIsLoaded }) {
  const appContext = useContext(AppContext);
  const { panoChanged } = appContext;

  return (
    <div className={`${styles.container} ${panoChanged ? styles.blurred : ""}`}>
      <ReactPhotoSphereViewer
        ref={psvRef}
        loadingImg={null}
        loadingTxt={null}
        width={"100%"}
        height={"100%"}
        src={pano}
        defaultZoomLvl={10}
        navbar={false}
        onReady={() => setIsLoaded(true)}
        panoData={panoData}
      ></ReactPhotoSphereViewer>
      <Controls psvRef={psvRef} />
    </div>
  )
}

export default Panorama;