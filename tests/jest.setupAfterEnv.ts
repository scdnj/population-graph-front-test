import '@testing-library/jest-dom';

jest.mock('@/scripts/Api/getApiKey', () => {
  return {
    getApiKey: () => '',
  };
});

jest.mock('@/scripts/Api/getBasePath', () => {
  return { getBasePath: () => '' };
});

jest.mock('@/isStorybook', () => {
  return {
    isStorybook: () => false,
  };
});
