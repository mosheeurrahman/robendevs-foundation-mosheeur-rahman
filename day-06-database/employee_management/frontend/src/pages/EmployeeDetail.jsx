import { Link, useParams } from 'react-router-dom';
import { fetchEmployee } from '../api.js';
import { Avatar, Status, useFetch } from '../components.jsx';

export default function EmployeeDetail() {
  const { employeeId } = useParams();
  const { data: e, loading, error } = useFetch(() => fetchEmployee(employeeId), [employeeId]);

  return (
    <>
      {e ? (
        <Link to={`/departments/${e.department_id}`} className="back">← Back to department</Link>
      ) : (
        <Link to="/" className="back">← All departments</Link>
      )}

      <Status loading={loading} error={error} empty={!loading && !error && !e} emptyText="Employee not found." />

      {e && (
        <section className="profile">
          <Avatar employee={e} size={120} />
          <div>
            <h1>{e.first_name} {e.last_name}</h1>
            <p className="card-sub">{e.job_title || 'No job title'}</p>
            <dl>
              <dt>Email</dt>
              <dd><a href={`mailto:${e.email}`}>{e.email}</a></dd>
              <dt>Employee ID</dt>
              <dd>{e.employee_id}</dd>
              <dt>Department ID</dt>
              <dd>{e.department_id}</dd>
            </dl>
          </div>
        </section>
      )}
    </>
  );
}
