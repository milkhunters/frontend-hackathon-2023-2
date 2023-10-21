import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const VACANCY_API_BASE_URL = `${import.meta.env.VITE_API_URL}/vs/vacancy`;
const VACANCY_GET_ALL_URL = `${VACANCY_API_BASE_URL}/list`;

export default {
  async getAllVacancies() {
    return await makeApiRequest(VACANCY_GET_ALL_URL, 'GET', { sendCookies: true });
  },
};
