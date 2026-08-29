// Endpoint paths for the Python REST API. Centralised so the contract with the
// backend lives in one file.
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    logout: '/auth/logout',
  },
  students: {
    list: '/students',
    detail: (id) => `/students/${id}`,
    marks: (id) => `/students/${id}/marks`,
  },
  teachers: {
    list: '/teachers',
    detail: (id) => `/teachers/${id}`,
    students: (id) => `/teachers/${id}/students`,
  },
  materials: {
    list: '/materials',
    detail: (id) => `/materials/${id}`,
  },
};
