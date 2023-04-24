import React, { useState } from "react";

const GenerateQR = () => {
  const [qrData, setQrData] = useState("");

  console.log(qrData);

  // const handleGeneration = (e) => {
  //   e.preventDefault();
  //   console.log("submit button clicked");

  //   const textArea = document.getElementById("text-data");
  //   console.log(textArea.value);
  //   const qrtext = code.encryptMessage(textArea.value, "your_password");
  //   console.log(qrtext);
  //   document.getElementById("qr-result").innerHTML =
  //     "QR code for " + textArea.value + ":";
  //   alert("qr code generated successfully");
  //   qr.set({
  //     foreground: "black",
  //     size: 200,
  //     value: qrtext,
  //   });

  //   let code = (function () {
  //     return {
  //       encryptMessage: function (messageToencrypt = "", secretkey = "") {
  //         var encryptedMessage = CryptoJS.AES.encrypt(
  //           messageToencrypt,
  //           secretkey
  //         );
  //         return encryptedMessage.toString();
  //       },
  //       decryptMessage: function (encryptedMessage = "", secretkey = "") {
  //         var decryptedBytes = CryptoJS.AES.decrypt(
  //           encryptedMessage,
  //           secretkey
  //         );
  //         var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

  //         return decryptedMessage;
  //       },
  //     };
  //   })();
  //   var qr;
  //   (function () {
  //     qr = new QRious({
  //       element: document.getElementById("qr-code"),
  //       size: 200,
  //       value: "https://studytonight.com",
  //     });
  //   })();
  // };

  return (
    <div>
      <section className="antialiased text-gray-600 py-8 px-4 ml-100">
        <div className="flex flex-col justify-center h-full">
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
                    className="appearance-none block p-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 pl-8 mb-3 text-justify leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-40 resize-none"
                    onChange={(e) => setQrData(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Generate QR
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GenerateQR;
