import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const ROLE_API_BASE_URL = `${import.meta.env.VITE_API_URL}/ums/role`;
const ROLE_GUEST_PERMISSIONS_URL = `${ROLE_API_BASE_URL}/permission/guest`;

export default {
	async getGuestPermissions() {
		return await makeApiRequest(ROLE_GUEST_PERMISSIONS_URL, 'GET');
	},

	async getAllRoles() {
		return await makeApiRequest(`${ROLE_API_BASE_URL}/list`, 'GET', { sendCookies: true });
	},
};
