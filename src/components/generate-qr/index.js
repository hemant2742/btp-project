import { useState } from "react";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { dataEncryption } from "../../services";

function GenerateQr() {
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [qrData, setQrData] = useState({});
  const [encryptedData, setEncryptedData] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setQrData({
      ...qrData,
      [subject]: marks,
    });

    setSubject("");
    setMarks("");
  }

  const handleDataEncryption = async (e) => {
    e.preventDefault();
    const payload = {
      data: qrData,
    };
    try {
      const response = await dataEncryption(payload);
      if(response.data.error)
      {
        toast.error(
        response?.data.message ||
          "Data is successfully encrypted! QR will generate in a moment."
      );
      }
      else
      {
      setEncryptedData(response.data.encryptedData)
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
    if(file)
    {
      Papa.parse(file, {
        header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setQrData(results.data);
      },
      })
    }
  }

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
  
  console.log(encryptedData);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8 pt-8">
        Upload the CSV to generate QRS
      </h1>
     
        <input
          type="file"
          name="file"
          icon='file text outline'
          iconPosition='left'
          label='Upload CSV'
          labelPosition='right'
          placeholder='UploadCSV...'
          onChange={handleCSVConversion}
         />
         <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6  rounded"
                type="submit"
                onClick={handleDataEncryption}
                disabled={!qrData}
          >Submit</button>
       {/*{Object.keys(qrData).length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Subjects List:</h2>
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Marks Obtained
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(qrData).map(([subject, marks]) => (
                <tr key={subject}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{marks}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
            type="submit"
            onClick={handleDataEncryption}
          >
            Genarate QR
          </button>
        </div>
      )}
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
                disabled={!qrData}
              >
                Download QR
              </button>
            </div>
          </div>
        </div>
      )} */}
      
    </div>
  );
}

export default GenerateQr;
