import { Link } from 'react-router-dom';
import { styled } from 'goober';
import { Button } from '../components/ui.jsx';
import { theme } from '../theme.js';

const Wrap = styled('div')`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: ${theme.space(6)};
  h1 { font-size: 64px; color: ${theme.colors.primary}; }
  p { color: ${theme.colors.textMuted}; margin: ${theme.space(2)} 0 ${theme.space(6)}; }
`;

export default function NotFound() {
  return (
    <Wrap>
      <div>
        <h1>404</h1>
        <p>We couldn&apos;t find that page.</p>
        <Button as={Link} to="/">
          Back to home
        </Button>
      </div>
    </Wrap>
  );
}
