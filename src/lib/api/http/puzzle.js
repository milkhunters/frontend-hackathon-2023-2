import { makeApiRequest } from '@/lib/api/http/common/make-api-request';

const TESTING_API_BASE_URL = `${import.meta.env.VITE_API_URL}/vs/testing`;

export default {
  async getTestPuzzleById(id) {
    const url = `TESTING_API_BASE_URL/${id}`;
    return await makeApiRequest(url, 'GET', { sendCookies: true });
    return {
      succeed: true,
      content: {
        id: 1,
        title: 'x',
        questions: [
          {
            id: 1,
            title: 't',
            text: 'y',
            answers: [
              {
                id: 1,
                text: 'a',
              },
            ],
          },
        ],
      },
    };
  },

  submitTestPuzzle({ id, answers }) {
    console.log(`Submitted test with id ${id}`, answers);
    return { succeed: true };
  },

  getCodePuzzleById(id) {
    console.log(`Code for id: ${id}.`);
    return {
      succeed: true,
      content: {
        id: 1,
        description: 'bla',
      },
    };
  },

  submitCodePuzzle({ id, code }) {
    console.log(`Submitted code with id ${id}`, code);
    return { succeed: false, content: 'failed to compile' };
  },
};
