import React, { useState } from "react";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";
import { dataEncryption } from "../../services";

const GenerateQR = () => {
  const [qrData, setQrData] = useState("");
  const [dataEncrypted, setDataEncrypted] = useState("");

  const handleDataEncryption = async (e) => {
    e.preventDefault();
    const payload = {
      data: qrData,
    };
    try {
      const response = await dataEncryption(payload);
      setQrData(" ");
      setDataEncrypted(response.data.encryptedData);
      toast.success(
        response?.data.message ||
          "Data is successfully encrypted! QR will generate in a moment."
      );
    } catch (error) {
      toast.error(error?.message || "Process failed! Please Try again.");
    }
  };

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadElement = document.createElement("a");
    downloadElement.href = qrCodeURL;
    downloadElement.download = "QR_Code.png";
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
  };

  return (
    <div>
      <section className="antialiased text-gray-600 py-8 px-4 ml-100">
        <div className="flex  justify-center h-full">
          <div className="bg-green-50 rounded-xl w-full max-w-2xl mx-auto py-12 border-2 rounded-2xl shadow-2xl">
            <header className="px-3 py-2 border-b border-gray-100">
              <h2 className="font-semibold text-2xl text-center">
                Enter data for QR generation
              </h2>
            </header>
            <form className="w-full max-w-sm mx-auto pt-3">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 flex items-center justify-center">
                  <textarea
                    id="data"
                    name="data"
                    value={qrData}
                    className="appearance-none block p-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 pl-8 mb-3 text-justify leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-40 resize-none"
                    onChange={(e) => setQrData(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={handleDataEncryption}
                  disabled={!qrData}
                >
                  Generate QR
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {dataEncrypted && (
        <div className="grid pb-5 place-items-center">
          <div>
            <header className=" py-5  border-b border-gray-100">
              <h2 className="font-semibold text-2xl text-center">
                Your Generated QR Code is:
              </h2>
            </header>
            <div className="flex items-center pt-2 mr->7 justify-center">
              <QRCode
                id="qrCodeEl"
                title="QR code"
                value={dataEncrypted}
                bgColor={"#FFFFFF"}
                fgColor={"#000000"}
                size={256}
              />
            </div>
            <div className="flex items-center pt-4  justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6  rounded"
                type="submit"
                onClick={downloadQRCode}
              >
                Download QR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateQR;
