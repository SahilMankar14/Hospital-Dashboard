import React from "react";

function LedgerDetails({ selectedLedger }) {
  return (
    <div className="rounded-md">
      <h2 className="text-xl font-bold mb-4">Selected Ledger Information</h2>
      {selectedLedger ? (
        <div>
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {selectedLedger.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Date:</span> {selectedLedger.date}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Particluars:</span>{" "}
            {selectedLedger.particulars}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Vchtyp:</span>{" "}
            {selectedLedger.vchtyp}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Vchno:</span> {selectedLedger.vchno}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Debit:</span> {selectedLedger.debit}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Credit:</span>{" "}
            {selectedLedger.credit}
          </p>
        </div>
      ) : (
        <p>No ledger selected</p>
      )}
    </div>
  );
}

export default LedgerDetails;
