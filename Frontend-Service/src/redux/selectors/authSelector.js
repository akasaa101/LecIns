import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectError = createSelector([selectAuth], (auth) => auth.error);

export const selectErrorMessage = createSelector(
  [selectAuth],
  (auth) => auth.errorMessage
);
