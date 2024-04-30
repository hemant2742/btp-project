import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to login page after logout
    window.location.href = "/login";
  };

  const handleNotEncodedData = () => {
    const isEncrypted = localStorage.getItem("isEncryptClicked")!== "false";
    console.log(isEncrypted)
    if (!isEncrypted) {
      toast.error("Please Encode the Data First!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } else {
     history.push("/decrypt-records");
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
      <div className="sticky top-0 z-10 right-0 left-0 bg-red-800">
        <header className="text-gray-400 body-font">
          <div className="container flex-wrap p-3 flex-col md:flex-row">
            <nav className="text-xl md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-end">
              <Link className="mr-6 text-white hover:text-white font-medium" to="/home">
                Home
              </Link>
              <Link className="mr-6 text-white hover:text-white font-medium" to="/verify">
                Verify
              </Link>
              <Link className="mr-6 text-white hover:text-white font-medium" to="/encrypt-records">
                Encrypt
              </Link>
              <span className="mr-6 text-white hover:text-white font-medium" onClick={handleNotEncodedData}>
                Decrypt
              </span>

              <a className="mr-6 text-white hover:text-white font-medium" onClick={handleLogout} href="/">
                Logout
              </a>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
