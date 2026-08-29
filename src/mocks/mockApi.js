import { loadDb, saveDb } from './db.js';
import { ApiError } from '../api/http.js';

const delay = (ms = 450) => new Promise((r) => setTimeout(r, ms));
const publicUser = ({ password, ...rest }) => rest;
const uid = (p) => `${p}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Mirrors the response shape we expect from the Python REST API so swapping to
 * the real backend is a one-line change in each service module.
 */
export const mockApi = {
  async login({ email, password }) {
    await delay();
    const db = loadDb();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) throw new ApiError('Invalid email or password', 401);
    return { token: `mock.${user.id}.${Date.now()}`, user: publicUser(user) };
  },

  async register(payload) {
    await delay();
    const db = loadDb();
    if (db.users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
      throw new ApiError('An account with this email already exists', 409);
    }
    const user = {
      id: uid(payload.role === 'teacher' ? 'tea' : 'stu'),
      ...payload,
    };
    db.users.push(user);
    if (user.role === 'teacher') db.assignments[user.id] = [];
    saveDb(db);
    return { token: `mock.${user.id}.${Date.now()}`, user: publicUser(user) };
  },

  async me(userId) {
    await delay(200);
    const db = loadDb();
    const user = db.users.find((u) => u.id === userId);
    if (!user) throw new ApiError('Session expired', 401);
    return publicUser(user);
  },

  async listMaterials(ownerId) {
    await delay();
    const db = loadDb();
    return db.materials.filter((m) => !ownerId || m.ownerId === ownerId);
  },

  async listAssignedStudents(teacherId) {
    await delay();
    const db = loadDb();
    const ids = db.assignments[teacherId] || [];
    return db.users
      .filter((u) => u.role === 'student' && ids.includes(u.id))
      .map(publicUser);
  },

  async getMarks(studentId) {
    await delay();
    const db = loadDb();
    return db.marks[studentId] || [];
  },
};
