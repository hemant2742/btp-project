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
        backgroundColor: "rgb(128,0,0)",
      }}
    >
      <header className="text-gray-400 body-font">
        <div className="container flex-wrap p-3 flex-col md:flex-row">
          <nav className="text-xl md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-end">
            {TABS?.map(({ label, value }, index) => (
              <Link
                key={index}
                className={`mr-6 text-white hover:text-white font-medium ${index === TABS.length - 1 ? "ml-auto" : ""
                  }`}
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
