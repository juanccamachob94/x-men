const StatsService = require('../services/stats_service');

module.exports = {
  index: async(req, res) => {
    res.json(await StatsService.perform());
  }
}
