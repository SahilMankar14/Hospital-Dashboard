import React, { useEffect, useRef, useState } from 'react';

const Heading1 = ({ data, startDate, endDate }) => {
  const [header, setHeader] = useState([]); // Initialize header state
  const [initialData, setInitialData] = useState([]); // Initialize initial data as empty array
  const rowDataRef = useRef(initialData); // Use ref to store rowData
  const previousParticularsRef = useRef(null);
  const prepreviousParticularsRef =useRef(null);
  // Fetch data based on row click
  const handleRowClick = async (rowData) => {
    try {
      const formattedStartDate = startDate.replaceAll('-', '');
      const formattedEndDate = endDate.replaceAll('-', '');
      const startDateInt = parseInt(formattedStartDate, 10);
      const endDateInt = parseInt(formattedEndDate, 10);
      let endpoint = "";
  
      // Check if previous clicked row was "Sales Accounts"
      if (previousParticularsRef.current === "Sales Accounts") {
        // Hit a different endpoint based on some condition
        endpoint = "http://localhost:8000/ledger";
      }
      else if (previousParticularsRef.current=="Opening Stock") {
        // Hit a different endpoint based on some condition
        endpoint = "http://localhost:8000/stocksheetinside";
        prepreviousParticularsRef.current=previousParticularsRef.current;
      }
      else if (prepreviousParticularsRef.current=="Opening Stock") {
        // Hit a different endpoint based on some condition
        endpoint = "http://localhost:8000/stockmonthlysheetinside";
      }
      else if (rowData.Particulars === "Opening Stock") {
        endpoint = "http://localhost:8000/openingstock";
      } else if (rowData.Particulars === "Add: Purchase Accounts") {
        endpoint = "http://localhost:8000/purchasesheet";
      } else if (rowData.Particulars === "Less: Closing Stock") {
        endpoint = "http://localhost:8000/stocksheet";
      } else if (["Indirect Incomes", "Indirect Expenses", "Direct Expenses","Sales Accounts"].includes(rowData.Particulars)) {
        endpoint = "http://localhost:8000/grpsummary";
      }
  
      // Fetch data based on the determined endpoint
      if (endpoint) {
        let url = `${endpoint}/?from_date=${startDateInt}&to_date=${endDateInt}`;
        // If the endpoint is for grpsummary, add grp_name parameter
        if (rowData.Particulars === "Indirect Incomes" || rowData.Particulars === "Indirect Expenses" || 
            rowData.Particulars === "Direct Expenses" || rowData.Particulars=="Sales Accounts" || previousParticularsRef.current=="Opening Stock"){
          url += `&grp_name=${rowData.Particulars}`;
        }
        if (previousParticularsRef.current=="Sales Accounts"){
          url += `&ledger_name=${rowData.Particulars}`;
        }
        if (prepreviousParticularsRef.current=="Opening Stock"){
          url += `&stock_name=${rowData.Particulars}`;
          prepreviousParticularsRef.current=null;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const newData = await response.json();
        rowDataRef.current = newData; // Update rowData directly using ref
        // Update initial data state
        setInitialData(newData);
        // Update header based on the keys of the first object in newData
        setHeader(Object.keys(newData && newData.length > 0 ? newData[0] : {}));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
    // Update previousParticularsRef with the current row's particulars
    previousParticularsRef.current = rowData.Particulars;
  };

  // Set initial data and header when component mounts or data changes
  useEffect(() => {
    setInitialData(data);
    // Update header based on the keys of the first object in data
    setHeader(Object.keys(data && data.length > 0 ? data[0] : {}));
  }, [data]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {header.map((item, index) => (
                <th key={index} className="px-4 py-2">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {initialData.map((row, index) => (
              <tr 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-purple-500 hover:text-white`}
                onClick={() => handleRowClick(row)}
                style={{ cursor: 'pointer' }}
              >
                {Object.values(row).map((value, index) => (
                  <td key={index} className="border px-4 py-2">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Heading1;
