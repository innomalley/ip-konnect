import { Link } from 'react-router-dom';
import { FileText, Users } from 'lucide-react';
import { PortalLayout } from '../components/PortalLayout.jsx';
import { PageTitle, PageLead, Grid, Stat } from '../components/portalBits.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { portalService } from '../services/portalService.js';
import { teacherLinks } from './teacherNav.js';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const materials = useAsync(() => portalService.listMaterials(user.id), [user.id]);
  const students = useAsync(() => portalService.listAssignedStudents(user.id), [user.id]);

  return (
    <PortalLayout links={teacherLinks}>
      <PageTitle>Welcome, {user.firstName}</PageTitle>
      <PageLead>
        {user.subject ? `${user.subject} teacher` : 'Teacher'}
        {user.staffNo ? ` · ${user.staffNo}` : ''}
      </PageLead>

      <Grid>
        <Stat as={Link} to="/teacher/materials" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="label">
            <FileText size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
            My materials
          </div>
          <div className="value">{materials.data?.length ?? '—'}</div>
        </Stat>
        <Stat as={Link} to="/teacher/students" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="label">
            <Users size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
            Assigned students
          </div>
          <div className="value">{students.data?.length ?? '—'}</div>
        </Stat>
      </Grid>
    </PortalLayout>
  );
}
