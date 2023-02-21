import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { panos } from '../assets/constants';
import Panorama from '../components/Panorama';
import moon from "../assets/icons/moon.svg";
import sun from "../assets/icons/sun.svg";
import styles from "../components/Menu.module.css";
import Redirect404 from './Redirect404';


function TourDetailed() {
  const navigate = useNavigate();
  return (
    <>
      <Redirect404 />
    </>
  )
}

export default TourDetailed