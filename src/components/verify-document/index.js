import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import QrScanner from "qr-scanner";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { dataDecryption } from "../../services";
import Marksheet from "../marksheet";

const QRCodeDecryptor = () => {
  const [encodedString, setEncodedString] = useState(null);
  const [marksheetData, setMarksheetData] = useState({});
  const [marksheetSubjectData, setMarksheetSubjectData] = useState({});
  const [showMarksheet, setShowMarksheet] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const result = await QrScanner.scanImage(file);
    console.log("Hhdh");
    setEncodedString(result);
  };

  const handleDecryption = async (e) => {
    e.preventDefault();
    const payload = {
      data: encodedString,
    };
    setShowMarksheet(true);
    try {
      const response = await dataDecryption(payload);
      if (response.error) {
        toast.error(response?.message || "Process failed! Please try again.");
      } else {
        const subjectData = JSON.parse(response.subjectData);
        const decryptedData = JSON.parse(response.decryptedData);
        setMarksheetData(decryptedData);
        setMarksheetSubjectData(subjectData);
        toast.success(
          response?.message ||
            "Data is successfully decrypted! Marksheet will generate in a moment."
        );
      }
    } catch (error) {
      toast.error(error?.message || "Process failed! Please Try again.");
    }
  };

  const handleDecryptionForCamera = async (encodedString) => {
    const payload = {
      data: encodedString,
    };
    setShowMarksheet(true);
    try {
      const response = await dataDecryption(payload);
      if (response.error) {
        toast.error(response?.message || "Process failed! Please try again.");
      } else {
        const subjectData = JSON.parse(response.subjectData);
        const decryptedData = JSON.parse(response.decryptedData);
        setMarksheetData(decryptedData);
        setMarksheetSubjectData(subjectData);
        toast.success(
          response?.message ||
            "Data is successfully decrypted! Marksheet will generate in a moment."
        );
      }
    } catch (error) {
      toast.error(error?.message || "Process failed! Please Try again.");
    }
  };

  useEffect(() => {
    async function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
      await handleDecryptionForCamera(decodedResult.decodedText);
      scanner.clear();
    }

    let config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      // Only support camera scan type.
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    let scanner = new Html5QrcodeScanner("reader", config, false);
    scanner.render(onScanSuccess);

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="text-center">
        <p className="text-2xl font-bold mb-4">
          Upload or Scan a QR Code Image
        </p>
        <p className="text-lg mb-8 text-gray-600">
          Decrypt and Generate Marksheet
        </p>
      </div>
      <div className="mb-8">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-4 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
        type="submit"
        onClick={handleDecryption}
      >
        Submit
      </button>
      <div id="reader" className="h-1/3 w-1/3 mt-8"></div>
      {showMarksheet && (
        <div className="m-4">
          <Marksheet
            marksheetData={marksheetData}
            marksheetSubjectData={marksheetSubjectData}
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeDecryptor;
