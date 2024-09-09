// ----------------pop over without dynamic position-----------------//

// import React from "react";
// import "react-datepicker/dist/react-datepicker.css";

// const DatePopover = ({
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
//   onClose,
// }) => {
//   return (
//     <div className="absolute top-[40px] right-0 z-10 w-[250px] bg-white shadow-lg rounded-lg p-4">
//       <div className="flex justify-between items-center mb-4">
//         <span className="text-base font-medium text-gray-700 pt-2">
//           Select Period
//         </span>
//         <button
//           onClick={onClose}
//           className="text-lg font-extrabold text-gray-500 hover:text-gray-700 focus:outline-none "
//         >
//           &times; {/* This is the "×" symbol */}
//         </button>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Select start date
//         </label>
//         <input
//           type="date"
//           id="startDate"
//           name="startDate"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//       </div>
//       <div className="mt-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Select end date
//         </label>
//         <input
//           type="date"
//           id="endDate"
//           name="endDate"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };

// export default DatePopover;

// --------------------pop over dynamic position---------------------//
import React, { useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

const DatePopover = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onClose,
  position,
}) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className="absolute z-50 w-[250px] bg-white shadow-lg rounded-lg p-4"
      style={{ top: `${position.top + 5}px`, left: `${position.left}px` }}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-base font-medium text-gray-700 pt-2">
          Select Period
        </span>
        <button
          onClick={onClose}
          className="text-lg font-extrabold text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times; {/* This is the "×" symbol */}
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select start date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select end date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DatePopover;
