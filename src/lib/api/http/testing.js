import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const TESTING_API_BASE_URL = `${import.meta.env.VITE_API_URL}/vs/testing`;

export default {
  async getTestsForVacancy({ vacancyId }) {
    const url = new URL(`${TESTING_API_BASE_URL}/list`);
    url.searchParams.set('vacancy_id', vacancyId);
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },

  async startTheoTest(id) {
    const url = `${TESTING_API_BASE_URL}/theoretical/${id}/start`;
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },

  async endTheoTest({ id, answers: data }) {
    const url = `${TESTING_API_BASE_URL}/theoretical/${id}/finish`;
    return await makeApiRequest(url, 'POST', { data, sendCookies: true });
  },

  async startPracTest(id) {
    const url = `${TESTING_API_BASE_URL}/practical/${id}/start`;
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },

  async endPracTest({ testId, questionId, answer }) {
    const url = `${TESTING_API_BASE_URL}/practical/${testId}/finish`;
    const data = [{ questionId, answer }];
    return await makeApiRequest(url, 'POST', { data, sendCookies: true });
  },

  async getAllAttempts() {
    const url = new URL(`${TESTING_API_BASE_URL}/attempts`);
    url.searchParams.set('page', '1');
    url.searchParams.set('per_page', '10000');
    url.searchParams.set('order_by', 'created_at');
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },

  async getTestAttempts(id) {
    const url = new URL(`${TESTING_API_BASE_URL}/${id}/attempts`);
    url.searchParams.set('per_page', '10000');
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },

  async execTest({ code, language }) {
    const url = new URL(`${TESTING_API_BASE_URL}/practical/exec`);
    url.searchParams.set('code', code); 
    url.searchParams.set('language', language);
    return await makeApiRequest(url, 'POST' , { sendCookies: true });
  },

  async getApprovedUsers() {
    return await makeApiRequest(`${TESTING_API_BASE_URL}/approved/users`, 'GET', {sendCookies: true});
  },

  async createTest(vacancyId, data) {
    const url = new URL(`${TESTING_API_BASE_URL}/new?vacancy_id=${vacancyId}`);
    return await makeApiRequest(url, 'POST', { sendCookies: true, data });
  },

  async createTeoreticalQuestion(testingId, data) {
    const url = new URL(`${TESTING_API_BASE_URL}/${testingId}/theoretical/new`);
    return await makeApiRequest(url, 'POST', { sendCookies: true, data });
  },

  async createTheoreticalQuestionOptions(questionId, data) {
    const url = new URL(
        `${TESTING_API_BASE_URL}/theoretical/${questionId}/option/new`
    );
    return await makeApiRequest(url, 'POST', { sendCookies: true, data });
  },
};
