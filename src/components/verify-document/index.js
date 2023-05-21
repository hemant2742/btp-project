import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import QrScanner from "qr-scanner";
import {Html5QrcodeScanner, Html5QrcodeScanType} from 'html5-qrcode';
import { dataDecryption } from "../../services";
import Marksheet from "../marksheet";

const QRCodeDecryptor = () => {
    const [encodedString, setEncodedString] = useState(null);
    const [, setFile] = useState(null);
    const [marksheetData, setMarksheetData] = useState({});
    const [marksheetSubjectData, setMarksheetSubjectData] = useState({});
    const [showMarksheet, setShowMarksheet] = useState(false);
    

     const handleFileChange = async (e) => {
      const file = e.target.files[0];
      setFile(file);
      const result = await QrScanner.scanImage(file);
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
        scanner.stop();
      };
    }, []);

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <p>Upload a QR code image to decode</p>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mt-4 rounded"
          type="submit"
          onClick={handleDecryption}
        >
          Submit
        </button>
        <div id="reader" className="h-1/3 w-1/3"></div>
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
