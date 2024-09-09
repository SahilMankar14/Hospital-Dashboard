import React, { createContext, useState } from "react";

const UploadContext = createContext();

const UploadProvider = ({ children }) => {
  const [data, setData] = useState({
    balanceSheet: {},
    sales: {},
    purchase: {},
    bankStatement: {},
    as: {},
    gstLedger: {},
    cashBooks: {},
    journal: {},
    otherDocs: {},
  });

  const handleDataChange = (componentName, fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [componentName]: {
        ...prevData[componentName],
        [fieldName]: value,
      },
    }));
  };

  console.log(data);

  return (
    <UploadContext.Provider value={{ data, handleDataChange }}>
      {children}
    </UploadContext.Provider>
  );
};

export { UploadContext, UploadProvider };
