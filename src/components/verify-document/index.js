// import React, { useState } from "react";
// import { createWorker } from "tesseract.js";

// const QRCodeDecryptor = () => {
//   const [encodedString, setEncodedString] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const worker = createWorker();
//         await worker.load();
//         await worker.loadLanguage("eng");
//         await worker.initialize("eng");
//         const {
//           data: { text },
//         } = await worker.recognize(file);
//         await worker.terminate();
//         setEncodedString(text);
//       } catch (error) {
//         console.error(error);
//         setErrorMessage("Failed to decode QR code.");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="mb-4"
//       />
//       {encodedString ? (
//         <div className="text-center">
//           <p className="mb-4">Decoded String:</p>
//           <p className="font-bold">{encodedString}</p>
//         </div>
//       ) : (
//         <div className="text-center">
//           <p>Upload a QR code image to decode</p>
//           {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QRCodeDecryptor;
