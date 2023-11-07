export const getBasePath = () => {
  if (import.meta.env.PROD) {
    return '/api/v1';
  }
  return 'https://opendata.resas-portal.go.jp/api/v1/';
};
