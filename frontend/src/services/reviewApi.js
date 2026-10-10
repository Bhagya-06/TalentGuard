import { getReviewState, updateReviewStatus } from './reviewService';

export const reviewApi = {
  async listReviews() {
    return {
      ok: true,
      data: getReviewState()
    };
  },

  async updateReview(employeeNumber, status) {
    const nextState = updateReviewStatus(employeeNumber, status);
    return {
      ok: true,
      data: {
        employeeNumber: Number(employeeNumber),
        status,
        reviewState: nextState
      }
    };
  },

  async exportReviews() {
    return {
      ok: true,
      data: getReviewState()
    };
  }
};
