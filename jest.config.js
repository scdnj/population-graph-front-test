module.exports = {
  roots: ['<rootDir>'],
  moduleNameMapper: {},
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  transform: { '^.+\\.(t|j)sx?$': ['@swc/jest'] },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};
