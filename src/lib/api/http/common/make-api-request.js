import { toCamelCase, toSnakeCase } from '@/lib/api/http/common/format';

const REFRESH_TOKENS_URL = `${import.meta.env.VITE_API_URL}/ums/auth/refresh_tokens`;

const toApiRequest = (data) => {
	const request = toSnakeCase(data);
	return JSON.stringify(request);
};

const errorToResult = (error) => {
	if (error.type === 1) return error.content;
	if (error.type === 2) {
		const result = error.content.map(({ field, message }) => [field, message.split(', ')[1]]);
		return toCamelCase(Object.fromEntries(result));
	}
	throw new Error(`Unknown api error type ${error.type}.`);
};

const tryParse = async (response) => {
	try {
		return await response.json();
	} catch {
		return null;
	}
};

const toApiResponse = async (data) => {
	const response = await tryParse(data);
	if (!response) return { succeed: data.ok };
	if (response.error == null && response.content == null)
		return { succeed: data.ok, content: response };
	const succeed = response.error === null;
	const content = succeed ? toCamelCase(response.content) : errorToResult(response.error);
	return { succeed, content };
};

export const makeApiRequest = async (url, method, { data = {}, sendCookies = false, retry = true } = {}) => {
	const hasBody = !['GET', 'HEAD'].includes(method);
	const body = hasBody ? toApiRequest(data) : undefined;
	const headers = { 'Content-Type': 'application/json' };
	const credentials = sendCookies ? 'include' : undefined;
	const response = await fetch(url, { method, headers, body, credentials });
	if (response.status === 403 && retry) {
		await makeApiRequest(REFRESH_TOKENS_URL, 'POST', { sendCookies: true, retry: false });
		return await makeApiRequest(url, method, { data, sendCookies, retry: false });
	}
	return await toApiResponse(response);
};
