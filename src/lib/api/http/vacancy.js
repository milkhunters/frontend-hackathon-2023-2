import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const VACANCY_API_BASE_URL = `${import.meta.env.VITE_API_URL}/vs/vacancy`;
const VACANCY_GET_ALL_URL = `${VACANCY_API_BASE_URL}/list`;

export default {
  async getAllVacancies(page, count) {
    const url = new URL(VACANCY_GET_ALL_URL);
    url.searchParams.set('state', '1');
    url.searchParams.set('page', page.toString());
    url.searchParams.set('per_page', count.toString());
    url.searchParams.set('order_by', 'created_at');
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },
};
