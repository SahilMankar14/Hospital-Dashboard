import React, { useState, useEffect } from 'react';

const Asset = ({ startDate, endDate, data }) => {
  const [tableData, setTableData] = useState([]);
  const [clickedGroup, setClickedGroup] = useState(null);
  const [secondClick, setSecondClick] = useState(false);
  const [secondClickData, setSecondClickData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const fetchData = async (grp_name) => {
    const formattedStartDate = startDate.replaceAll('-', '');
    const formattedEndDate = endDate.replaceAll('-', '');
    const startDateInt = parseInt(formattedStartDate, 10);
    const endDateInt = parseInt(formattedEndDate, 10);

    try {
      const response = await fetch(`http://localhost:8000/grpsummary/?from_date=${startDateInt}&to_date=${endDateInt}&grp_name=${grp_name}`);
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const handleRowClick = async (grp_name) => {
    if (clickedGroup === grp_name && secondClick) {
      // If the same group is clicked twice, fetch data for the second click
      const newData = await fetchData(grp_name);
      setSecondClickData(newData);
    } else {
      // If it's a new group or first click, fetch data for the first click
      const newData = await fetchData(grp_name);
      setClickedGroup(grp_name);
      setSecondClickData(newData);
      setSecondClick(true);
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
            {secondClickData.map((item, index) => (
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
      {secondClick ? renderSecondClickTable() : renderFirstClickTable()}
    </div>
  );
}

export default Asset;
