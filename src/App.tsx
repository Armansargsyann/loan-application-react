import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Step1 from './conponents/steps/step1';
import Step2 from './conponents/steps/step2';
import Step3 from './conponents/steps/step3';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <Routes>
           
            <Route path="/step1" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />

           
            <Route path="/" element={<Navigate to="/step1" replace />} />
            <Route path="*" element={<Navigate to="/step1" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;