const BASE = '/api';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

// Your API response keys are a bit unusual, so they are normalised here.
export async function fetchDepartments() {
  const data = await get('/departments');
  return data.employee; // array of departments
}

export async function fetchEmployeesByDepartment(departmentId) {
  const data = await get(`/departments/${departmentId}/employees`);
  return data.departments; // array of employees
}

export async function fetchEmployee(employeeId) {
  const data = await get(`/employees/${employeeId}`);
  return data.employee[0] || null; // single employee or null
}

// Adjust this if your images are served from somewhere else
// (e.g. app.use('/uploads', express.static('uploads'))).
export function imageUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `/api/images/${encodeURIComponent(path)}`;
}