const MutantIdentifier = require('./mutant_identifier');
const Dna = require('../models/dna');
const DnaValidator = require('../validators/dna_validator');

class DnaClassifier {
  static async perform(dnaList) {
    let dna = new Dna({ dna: dnaList, isMutant: false });

    if(!DnaValidator.perform(dna.dna))
      return dna.getDefaultData();

    const foundedDna = await Dna.findOne({ sequence: dna.sequence }).exec();
    if(foundedDna)
      dna = foundedDna;
    else {
      dna.isMutant = MutantIdentifier.perform(dnaList);
      try {
        await dna.save();
      } catch(error) {
        if(error.name !== 'MongoError' || error.code !== 11000)
          throw new Error(error);
      }
    }
    return dna.getDefaultData();
  }
}
module.exports = DnaClassifier;
