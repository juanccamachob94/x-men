const DnaClassifier = require('../services/dna_classifier');

module.exports = {
  create: async(req, res) => {
    const dnaBody = await DnaClassifier.perform(req.body?.dna);
    if(!dnaBody.isMutant)
      res.status(403);
    res.json(dnaBody);
  }
}
