import React from "react";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <div className="bg-gray-200 ">
      <h1>
        <img className="h-24 py-4 mx-auto" src="/logo.png" alt="Olá galera" />
      </h1>
      <NavBar />
    </div>
  );
};

export default Header;
