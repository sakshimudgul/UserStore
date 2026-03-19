const crypto = require('crypto');

// Generate random token
const generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Format date
const formatDate = (date) => {
  return new Date(date).toISOString();
};

// Pagination helper
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

// Get paginated data
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    items,
    totalPages,
    currentPage
  };
};

module.exports = {
  generateRandomToken,
  formatDate,
  getPagination,
  getPagingData
};