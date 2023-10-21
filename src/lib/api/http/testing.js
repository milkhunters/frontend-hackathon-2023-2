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
    console.log(`Code for id: ${id}.`);
    return {
      succeed: true,
      content: {
        id: 1,
        description: 'bla',
      },
    };
  },

  async endPracTest({ id, code }) {
    console.log(`Submitted code with id ${id}`, code);
    return { succeed: false, content: 'failed to compile' };
  },
};
