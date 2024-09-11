import QuickInsights from "./components/quick insights/QuickInsights";
import Multidimensional from "./components/multidimensional/Multidimensional";
import Reports from "./components/reports/Reports";
import Ledgers from "./components/ledgers/Ledgers";
import BudgetsProjections from "./components/budgetsprojections/BudgetsProjections";
import UploadFiles from "./components/uploadfiles/UploadFiles";
import DocumentViewer from "./components/documents/DocumentViewer";
import ComplianceBoard from "./components/complianceboard/ComplianceBoard";
import BillingSystem from "./components/billing system/BillingSystem";

export const routes = [
  {
    text: "Quick Insights",
    path: "/quickinsights",
    element: <QuickInsights />,
  },
  {
    text: "Multidimensional Views",
    path: "/multidimensional",
    element: <Multidimensional />,
  },
  { text: "Reports", path: "/reports", element: <Reports /> },
  { text: "Ledgers", path: "/ledgers", element: <Ledgers /> },
  { text: "Upload Files", path: "/upload-files", element: <UploadFiles /> },
  { text: "Documents", path: "/documents", element: <DocumentViewer /> },
  {
    text: "Billing System",
    path: "/billing-system",
    element: <BillingSystem />,
  },
];
