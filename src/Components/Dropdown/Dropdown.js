import { DropdownProvider } from "Contexts/Dropdown-context";
import React from "react";

const Dropdown = ({
  children,
  ...props
}) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">
        {children}
      
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
