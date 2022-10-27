const MutantIdentifier = require('../services/mutant_identifier');

module.exports = {
  create: async(req, res) => {
    const isMutant = MutantIdentifier.perform(req.body.dna)
    if(!isMutant)
      res.status(403);
    res.json({ mutant: isMutant });
  }
}
