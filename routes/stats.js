const router = require('express').Router();
const StatsController = require('../controllers/stats');

router.route('/')
  .get(StatsController.index)

module.exports = router;
