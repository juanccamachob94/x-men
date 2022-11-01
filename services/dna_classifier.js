const MutantIdentifier = require('./mutant_identifier');
const Dna = require('../models/dna');
const DnaValidator = require('../validators/dna_validator');

class DnaClassifier {
  static async perform(dnaList) {
    let dna = new Dna({ dna: dnaList });
    if(DnaValidator.perform(dna.dna)) {
      let foundedDnaBody = await Dna.findOne({ sequence: dna.sequence }).exec();
      dna.isMutant = foundedDnaBody?.isMutant || MutantIdentifier.perform(dnaList);
      if(!foundedDnaBody)
        await dna.save();
    }
    else
      dna.isMutant = false;
    return dna.getDefaultData();
  }
}
module.exports = DnaClassifier;
