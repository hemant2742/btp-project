// import React, { useRef, useEffect } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";

const VerifyDocument = () => {
  // const videoRef = useRef(null);
  // const codeReader = new BrowserMultiFormatReader();

  // useEffect(() => {
  //   codeReader.decodeFromVideoDevice(
  //     null,
  //     videoRef.current.id,
  //     (result, error) => {
  //       if (result) {
  //         console.log(result.getText());
  //       }
  //       if (error) {
  //         console.log(error);
  //       }
  //     }
  //   );
  // }, []);

  return (
    <>
      <div className="flex items-center justify-center pt-10">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
          Scan your QR
        </button>
      </div>
      {/* <video ref={videoRef} id="video" /> */}
    </>
  );
};

export default VerifyDocument;
