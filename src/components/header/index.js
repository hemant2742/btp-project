import React from "react";
import { Link } from "react-router-dom";
import { TABS } from "../../utils/pages-tabs";

export default function Header() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: "10",
        right: 0,
        left: 0,
        backgroundColor: "rgb(15, 82, 186)",
      }}
    >
      <header className="text-gray-400  body-font ">
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <nav className="text-xl md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            {TABS?.map(({ label, value }) => (
              <Link
                className="mr-5 text-white hover:text-white font-medium"
                to={value}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}
