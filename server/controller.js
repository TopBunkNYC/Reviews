const { getAll, search } = require('./model.js')

module.exports = {
  getAll: (req, res) => {
    getAll((response) => {
      res.send(response);
    });
  },

  search: (req, res) => {
    search(req.query, (response) => {
      res.send(response);
    });
  }
}