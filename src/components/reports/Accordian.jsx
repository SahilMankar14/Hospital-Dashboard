// Accordion.js

import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Importing arrow icons

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-lg overflow-hidden mb-4 ">
      <div className="border-b bg-white px-4 py-2 flex justify-between items-center cursor-pointer" onClick={toggleAccordion}>
        <h3 className="text-lg font-semibold">{title}</h3>
        {isOpen ? <FaAngleUp className="text-xl text-gray-600" /> : <FaAngleDown className="text-xl text-gray-600" />}
      </div>
      {isOpen && (
        <div className="">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
