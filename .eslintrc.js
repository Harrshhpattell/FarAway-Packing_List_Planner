module.exports = {
  // ... other ESLint configuration ...

  rules: {
    "no-restricted-globals": [
      "error",
      {
        name: "addEventListener",
        message: 'Use of "addEventListener" is allowed in service workers.',
      },
    ],
  },
};
