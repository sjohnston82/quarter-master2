/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useZxing } from "../../hooks/useZxing";
import Button from "../ui/Button";
import { GlobalContext } from "~/context/GlobalContextProvider";

const BarcodeScanner = ({ onResult = () => {}, onError = () => {} }) => {
  const { ref } = useZxing({ onResult, onError });
  const { setShowingBarcodeScanner } = useContext(GlobalContext);

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
      <div className="flex justify-end w-full my-2 mr-4 ">
        <Button
          fontSize="text-sm"
          onClick={() => setShowingBarcodeScanner(false)}
          className=""
        >
          Close Camera
        </Button>
      </div>
      <video ref={ref} autoPlay={true} className="w-full" />
    </div>
  );
};

export default BarcodeScanner;
