import { styled } from 'goober';
import { GraduationCap } from 'lucide-react';
import { theme } from '../theme.js';

const Page = styled('div')`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 900px) {
    grid-template-columns: 1.1fr 1fr;
  }
`;

const Brand = styled('aside')`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.space(12)};
  color: ${theme.colors.white};
  background: linear-gradient(160deg, ${theme.colors.primary}, #1b2a6b);
  @media (min-width: 900px) {
    display: flex;
  }

  h2 { font-size: 30px; line-height: 1.25; margin-top: ${theme.space(6)}; max-width: 22ch; }
  p { color: rgba(255, 255, 255, 0.8); line-height: 1.6; max-width: 40ch; }
`;

const Logo = styled('div')`
  display: flex;
  align-items: center;
  gap: ${theme.space(2)};
  font-family: ${theme.font.heading};
  font-weight: 700;
  font-size: 20px;
`;

const FormSide = styled('main')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.space(6)};
`;

const FormInner = styled('div')`
  width: 100%;
  max-width: 420px;
`;

export function AuthLayout({ title, subtitle, children }) {
  return (
    <Page>
      <Brand>
        <Logo>
          <GraduationCap size={26} />
          ipkonnect
        </Logo>
        <div>
          <h2>One portal for students and teachers.</h2>
          <p>
            Access teaching materials, assessments, marks and reports in a single
            place. Sign in to pick up where you left off.
          </p>
        </div>
        <p style={{ fontSize: 13 }}>Student &amp; Teacher Management System</p>
      </Brand>
      <FormSide>
        <FormInner>
          <Logo style={{ color: theme.colors.primary, marginBottom: theme.space(6) }}>
            <GraduationCap size={24} />
            ipkonnect
          </Logo>
          <h1 style={{ fontSize: 26, marginBottom: theme.space(2) }}>{title}</h1>
          <p style={{ color: theme.colors.textMuted, marginBottom: theme.space(6) }}>
            {subtitle}
          </p>
          {children}
        </FormInner>
      </FormSide>
    </Page>
  );
}
