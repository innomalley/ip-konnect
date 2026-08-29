import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled } from 'goober';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { Button, Field, Alert, Spinner } from '../components/ui.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { theme } from '../theme.js';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: ${theme.space(4)};
`;

const Foot = styled('p')`
  margin-top: ${theme.space(5)};
  font-size: 14px;
  color: ${theme.colors.textMuted};
  a { color: ${theme.colors.primary}; font-weight: 600; }
`;

const Hint = styled('div')`
  margin-top: ${theme.space(4)};
  padding: ${theme.space(3)} ${theme.space(4)};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.surfaceMuted};
  font-size: 13px;
  color: ${theme.colors.textMuted};
  line-height: 1.6;
`;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(form);
      const dest = location.state?.from?.pathname || `/${user.role}`;
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your student or teacher portal.">
      <Form onSubmit={submit}>
        {error && (
          <Alert>
            <AlertCircle size={16} />
            {error}
          </Alert>
        )}
        <Field
          label="Email address"
          icon={<Mail size={18} />}
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          value={form.email}
          onChange={update}
        />
        <Field
          label="Password"
          icon={<Lock size={18} />}
          type="password"
          name="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={update}
        />
        <Button type="submit" $full disabled={submitting}>
          {submitting ? <Spinner /> : <LogIn size={18} />}
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </Form>

      <Hint>
        <strong>Demo accounts</strong>
        <br />
        Student — student@ipk.test / password123
        <br />
        Teacher — teacher@ipk.test / password123
      </Hint>

      <Foot>
        New to ipkonnect? <Link to="/register">Create an account</Link>
      </Foot>
    </AuthLayout>
  );
}
