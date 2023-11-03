jest.mock('@/scripts/Api/getApiKey', () => {
  return {
    getApiKey: () => '',
  };
});
