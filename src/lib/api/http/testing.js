import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const TESTING_API_BASE_URL = `${import.meta.env.VITE_API_URL}/vs/testing`;

export default {
  async getTestsForVacancy({ vacancyId }) {
    const url = new URL(`${TESTING_API_BASE_URL}/list`);
    url.searchParams.set('vacancy_id', vacancyId);
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },
};
