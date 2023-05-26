/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from "react";
import { useZxing } from "../../hooks/useZxing";

const BarcodeScanner = ({ onResult = () => {}, onError = () => {} }) => {
  const { ref } = useZxing({ onResult, onError });
 
  
  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then((stream: MediaStream) => {
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //       }
  //       // startBarcodeScanning();
  //     })
  //     .catch((error: Error) => {
  //       console.error("Error accessing camera:", error);
  //     });
  // }, []);
  return (
    <div className="">
      {" "}
      <video ref={ref} autoPlay={true}  />
    </div>
  );
};

export default BarcodeScanner;
