export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectAuthIsLoading = state => state.auth.isLoading;
export const selectIsInitialized = state => state.auth.isInitialized;
export const selectAuthError = state => state.auth.error;
export const selectOauthUrl = state => state.auth.oauthUrl;
