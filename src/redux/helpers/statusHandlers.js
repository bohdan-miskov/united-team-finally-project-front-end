export const setPending = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const setRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const setPaginationArrayRejected = (state, action) => {
  state.isLoading = false;
  state.items = [];
  state.hasPreviousPage = false;
  state.hasNextPage = false;
  state.page = 1;
  state.totalPages = 1;
  state.totalItems = 0;
  state.error = action.payload;
};
