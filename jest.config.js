export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
