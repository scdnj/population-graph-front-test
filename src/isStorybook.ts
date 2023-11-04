export const isStorybook = (): boolean => {
  return Boolean(import.meta.env.STORYBOOK === 'true');
};
