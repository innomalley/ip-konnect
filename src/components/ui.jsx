import { styled } from 'goober';
import { theme } from '../theme.js';

export const Card = styled('div')`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.sm};
  padding: ${theme.space(6)};
`;

export const Button = styled('button')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.space(2)};
  width: ${(p) => (p.$full ? '100%' : 'auto')};
  padding: ${theme.space(3)} ${theme.space(5)};
  font-size: 15px;
  font-weight: 600;
  border-radius: ${theme.radius.md};
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease;
  background: ${(p) =>
    p.$variant === 'ghost' ? 'transparent' : theme.colors.primary};
  color: ${(p) => (p.$variant === 'ghost' ? theme.colors.primary : theme.colors.white)};
  border-color: ${(p) =>
    p.$variant === 'ghost' ? theme.colors.border : 'transparent'};

  &:hover:not(:disabled) {
    background: ${(p) =>
      p.$variant === 'ghost' ? theme.colors.surfaceMuted : theme.colors.primaryHover};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FieldWrap = styled('label')`
  display: flex;
  flex-direction: column;
  gap: ${theme.space(1.5)};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.textMuted};
`;

const Control = styled('div')`
  display: flex;
  align-items: center;
  gap: ${theme.space(2)};
  background: ${theme.colors.surface};
  border: 1px solid ${(p) => (p.$error ? theme.colors.danger : theme.colors.border)};
  border-radius: ${theme.radius.md};
  padding: 0 ${theme.space(3)};
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primarySoft};
  }

  svg { color: ${theme.colors.textMuted}; flex-shrink: 0; }

  input, select {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: ${theme.space(3)} 0;
    font-size: 15px;
    color: ${theme.colors.text};
  }
`;

const ErrorText = styled('span')`
  color: ${theme.colors.danger};
  font-size: 13px;
  font-weight: 500;
`;

export function Field({ label, icon, error, as = 'input', children, ...props }) {
  const Tag = as;
  return (
    <FieldWrap>
      {label}
      <Control $error={Boolean(error)}>
        {icon}
        <Tag {...props}>{children}</Tag>
      </Control>
      {error && <ErrorText>{error}</ErrorText>}
    </FieldWrap>
  );
}

export const Alert = styled('div')`
  display: flex;
  align-items: center;
  gap: ${theme.space(2)};
  padding: ${theme.space(3)} ${theme.space(4)};
  border-radius: ${theme.radius.md};
  font-size: 14px;
  background: ${(p) =>
    p.$tone === 'success' ? '#e6fcf5' : '#fff0f0'};
  color: ${(p) => (p.$tone === 'success' ? theme.colors.accent : theme.colors.danger)};
  border: 1px solid
    ${(p) => (p.$tone === 'success' ? '#c3fae8' : '#ffc9c9')};
`;

export const Badge = styled('span')`
  display: inline-block;
  padding: 2px ${theme.space(2.5)};
  border-radius: ${theme.radius.pill};
  font-size: 12px;
  font-weight: 600;
  background: ${theme.colors.primarySoft};
  color: ${theme.colors.primary};
`;

export const Spinner = styled('span')`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  display: inline-block;
  animation: spin 0.7s linear infinite;
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
