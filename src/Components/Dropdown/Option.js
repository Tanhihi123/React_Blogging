import { useDropdown } from "Contexts/Dropdown-context";
import React from "react";

const Option = (props) => {
  const { onClick } = useDropdown();
  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100"
      onClick={onClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
