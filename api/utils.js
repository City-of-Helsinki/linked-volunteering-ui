const toInt = (s) => (typeof s === 'number' ? s : parseInt(s, 10));
const findById = (id) => (e) => e.id === toInt(id);
const findByNotId = (id) => (e) => e.id !== toInt(id);
const getStatus = (b) => (b ? 200 : 404);

module.exports = {
  toInt,
  findById,
  findByNotId,
  getStatus,
};
