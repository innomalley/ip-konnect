import { USE_MOCK } from '../api/config.js';
import { request } from '../api/http.js';
import { endpoints } from '../api/endpoints.js';
import { mockApi } from '../mocks/mockApi.js';

// Data used by the student and teacher portals. Mock-backed for now; each method
// has the real REST call ready behind the USE_MOCK flag.
export const portalService = {
  listMaterials(ownerId) {
    if (USE_MOCK) return mockApi.listMaterials(ownerId);
    return request(endpoints.materials.list);
  },

  listAssignedStudents(teacherId) {
    if (USE_MOCK) return mockApi.listAssignedStudents(teacherId);
    return request(endpoints.teachers.students(teacherId));
  },

  getMarks(studentId) {
    if (USE_MOCK) return mockApi.getMarks(studentId);
    return request(endpoints.students.marks(studentId));
  },
};
