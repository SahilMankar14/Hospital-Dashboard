import React, { useState, useEffect } from 'react';

const Liabilities = ({ startDate, endDate, data }) => {
  const [tableData, setTableData] = useState([]);
  const [clickedGroup, setClickedGroup] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [clickData, setClickData] = useState([]);
  // const [clickData1, setClickData1] = useState([]);
  const [ledgerName, setLedgerName] = useState('');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const fetchData = async (grp_name) => {
    const formattedStartDate = startDate.replaceAll('-', '');
    const formattedEndDate = endDate.replaceAll('-', '');
    const startDateInt = parseInt(formattedStartDate, 10);
    const endDateInt = parseInt(formattedEndDate, 10);

    try {
      let endpoint;
      if (clickCount === 2) {
        // Use a different endpoint on the third click
        endpoint = `http://localhost:8000/ledger/?from_date=${startDateInt}&to_date=${endDateInt}&ledger_name=${grp_name}`;
      } else {
        // Use the original endpoint on other clicks
        endpoint = `http://localhost:8000/grpsummary/?from_date=${startDateInt}&to_date=${endDateInt}&grp_name=${grp_name}`;
      }

      const response = await fetch(endpoint);
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  // const handleRowClick = async (grp_name) => {
  //   setClickCount(clickCount + 1);
  
  //   if (clickCount === 2) {
  //     // If it's the third click, set the ledger name and fetch data from the ledger endpoint
  //     setLedgerName(grp_name);
  
  //     // Fetch data from the ledger endpoint
  //     const newData = await fetchData(grp_name);
  //     const NewData={newData:newData};
  //     setClickedGroup(grp_name);
  //     setClickData(NewData);
  //     console.log(clickData);
  //   } else {
  //     // For other clicks, fetch data from the group summary endpoint
  //     const newData1 = await fetchData(grp_name);
  //     setClickedGroup(grp_name);
  //     setClickData(newData1);
  //   }
  // };

  const handleRowClick = async (grp_name) => {
    setClickCount(clickCount + 1);
  
    if (clickCount === 2) {
      // If it's the third click, set the ledger name and fetch data from the ledger endpoint
      setLedgerName(grp_name);
  
      // Fetch data from the ledger endpoint
      const newData = await fetchData(grp_name);
      console.log("New data after third click:", newData);
      setClickedGroup(grp_name);
      setClickData(newData);
    } else {
      // For other clicks, fetch data from the group summary endpoint
      const newData1 = await fetchData(grp_name);
      console.log("New data after other clicks:", newData1);
      setClickedGroup(grp_name);
      setClickData(newData1);
    }
  };
  
  

  const renderTable = () => {
    switch (clickCount) {
      case 0:
        return renderFirstClickTable();
      case 1:
        return renderSecondClickTable();
      case 2:
        return renderThirdClickTable();
      default:
        return null;
    }
  };

  const renderFirstClickTable = () => {
    return (
      <div className="border border-gray-200">
        <table className="table-auto border-collapse w-full">
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="hover:bg-purple-600 hover:text-white" onClick={() => handleRowClick(item.Category)}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx} className="border border-gray-300 p-5">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSecondClickTable = () => {
    return (
      <div className="border border-gray-200">
        <table className="table-auto border-collapse w-full">
          <tbody>
            {clickData.map((item, index) => (
              <tr key={index} className="hover:bg-purple-600 hover:text-white" onClick={() => handleRowClick(item.Particulars)}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx} className="border border-gray-300 p-5">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderThirdClickTable = () => {
    return (
      <div className="border border-gray-200">
        <table className="table-auto border-collapse w-full">
          <tbody>
            {clickData.map((item, index) => (
              <tr key={index} className="hover:bg-purple-600 hover:text-white" onClick={() => handleRowClick(item.Particulars)}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx} className="border border-gray-300 p-5">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {renderTable()}
    </div>
  );
};

export default Liabilities;
