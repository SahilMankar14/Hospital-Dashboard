import React, { useState } from "react";

function GroupList({ hierarchicalData, onLedgerSelect }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedLedger, setSelectedLedger] = useState(null);

  const handleGroupChange = (event) => {
    const groupId = parseInt(event.target.value);
    const group = hierarchicalData.find((group) => group.id === groupId);
    setSelectedGroup(group);
    setSelectedVoucher(null); // Reset voucher and ledger selections
    setSelectedLedger(null);
  };

  const handleVoucherChange = (event) => {
    const voucherId = parseInt(event.target.value);
    const voucher = selectedGroup.vouchers.find(
      (voucher) => voucher.id === voucherId
    );
    setSelectedVoucher(voucher);
    setSelectedLedger(null); // Reset ledger selection
  };

  const handleLedgerChange = (event) => {
    const ledgerId = parseInt(event.target.value);
    const ledger = selectedVoucher.ledgers.find(
      (ledger) => ledger.id === ledgerId
    );
    setSelectedLedger(ledger);
    onLedgerSelect(ledger); // Notify parent component about selected ledger
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Hierarchical Data</h2>
      <div>
        <select
          className="m-2 p-2 border  rounded-md"
          onChange={handleGroupChange}
        >
          <option value="">Select Group</option>
          {hierarchicalData.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      {selectedGroup && (
        <div>
          <select
            className="m-2 p-2 border  rounded-md"
            onChange={handleVoucherChange}
          >
            <option value="">Select Voucher</option>
            {selectedGroup.vouchers.map((voucher) => (
              <option key={voucher.id} value={voucher.id}>
                {voucher.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedVoucher && (
        <div>
          <select
            className="m-2 p-2 border  rounded-md"
            onChange={handleLedgerChange}
          >
            <option value="">Select Ledger</option>
            {selectedVoucher.ledgers.map((ledger) => (
              <option key={ledger.id} value={ledger.id}>
                {ledger.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default GroupList;
