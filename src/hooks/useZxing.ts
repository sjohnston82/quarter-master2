/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  BrowserMultiFormatReader,
  type DecodeHintType,
  type Result,
} from "@zxing/library";
import { useEffect, useMemo, useRef, useContext } from "react";
import { toast } from "react-hot-toast";
import { GlobalContext } from "~/context/GlobalContextProvider";

interface ZxingOptions {
  hints?: Map<DecodeHintType, any>;
  constraints?: MediaStreamConstraints;
  timeBetweenDecodingAttempts?: number;
  onResult?: (result: Result) => void;
  onError?: (error: Error) => void;
}

export const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: "environment",
    },
  },
  hints,
  timeBetweenDecodingAttempts = 300,
  onResult = () => {},
  onError = () => {},
}: ZxingOptions = {}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const {
    barcode,
    setBarcode,
    setShowingAddItemModal,
    setShowingBarcodeScanner,
  } = useContext(GlobalContext);
  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!ref.current) return;
    reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
      if (result) onResult(result);
      if (result !== null) {
        toast.success("Barcode found!")
        setBarcode(result);
        // setShowingAddByBarcodeModal(true);
        setShowingBarcodeScanner(false);
      }
      if (error) onError(error);
    });
    return () => {
      reader.reset();
    };
  }, [ref, reader]);

  return { ref };
};
