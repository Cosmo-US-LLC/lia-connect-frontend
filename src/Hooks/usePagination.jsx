import { useState } from 'react';

const usePagination = (initialLimit = 10) => {
  const [pagination, setPagination] = useState({
    limit: initialLimit,
    page: 1,
    totalPages: null,
    totalResults: null,
  });

  const updatePagination = (newPagination) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      ...newPagination,
    }));
  };

  return [pagination, updatePagination];
};

export default usePagination;
