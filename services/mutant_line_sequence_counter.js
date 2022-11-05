const DnaValidator = require('../validators/dna_validator');

class MutantLineSequenceCounter {
  static perform(dna) {
    let total = 0;
    const dnaLength = dna.length;
    for(let i = 0; i< dnaLength;  i+= 1) {
      total += this.performSequence(dna[i]);
      if(total > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return total;
    }
    return total;
  }

  static performSequence(sequence) {
    return (sequence.match(DnaValidator.MUTANT_LINE_SEQUENCE_REGEX) || []).length;
  }
}

module.exports = MutantLineSequenceCounter;
