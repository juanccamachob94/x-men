const MutantIdentifier = require('./mutant_identifier');
const Dna = require('../models/dna');
const DnaValidator = require('../validators/dna_validator');

class DnaClassifier {
  static async perform(dnaList) {
    let dna = new Dna({ dna: dnaList, isMutant: false });

    if(!DnaValidator.perform(dna.dna))
      return dna.getDefaultData();

    let foundedDna = await Dna.findOne({ sequence: dna.sequence }).exec();
    if(foundedDna)
      dna = foundedDna;
    else {
      dna.isMutant = MutantIdentifier.perform(dnaList);
      await dna.save();
    }

    return dna.getDefaultData();
  }
}
module.exports = DnaClassifier;
