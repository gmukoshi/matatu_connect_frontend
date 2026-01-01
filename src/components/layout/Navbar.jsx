import React from "react";

const Navbar = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">Matatu Connect</div>
      <nav>
        <a href="/profile" className="mx-2 hover:underline">Profile</a>
        <a href="/logout" className="mx-2 hover:underline">Logout</a>
      </nav>
    </header>
  );
};

export default Navbar;
