// Utility function to add minimum loading time for better UX
// This ensures users see the skeleton loaders even with fast connections
export const withMinimumDelay = async <T>(
  promise: Promise<T>,
  minimumDelayMs: number = 800
): Promise<T> => {
  const [result] = await Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, minimumDelayMs)),
  ]);
  return result;
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

