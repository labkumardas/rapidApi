exports.getPagingData = (result, page) => {
  const limit = 10;
  const { totalItems, records } = result; // Assuming your total count is in the first row
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, totalPages, currentPage };
};

exports.getPagination = async (page, size) => {
  const limit = size ? +size : 10;
  const offset =
    !page || parseInt(page, 10) === 1 || parseInt(page, 10) === 0
      ? 0
      : page * limit - limit;
  return { limit, offset };
};
