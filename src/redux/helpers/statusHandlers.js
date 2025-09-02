export const setPending = state => {
  state.isLoading = true;
  state.error = null;
};

export const setListPending = state => {
  state.listLoading = true;
  state.listError = null;
};

export const setListRejected = (state, action) => {
  state.listLoading = false;
  state.listError = action.payload;
};

export const setOperationPending = state => {
  state.operationLoading = true;
  state.operationError = null;
};

export const setOperationRejected = (state, action) => {
  state.operationLoading = false;
  state.operationError = action.payload;
};

export const setRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const setPaginationArrayRejected = state => {
  state.items = [];
  state.hasPreviousPage = false;
  state.hasNextPage = false;
  state.page = 1;
  state.totalPages = 1;
  state.totalItems = 0;
};

export const resetPaginationArray = state => {
  state.isLoading = false;
  state.items = [];
  state.hasPreviousPage = false;
  state.hasNextPage = false;
  state.page = 1;
  state.totalPages = 1;
  state.totalItems = 0;
};
