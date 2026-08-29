import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'goober';
import {
  User,
  Mail,
  Lock,
  BookOpen,
  Hash,
  GraduationCap,
  Briefcase,
  UserPlus,
  AlertCircle,
} from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { Button, Field, Alert, Spinner } from '../components/ui.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { theme } from '../theme.js';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: ${theme.space(4)};
`;

const Row = styled('div')`
  display: grid;
  gap: ${theme.space(4)};
  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const RoleToggle = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.space(2)};
`;

const RoleButton = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.space(1)};
  padding: ${theme.space(4)};
  border-radius: ${theme.radius.md};
  border: 1.5px solid ${(p) => (p.$active ? theme.colors.primary : theme.colors.border)};
  background: ${(p) => (p.$active ? theme.colors.primarySoft : theme.colors.surface)};
  color: ${(p) => (p.$active ? theme.colors.primary : theme.colors.textMuted)};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

const Foot = styled('p')`
  margin-top: ${theme.space(5)};
  font-size: 14px;
  color: ${theme.colors.textMuted};
  a { color: ${theme.colors.primary}; font-weight: 600; }
`;

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  gradeLevel: '',
  admissionNo: '',
  subject: '',
  staffNo: '',
};

function validate(form, role) {
  const e = {};
  if (!form.firstName.trim()) e.firstName = 'Required';
  if (!form.lastName.trim()) e.lastName = 'Required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
  if (form.password.length < 8) e.password = 'At least 8 characters';
  if (form.confirmPassword !== form.password) e.confirmPassword = 'Passwords do not match';
  if (role === 'student' && !form.gradeLevel.trim()) e.gradeLevel = 'Required';
  if (role === 'teacher' && !form.subject.trim()) e.subject = 'Required';
  return e;
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setServerError('');
    const fieldErrors = validate(form, role);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    try {
      const payload = {
        role,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
        ...(role === 'student'
          ? { gradeLevel: form.gradeLevel.trim(), admissionNo: form.admissionNo.trim() }
          : { subject: form.subject.trim(), staffNo: form.staffNo.trim() }),
      };
      const user = await register(payload);
      navigate(`/${user.role}`, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join ipkonnect as a student or a teacher."
    >
      <Form onSubmit={submit} noValidate>
        {serverError && (
          <Alert>
            <AlertCircle size={16} />
            {serverError}
          </Alert>
        )}

        <RoleToggle>
          <RoleButton
            type="button"
            $active={role === 'student'}
            onClick={() => setRole('student')}
          >
            <GraduationCap size={20} />
            Student
          </RoleButton>
          <RoleButton
            type="button"
            $active={role === 'teacher'}
            onClick={() => setRole('teacher')}
          >
            <Briefcase size={20} />
            Teacher
          </RoleButton>
        </RoleToggle>

        <Row>
          <Field
            label="First name"
            icon={<User size={18} />}
            name="firstName"
            value={form.firstName}
            onChange={update}
            error={errors.firstName}
          />
          <Field
            label="Last name"
            icon={<User size={18} />}
            name="lastName"
            value={form.lastName}
            onChange={update}
            error={errors.lastName}
          />
        </Row>

        <Field
          label="Email address"
          icon={<Mail size={18} />}
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={update}
          error={errors.email}
        />

        <Row>
          <Field
            label="Password"
            icon={<Lock size={18} />}
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            error={errors.password}
          />
          <Field
            label="Confirm password"
            icon={<Lock size={18} />}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={update}
            error={errors.confirmPassword}
          />
        </Row>

        {role === 'student' ? (
          <Row>
            <Field
              label="Grade / Form"
              icon={<BookOpen size={18} />}
              name="gradeLevel"
              placeholder="e.g. Form 3"
              value={form.gradeLevel}
              onChange={update}
              error={errors.gradeLevel}
            />
            <Field
              label="Admission no. (optional)"
              icon={<Hash size={18} />}
              name="admissionNo"
              value={form.admissionNo}
              onChange={update}
            />
          </Row>
        ) : (
          <Row>
            <Field
              label="Main subject"
              icon={<BookOpen size={18} />}
              name="subject"
              placeholder="e.g. Mathematics"
              value={form.subject}
              onChange={update}
              error={errors.subject}
            />
            <Field
              label="Staff no. (optional)"
              icon={<Hash size={18} />}
              name="staffNo"
              value={form.staffNo}
              onChange={update}
            />
          </Row>
        )}

        <Button type="submit" $full disabled={submitting}>
          {submitting ? <Spinner /> : <UserPlus size={18} />}
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </Form>

      <Foot>
        Already registered? <Link to="/login">Sign in</Link>
      </Foot>
    </AuthLayout>
  );
}
