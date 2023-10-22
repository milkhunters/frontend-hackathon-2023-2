import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const VACANCY_API_BASE_URL = `${import.meta.env.VITE_API_URL}/vs/vacancy`;
const VACANCY_GET_ALL_URL = `${VACANCY_API_BASE_URL}/list`;
const VACANCY_NEW_URL = `${VACANCY_API_BASE_URL}/new`;

export default {
  async getAllVacancies(page, count, query) {
    const url = new URL(VACANCY_GET_ALL_URL);
    url.searchParams.set('state', '1');
    url.searchParams.set('page', page.toString());
    url.searchParams.set('per_page', count.toString());
    url.searchParams.set('order_by', 'created_at');
    if (query) url.searchParams.set('query', query);
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },

  async newVacancy(data) {
    return await makeApiRequest(VACANCY_NEW_URL, 'POST', {
      sendCookies: true,
      data,
    });
  },

  async getVacancyById(id) {
    const url = `${VACANCY_API_BASE_URL}/${id}`;
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },

  async deleteVacancyById(id) {
    const url = `${VACANCY_API_BASE_URL}/${id}`;
    return await makeApiRequest(url, 'DELETE', { sendCookies: true });
  },

  async updateVacancyById(id, data) {
    const url = `${VACANCY_API_BASE_URL}/${id}`;
    return await makeApiRequest(url, 'PUT', {
      sendCookies: true,
      data,
    });
  },
};
