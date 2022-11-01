const DnaValidator = require('../validators/dna_validator');

class MutantLineSequenceCounter {
  static perform(dna) {
    let total = 0;
    dna.forEach(sequence => { total += this.performSequence(sequence); });
    return total;
  }

  static performSequence(sequence) {
    return (sequence.match(DnaValidator.MUTANT_LINE_SEQUENCE_REGEX) || []).length;
  }
}

module.exports = MutantLineSequenceCounter;
