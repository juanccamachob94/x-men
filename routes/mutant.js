const router = require('express').Router();
const MutantController = require('../controllers/mutant');

router.route('/')
  .post(MutantController.create)

module.exports = router;
