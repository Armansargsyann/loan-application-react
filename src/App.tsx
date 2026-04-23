import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import PersonalInfoForm from "./conponents/pages/steps/PersonalInfoForm";
import LoanDetailsForm from "./conponents/pages/steps/LoanDetailsForm";
import WorkAddressForm from "./conponents/pages/steps/WorkAddressForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <Routes>
            <Route path="/step1" element={<PersonalInfoForm />} />
            <Route path="/step2" element={<WorkAddressForm />} />
            <Route path="/step3" element={<LoanDetailsForm />} />
            <Route path="/" element={<Navigate to="/step1" replace />} />
            <Route path="*" element={<Navigate to="/step1" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
