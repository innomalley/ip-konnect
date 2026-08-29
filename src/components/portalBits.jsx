import { styled } from 'goober';
import { theme } from '../theme.js';

export const PageTitle = styled('h1')`
  font-size: 24px;
  margin-bottom: ${theme.space(1)};
`;

export const PageLead = styled('p')`
  color: ${theme.colors.textMuted};
  margin-bottom: ${theme.space(7)};
`;

export const Grid = styled('div')`
  display: grid;
  gap: ${theme.space(4)};
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

export const Stat = styled('div')`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  padding: ${theme.space(5)};
  .label { font-size: 13px; color: ${theme.colors.textMuted}; font-weight: 600; }
  .value {
    font-family: ${theme.font.heading};
    font-size: 28px;
    font-weight: 700;
    margin-top: ${theme.space(2)};
  }
`;

export const Table = styled('table')`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th, td {
    text-align: left;
    padding: ${theme.space(3)} ${theme.space(3)};
    border-bottom: 1px solid ${theme.colors.border};
  }
  th {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${theme.colors.textMuted};
  }
  tbody tr:last-child td { border-bottom: none; }
`;

export const Empty = styled('p')`
  color: ${theme.colors.textMuted};
  padding: ${theme.space(6)} 0;
  text-align: center;
`;

const StateWrap = styled('div')`
  color: ${theme.colors.textMuted};
  padding: ${theme.space(6)} 0;
  text-align: center;
`;

export function AsyncState({ loading, error, children }) {
  if (loading) return <StateWrap>Loading…</StateWrap>;
  if (error) return <StateWrap>{error.message || 'Something went wrong.'}</StateWrap>;
  return children;
}
