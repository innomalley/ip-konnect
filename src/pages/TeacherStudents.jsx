import { PortalLayout } from '../components/PortalLayout.jsx';
import { Card, Badge } from '../components/ui.jsx';
import { PageTitle, PageLead, Table, Empty, AsyncState } from '../components/portalBits.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { portalService } from '../services/portalService.js';
import { teacherLinks } from './teacherNav.js';

export default function TeacherStudents() {
  const { user } = useAuth();
  const students = useAsync(() => portalService.listAssignedStudents(user.id), [user.id]);

  return (
    <PortalLayout links={teacherLinks}>
      <PageTitle>My students</PageTitle>
      <PageLead>Students currently assigned to you for teaching and assessment.</PageLead>

      <Card>
        <AsyncState loading={students.loading} error={students.error}>
          {students.data?.length ? (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Grade / Form</th>
                  <th>Admission no.</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.data.map((s) => (
                  <tr key={s.id}>
                    <td>
                      {s.firstName} {s.lastName}
                    </td>
                    <td>{s.gradeLevel ? <Badge>{s.gradeLevel}</Badge> : '—'}</td>
                    <td>{s.admissionNo || '—'}</td>
                    <td>{s.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Empty>No students assigned to you yet.</Empty>
          )}
        </AsyncState>
      </Card>
    </PortalLayout>
  );
}
