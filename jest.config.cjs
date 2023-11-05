module.exports = {
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/tests/CSSStub.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
    '^.+\\.vue$': '@vue/vue3-jest', // Update to match your installed version
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setupAfterEnv.ts'],
  testPathIgnorePatterns: ['<rootDir>/tests/learn'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  setupFiles: ['<rootDir>/tests/jest.setup.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};
