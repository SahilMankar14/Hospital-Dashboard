import React, { useState, useEffect, useMemo } from "react";
import { Filter, FolderIcon, FileIcon, Download, Search } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchDocuments } from "./mochDoc";
import { supabase } from "../../supabaseClient";

const DocumentViewer = () => {
  const [documents, setDocuments] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      setIsLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        const userEmail = session.user.email;
        const loadDocuments = async () => {
          const fetchedDocuments = await fetchDocuments(userEmail);
          setDocuments(fetchedDocuments);
          console.log("Documents:", fetchedDocuments);
          setIsLoading(false);
        };

        loadDocuments();
      } else {
        setIsLoading(false);
      }
    };
    getDocument();
  }, []);

  const uniqueFileTypes = useMemo(() => {
    const types = new Set();
    Object.values(documents).forEach((files) => {
      files.forEach((file) => {
        types.add(file.type.toLowerCase());
      });
    });
    return Array.from(types).sort();
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    let filteredDocuments = documents;

    //  filter by file type if a file type is selected
    if (selectedFileType) {
      filteredDocuments = Object.fromEntries(
        Object.entries(filteredDocuments).map(([category, files]) => [
          category,
          files.filter(
            (file) => file.type.toLowerCase() === selectedFileType.toLowerCase()
          ),
        ])
      );
    }

    // Filter by search term if a search term is entered
    if (searchTerm) {
      filteredDocuments = Object.fromEntries(
        Object.entries(filteredDocuments).map(([category, files]) => [
          category,
          files.filter((file) =>
            file.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        ])
      );
    }

    // Filter by start and end dates if start and end dates are selected
    if (startDate && endDate) {
      filteredDocuments = Object.fromEntries(
        Object.entries(filteredDocuments).map(([category, files]) => [
          category,
          files.filter((file) => {
            const fileDate = new Date(file.uploadDate);
            return fileDate >= startDate && fileDate <= endDate;
          }),
        ])
      );
    }

    // Remove empty categories (folders)
    return Object.fromEntries(
      Object.entries(filteredDocuments).filter(
        ([category, files]) => files.length > 0
      )
    );
  }, [documents, selectedFileType, searchTerm, startDate, endDate]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFileSelection = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleMultipleDownload = async () => {
    for (const fileId of selectedFiles) {
      const file = Object.values(documents)
        .flat()
        .find((f) => f.id === fileId);
      if (file) {
        try {
          const { data, error } = await supabase.storage
            .from("client_files")
            .download(file.path); // Assuming filePath is the key in your file object

          if (error) throw error;

          const fileURL = URL.createObjectURL(data);
          const link = document.createElement("a");
          link.href = fileURL;
          link.setAttribute("download", file.name);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          URL.revokeObjectURL(fileURL);
        } catch (error) {
          console.error("Error downloading file:", error.message);
        }
      }
    }
  };

  const handleSingleDownload = async (file) => {
    try {
      const { data, error } = await supabase.storage
        .from("client_files") // Make sure this bucket name is correct
        .download(file.path); // Use the file name or path stored in the object

      if (error) {
        console.error("Error downloading file:", error.message);
        return;
      }

      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name); // Set the downloaded file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error in downloading:", error.message);
    }
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="p-2 mx-2 mt-2 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Documents</h1>
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={toggleFilterMenu}
            className={`p-2 flex ${
              isFilterMenuOpen ? "text-blue-500" : "text-gray-700"
            }`}
          >
            <Filter className="h-5 w-5 mr-2" />
            {/* <span className="text-base font-medium">Filters</span> */}
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-auto p-2 pl-10 shadow-sm border border-gray-300 rounded-full focus:outline-none  focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {isFilterMenuOpen && (
        <div className="mb-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-3">Filters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select start date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select end date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select file type
              </label>
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All types</option>
                {uniqueFileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="ml-2 font-medium text-lg text-gray-700">
            {" "}
            Hold on, Loading documents...
          </span>
        </div>
      ) : (
        <div className="space-y-2 bg-white shadow-sm rounded-xl">
          {Object.entries(filteredDocuments).map(([category, files]) => (
            <div key={category} className="overflow-hidden">
              <button
                className="w-full p-4 text-lefthover:bg-gray-50 flex items-center justify-between"
                onClick={() =>
                  setOpenCategory(openCategory === category ? null : category)
                }
              >
                <div className="flex items-center">
                  <FolderIcon className="mr-2 text-blue-500" />
                  <span className="font-medium text-gray-700">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </div>
              </button>
              {openCategory === category && (
                <ul className="divide-y divide-gray-200">
                  {files.map((file) => (
                    <li
                      key={file.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleFileSelection(file.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <FileIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-500">
                          {file.uploadDate}
                        </span>
                        <span className="text-sm text-gray-500">
                          {file.type}
                        </span>
                        <button
                          onClick={() => handleSingleDownload(file)}
                          className="p-1 hover:bg-gray-200 rounded-full"
                        >
                          <Download className="h-5 w-5 text-blue-500" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handleMultipleDownload}
            disabled={selectedFiles.length === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              selectedFiles.length > 0
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Download className="h-5 w-5" />
            <span>Download Selected ({selectedFiles.length})</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
