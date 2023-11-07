export const getApiKey = (): string | undefined => {
  return import.meta.env.VITE_APP_API_KEY;
};
