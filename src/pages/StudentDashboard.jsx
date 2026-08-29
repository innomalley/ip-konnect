import { styled } from 'goober';
import { PortalLayout } from '../components/PortalLayout.jsx';
import { Card, Badge } from '../components/ui.jsx';
import {
  PageTitle,
  PageLead,
  Grid,
  Stat,
  Table,
  Empty,
  AsyncState,
} from '../components/portalBits.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { portalService } from '../services/portalService.js';
import { theme } from '../theme.js';

const Section = styled('section')`
  margin-top: ${theme.space(8)};
  h2 { font-size: 18px; margin-bottom: ${theme.space(4)}; }
`;

export default function StudentDashboard() {
  const { user } = useAuth();
  const marks = useAsync(() => portalService.getMarks(user.id), [user.id]);
  const materials = useAsync(() => portalService.listMaterials(), []);

  const average =
    marks.data && marks.data.length
      ? Math.round(marks.data.reduce((s, m) => s + m.score, 0) / marks.data.length)
      : '—';

  return (
    <PortalLayout>
      <PageTitle>Hello, {user.firstName} 👋</PageTitle>
      <PageLead>
        {user.gradeLevel ? `${user.gradeLevel} · ` : ''}
        {user.admissionNo || user.email}
      </PageLead>

      <Grid>
        <Stat>
          <div className="label">Assessments recorded</div>
          <div className="value">{marks.data?.length ?? '—'}</div>
        </Stat>
        <Stat>
          <div className="label">Average score</div>
          <div className="value">{average}</div>
        </Stat>
        <Stat>
          <div className="label">Materials available</div>
          <div className="value">{materials.data?.length ?? '—'}</div>
        </Stat>
      </Grid>

      <Section>
        <h2>My marks</h2>
        <Card>
          <AsyncState loading={marks.loading} error={marks.error}>
            {marks.data?.length ? (
              <Table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Assessment</th>
                    <th>Score</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.data.map((m, i) => (
                    <tr key={i}>
                      <td>{m.subject}</td>
                      <td>{m.assessment}</td>
                      <td>{m.score}</td>
                      <td>
                        <Badge>{m.grade}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Empty>No marks published yet.</Empty>
            )}
          </AsyncState>
        </Card>
      </Section>

      <Section>
        <h2>Teaching materials</h2>
        <Card>
          <AsyncState loading={materials.loading} error={materials.error}>
            {materials.data?.length ? (
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Type</th>
                    <th>Updated</th>
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
              <Empty>No materials shared yet.</Empty>
            )}
          </AsyncState>
        </Card>
      </Section>
    </PortalLayout>
  );
}
