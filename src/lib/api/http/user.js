import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const USER_API_BASE_URL = `${import.meta.env.VITE_API_URL}/ums/user`;

export default {
	async getCurrentUser() {
		return await makeApiRequest(USER_API_BASE_URL, 'GET', { sendCookies: true });
	},
};
