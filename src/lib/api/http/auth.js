import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const AUTH_API_BASE_URL = `${import.meta.env.VITE_API_URL}/ums/auth`;
const AUTH_SIGN_UP_API_URL = `${AUTH_API_BASE_URL}/signUp`;
const AUTH_SEND_CONFIRMATION_MAIL_API_URL = `${AUTH_API_BASE_URL}/send`;
const AUTH_SEND_CONFIRMATION_CODE_API_URL = `${AUTH_API_BASE_URL}/confirm`;
const AUTH_SIGN_IN_API_URL = `${AUTH_API_BASE_URL}/signIn`;
const AUTH_LOGOUT_API = `${AUTH_API_BASE_URL}/logout`;
const AUTH_REFRESH_TOKENS_API = `${AUTH_API_BASE_URL}/refresh_tokens`;

export default {
	async signUp(data) {
		return await makeApiRequest(AUTH_SIGN_UP_API_URL, 'POST', { data });
	},

	async sendConfirmationMail({ email }) {
		const url = `${AUTH_SEND_CONFIRMATION_MAIL_API_URL}/${email}`;
		return await makeApiRequest(url, 'POST');
	},

	async confirmEmail({ email, code }) {
		const url = `${AUTH_SEND_CONFIRMATION_CODE_API_URL}/${email}?code=${code}`;
		return await makeApiRequest(url, 'POST');
	},

	async signIn(data) {
		return await makeApiRequest(AUTH_SIGN_IN_API_URL, 'POST', { data, sendCookies: true });
	},

	async logout() {
		return await makeApiRequest(AUTH_LOGOUT_API, 'POST', { sendCookies: true });
	},

	async refreshTokens() {
		return await makeApiRequest(AUTH_REFRESH_TOKENS_API, 'POST', { sendCookies: true });
	},
};
