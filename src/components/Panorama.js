import React, { useState, useEffect } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import Controls from "./Controls";
import styles from "./Panorama.module.css"

export const loadPanorama = (psvRef, pano, panoData) => { }

function Panorama({ psvRef, pano, panoData, setIsLoaded }) {

  return (
    <>
      <ReactPhotoSphereViewer
        ref={psvRef}
        container={styles.container}
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
    </>
  )
}

export default Panorama;