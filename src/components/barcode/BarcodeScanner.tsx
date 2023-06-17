/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext } from "react";
import { useZxing } from "../../hooks/useZxing";
import Button from "../ui/Button";
import { GlobalContext } from "~/context/GlobalContextProvider";

const BarcodeScanner = ({ onResult = () => {}, onError = () => {} }) => {
  const { ref } = useZxing({ onResult, onError });
  const { setShowingBarcodeScanner } = useContext(GlobalContext);

  return (
    <div className="bg-snow">
      <div className="my-2 -ml-2 flex w-full justify-end  ">
        <Button
          fontSize="text-sm"
          onClick={() => setShowingBarcodeScanner(false)}
          className="my-2 "
        >
          Close Camera
        </Button>
      </div>
      <video
        ref={ref}
        autoPlay={true}
        className="h-[calc(100vh-200px)] lg:h-[calc(100vh-182px)] w-full bg-darkgray"
      />
    </div>
  );
};

export default BarcodeScanner;
