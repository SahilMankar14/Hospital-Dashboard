import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import GroupList from "./components/GroupList";
import LedgerDetails from "./components/LedgerDetails";
import { hierarchicalData } from "./treeData";

const Ledgers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLedgerSelection = (ledger) => {
    setSelectedLedger(ledger);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/search?term=${searchTerm}`, {
        method: "GET",
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      handleSubmitSearch();
    }
  }, [searchTerm]);

  return (
    <div className="box-border m-2 ">
      <form
        onSubmit={handleSubmitSearch}
        className="box-border m-2 flex justify-center"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-4 w-96 h-8 border-2 border-blue-700 rounded-full"
        />
        <button type="submit" className="ml-2 ">
          <IoSearchSharp className="text-xl" />
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      <div className="box-border m-2 flex flex-row">
        <div className="box-border m-2 p-2 border-2 border-blue-700 w-1/4">
          <GroupList
            hierarchicalData={hierarchicalData}
            onLedgerSelect={handleLedgerSelection}
          />
        </div>
        <div className="box-border m-2 p-2 border-2 border-blue-700 w-3/4">
          <LedgerDetails selectedLedger={selectedLedger} />
        </div>
      </div>
    </div>
  );
};

export default Ledgers;
