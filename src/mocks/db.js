// In-memory mock database with localStorage persistence so registered users
// survive a page reload. This whole folder is deleted once the Python API +
// PostgreSQL database are in place.
const DB_KEY = 'ipk.mock.db';

const seed = {
  users: [
    {
      id: 'stu-1',
      role: 'student',
      firstName: 'Amina',
      lastName: 'Yusuf',
      email: 'student@ipk.test',
      password: 'password123',
      gradeLevel: 'Form 3',
      admissionNo: 'IPK-2023-014',
    },
    {
      id: 'tea-1',
      role: 'teacher',
      firstName: 'David',
      lastName: 'Mwangi',
      email: 'teacher@ipk.test',
      password: 'password123',
      subject: 'Mathematics',
      staffNo: 'STF-0091',
    },
  ],
  materials: [
    {
      id: 'mat-1',
      title: 'Algebra: Quadratic Equations',
      subject: 'Mathematics',
      type: 'PDF notes',
      ownerId: 'tea-1',
      updatedAt: '2026-08-20',
    },
    {
      id: 'mat-2',
      title: 'Trigonometry Practice Set',
      subject: 'Mathematics',
      type: 'Worksheet',
      ownerId: 'tea-1',
      updatedAt: '2026-08-25',
    },
  ],
  // teacherId -> [studentId]
  assignments: {
    'tea-1': ['stu-1'],
  },
  marks: {
    'stu-1': [
      { subject: 'Mathematics', assessment: 'Mid-term', score: 78, grade: 'B+' },
      { subject: 'English', assessment: 'Mid-term', score: 84, grade: 'A-' },
    ],
  },
};

export function loadDb() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt storage */
  }
  localStorage.setItem(DB_KEY, JSON.stringify(seed));
  return structuredClone(seed);
}

export function saveDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
