import { useState } from "react";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import Papa from "papaparse";
import { dataEncryption } from "../../services";

function GenerateQr() {
  const [qrData, setQrData] = useState({});
  const [encryptedData, setEncryptedData] = useState([]);

  const handleDataEncryption = async (e) => {
    e.preventDefault();
    const payload = {
      data: qrData,
    };
    try {
      const response = await dataEncryption(payload);
      if (response.data.error) {
        toast.error(
          response?.data.message || "Process failed! Please try again."
        );
      } else {
        setEncryptedData(response.data.encryptedData);
        toast.success(
          response?.data.message ||
            "Data is successfully encrypted! QR will generate in a moment."
        );
      }
    } catch (error) {
      toast.error(error?.message || "Process failed! Please Try again.");
    }
  };

  const handleCSVConversion = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setQrData(results.data);
        },
      });
    }
  };

  const downloadQRCode = (item) => {
    const svgElement = document.getElementById(item.rollNumber);
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const DOMURL = window.URL || window.webkitURL || window;

    const img = new Image();
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      DOMURL.revokeObjectURL(url);

      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `qrcode_${item.rollNumber}.png`;
      link.click();
    };

    img.src = url;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold my-8 pt-8">
        Upload Student Details in CSV to Generate QR Codes
      </h3>

      <div className="flex flex-col items-center">
        <label htmlFor="file" className="text-lg">
          Upload CSV File:
        </label>
        <input
          type="file"
          accept=".csv"
          id="file"
          name="file"
          className="border p-2 mt-2"
          onChange={handleCSVConversion}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mt-4 rounded disabled:opacity-50"
        type="submit"
        onClick={handleDataEncryption}
        disabled={!qrData}
      >
        Generate QR Codes
      </button>

      {encryptedData.length > 0 && (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {encryptedData.map((item) => (
              <div key={item.id} className="border p-4">
                <div className="flex flex-col items-center">
                  {/* Roll number */}
                  <h3 className="text-lg font-semibold mb-2">
                    <b>Roll Number: {item.rollNumber}</b>
                  </h3>

                  {/* QR code */}
                  <QRCode
                    id={item.rollNumber}
                    title="QR Code"
                    value={item.encryptedString}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    size={130}
                  />

                  {/* Download button */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mt-2 rounded disabled:opacity-50"
                    type="submit"
                    onClick={() => downloadQRCode(item)}
                    disabled={!qrData}
                  >
                    Download QR Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateQr;
