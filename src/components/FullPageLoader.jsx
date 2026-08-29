import { styled } from 'goober';
import { Loader2 } from 'lucide-react';
import { theme } from '../theme.js';

const Wrap = styled('div')`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${theme.colors.primary};
  svg { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export function FullPageLoader() {
  return (
    <Wrap>
      <Loader2 size={32} />
    </Wrap>
  );
}
