export function getPaginationWindow(page, totalPages, windowSize = 6) {
  if (totalPages <= windowSize) {
    return { startPage: 1, lastPage: totalPages };
  }

  const half = Math.floor(windowSize / 2);

  if (page + half >= totalPages) {
    return { startPage: totalPages - windowSize + 1, lastPage: totalPages };
  }

  if (page <= half) {
    return { startPage: 1, lastPage: windowSize };
  }

  return { startPage: page - half + 1, lastPage: page - half + windowSize };
}
