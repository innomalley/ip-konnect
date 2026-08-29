import { PortalLayout } from '../components/PortalLayout.jsx';
import { Card } from '../components/ui.jsx';
import { PageTitle, PageLead, Table, Empty, AsyncState } from '../components/portalBits.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { portalService } from '../services/portalService.js';
import { teacherLinks } from './teacherNav.js';

export default function TeacherMaterials() {
  const { user } = useAuth();
  const materials = useAsync(() => portalService.listMaterials(user.id), [user.id]);

  return (
    <PortalLayout links={teacherLinks}>
      <PageTitle>Teaching materials</PageTitle>
      <PageLead>Notes, worksheets and resources you have shared with your classes.</PageLead>

      <Card>
        <AsyncState loading={materials.loading} error={materials.error}>
          {materials.data?.length ? (
            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Last updated</th>
                </tr>
              </thead>
              <tbody>
                {materials.data.map((m) => (
                  <tr key={m.id}>
                    <td>{m.title}</td>
                    <td>{m.subject}</td>
                    <td>{m.type}</td>
                    <td>{m.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Empty>You haven&apos;t added any materials yet.</Empty>
          )}
        </AsyncState>
      </Card>
    </PortalLayout>
  );
}
