import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const USER_API_BASE_URL = `${import.meta.env.VITE_API_URL}/ums/user`;

export default {
  async getCurrentUser() {
    return await makeApiRequest(USER_API_BASE_URL, 'GET', {
      sendCookies: true,
    });
  },

  async updateUser(data) {
    return await makeApiRequest(USER_API_BASE_URL, 'PUT', {
      data,
      sendCookies: true,
    });
  },

  async updateUserDocument(data) {
    return await makeApiRequest(`${USER_API_BASE_URL}/document`, 'PUT', {
      data,
      sendCookies: true,
    })
  },
  async getUserDocument() {
    return await makeApiRequest(`${USER_API_BASE_URL}/document`, 'GET', {
      sendCookies: true,
    });
  },

  async updateUserDocument({ file }) {
    const backUrl = new URL(`${USER_API_BASE_URL}/document`);
    backUrl.searchParams.set('file_type', 'image/jpeg');
    const updateResult = await makeApiRequest(backUrl, 'PUT', {
      sendCookies: true,
    });
    if (!updateResult.succeed) return updateResult;
    const form = new FormData();
    Object.entries(updateResult.content.fields).forEach(([field, value]) => {
      form.append(field, value);
    });
    form.append('file', file);
    const response = await fetch(updateResult.content.url, {
      method: 'POST',
      body: form,
    });
    return { succeed: response.ok };
  },

  async getAllUsers() {
    const url = `${USER_API_BASE_URL}/list`;
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },

  async getUserById(id) {
    const url = `${USER_API_BASE_URL}/${id}`;
    return await makeApiRequest(url, 'GET', { sendCookies: true });
  },

  async updateUserRole({ id, roleId }) {
    const { succeed, content: user } = await this.getUserById(id);
    if (!succeed) return { succeed };
    const url = `${USER_API_BASE_URL}/${id}`;
    const data = { roleId };
    return await makeApiRequest(url, 'PUT', { data, sendCookies: true });
  },
};
