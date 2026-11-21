import { Link } from 'react-router-dom';
import { fetchDepartments } from '../api.js';
import { Status, useFetch } from '../components.jsx';

export default function Departments() {
  const { data, loading, error } = useFetch(fetchDepartments, []);

  return (
    <>
      <h1>Departments</h1>
      <Status loading={loading} error={error} empty={data && data.length === 0} emptyText="No departments yet." />
      <ul className="grid">
        {data?.map((d) => (
          <li key={d.department_id}>
            <Link to={`/departments/${d.department_id}`} className="card">
              <span className="card-title">{d.department_name}</span>
              <span className="card-sub">{d.location}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
