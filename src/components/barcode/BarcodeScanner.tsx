/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext } from "react";
import { useZxing } from "../../hooks/useZxing";
import Button from "../ui/Button";
import { GlobalContext } from "~/context/GlobalContextProvider";

const BarcodeScanner = ({ onResult = () => {}, onError = () => {} }) => {
  const { ref } = useZxing({ onResult, onError });
  const { setShowingBarcodeScanner } = useContext(GlobalContext);

  return (
    <div className="">
      <div className="flex justify-end w-full my-2 mr-4 ">
        <Button
          fontSize="text-sm"
          onClick={() => setShowingBarcodeScanner(false)}
          className="my-2"
        >
          Close Camera
        </Button>
      </div>
      <video ref={ref} autoPlay={true} className="w-full" />

    </div>
  );
};

export default BarcodeScanner;
