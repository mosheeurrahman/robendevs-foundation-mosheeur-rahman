import { Link, Route, Routes } from 'react-router-dom';
import Departments from './pages/Departments.jsx';
import DepartmentEmployees from './pages/DepartmentEmployees.jsx';
import EmployeeDetail from './pages/EmployeeDetail.jsx';

export default function App() {
  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand">Employee Directory</Link>
      </header>
      <main className="page">
        <Routes>
          <Route path="/" element={<Departments />} />
          <Route path="/departments/:departmentId" element={<DepartmentEmployees />} />
          <Route path="/employees/:employeeId" element={<EmployeeDetail />} />
          <Route path="*" element={<p className="state">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
