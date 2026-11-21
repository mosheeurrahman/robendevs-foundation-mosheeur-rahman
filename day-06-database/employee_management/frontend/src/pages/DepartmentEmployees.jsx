import { Link, useParams } from 'react-router-dom';
import { fetchEmployeesByDepartment } from '../api.js';
import { Avatar, Status, useFetch } from '../components.jsx';

export default function DepartmentEmployees() {
  const { departmentId } = useParams();
  const { data, loading, error } = useFetch(
    () => fetchEmployeesByDepartment(departmentId),
    [departmentId]
  );

  return (
    <>
      <Link to="/" className="back">← All departments</Link>
      <h1>Team members</h1>
      <Status loading={loading} error={error} empty={data && data.length === 0} emptyText="No one works in this department yet." />
      <ul className="list">
        {data?.map((e) => (
          <li key={e.employee_id}>
            <Link to={`/employees/${e.employee_id}`} className="row">
              <Avatar employee={e} />
              <span className="row-text">
                <span className="card-title">{e.first_name} {e.last_name}</span>
                <span className="card-sub">{e.job_title || 'No job title'}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
