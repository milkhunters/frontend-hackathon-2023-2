export default {
  getTestPuzzleById(id) {
    console.log(`Puzzle for id: ${id}.`);
    return {
      succeed: true,
      content: {
        id: 1,
        title: 'x',
        questions: [{ id: 1, text: 'y', value: 123 }],
      },
    };
  },

  submitTestPuzzle({ id, answers }) {
    console.log(`Submitted test with id ${id}`, answers)
    return { succeed: true };
  },

  submitCodePuzzle({ id, code }) {
    console.log(`Submitted code with id ${id}`, code);
    return { succeed: false, content: 'failed to compile' };
  },
};
