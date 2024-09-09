export const hierarchicalData = [
  {
    id: 1,
    name: "Group 1",
    vouchers: [
      {
        id: 101,
        name: "Voucher 1.1",
        ledgers: [
          {
            id: 1001,
            name: "HDFC Bank",
            date: "31-oct-23",
            particulars: "HDFC Bank Dhantoli",
            vchtyp: "Contra",
            vchno: "369",
            debit: "0",
            credit: "10",
          },
          {
            id: 1002,
            name: "Ledger 1.1.2",
            description: "Description of Ledger 1.1.2",
          },
        ],
      },
      {
        id: 102,
        name: "Voucher 1.2",
        ledgers: [
          {
            id: 1003,
            name: "Ledger 1.2.1",
            description: "Description of Ledger 1.2.1",
          },
          {
            id: 1004,
            name: "Ledger 1.2.2",
            description: "Description of Ledger 1.2.2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Group 2",
    vouchers: [
      {
        id: 201,
        name: "Voucher 2.1",
        ledgers: [
          {
            id: 2001,
            name: "Ledger 2.1.1",
            description: "Description of Ledger 2.1.1",
          },
          {
            id: 2002,
            name: "Ledger 2.1.2",
            description: "Description of Ledger 2.1.2",
          },
        ],
      },
    ],
  },
];
