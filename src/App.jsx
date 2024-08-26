import { Routes, Route, Navigate } from "react-router-dom";
import Customer from "./layouts/customer";

function App() {
  return (
    <Routes>
      <Route path="/customer/*" element={<Customer />} />
      <Route path="*" element={<Navigate to="/customer/home" replace />} />
    </Routes>
  );
}

export default App;
