import React from "react";
import { NavLink } from "react-router-dom";
import { Package, Plus, Boxes } from "lucide-react";
import clsx from "clsx";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Boxes className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex space-x-8">
            <NavLink
              to="/view-items"
              className={({ isActive }) =>
                clsx(
                  "flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                  isActive
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )
              }
            >
              <Package className="h-4 w-4 mr-2" />
              View Items
            </NavLink>
            <NavLink
              to="/add-item"
              className={({ isActive }) =>
                clsx(
                  "flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                  isActive
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
