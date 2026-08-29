import { styled } from 'goober';
import { NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut } from 'lucide-react';
import { theme } from '../theme.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from './ui.jsx';

const Shell = styled('div')`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Top = styled('header')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.space(4)};
  padding: ${theme.space(4)} ${theme.space(6)};
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
`;

const Logo = styled('div')`
  display: flex;
  align-items: center;
  gap: ${theme.space(2)};
  font-family: ${theme.font.heading};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const Nav = styled('nav')`
  display: flex;
  gap: ${theme.space(1)};
  padding: 0 ${theme.space(4)};
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
  overflow-x: auto;

  a {
    padding: ${theme.space(3)} ${theme.space(4)};
    font-size: 14px;
    font-weight: 600;
    color: ${theme.colors.textMuted};
    border-bottom: 2px solid transparent;
    white-space: nowrap;
  }
  a.active {
    color: ${theme.colors.primary};
    border-bottom-color: ${theme.colors.primary};
  }
`;

const Content = styled('main')`
  flex: 1;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: ${theme.space(8)} ${theme.space(6)};
`;

const User = styled('div')`
  display: flex;
  align-items: center;
  gap: ${theme.space(3)};
  font-size: 14px;
  .name { font-weight: 600; }
  .role { color: ${theme.colors.textMuted}; text-transform: capitalize; }
`;

export function PortalLayout({ links = [], children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <Shell>
      <Top>
        <Logo>
          <GraduationCap size={22} />
          ipkonnect
        </Logo>
        <User>
          <div>
            <div className="name">
              {user.firstName} {user.lastName}
            </div>
            <div className="role">{user.role}</div>
          </div>
          <Button $variant="ghost" onClick={handleLogout}>
            <LogOut size={16} />
            Sign out
          </Button>
        </User>
      </Top>
      {links.length > 0 && (
        <Nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end>
              {l.label}
            </NavLink>
          ))}
        </Nav>
      )}
      <Content>{children}</Content>
    </Shell>
  );
}
