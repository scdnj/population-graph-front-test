module.exports = {
  roots: ['<rootDir>'],
  moduleNameMapper: {},
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
    '^.+\\.vue$': '@vue/vue3-jest', // Update to match your installed version
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  setupFiles: ['<rootDir>/tests/jest.setup.js'],
};
