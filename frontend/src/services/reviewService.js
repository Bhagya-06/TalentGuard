const STORAGE_KEY = 'workforce-retention-review-statuses';

export function getReviewState() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn('Unable to read review state from storage.', error);
    return {};
  }
}

export function persistReviewState(nextState) {
  if (typeof window === 'undefined') {
    return nextState;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch (error) {
    console.warn('Unable to save review state to storage.', error);
  }

  return nextState;
}

export function updateReviewStatus(employeeNumber, status) {
  const current = getReviewState();
  const nextState = {
    ...current,
    [String(employeeNumber)]: status
  };

  return persistReviewState(nextState);
}

export function clearReviewState() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return {};
}

export const reviewService = {
  getReviewState,
  persistReviewState,
  updateReviewStatus,
  clearReviewState
};
