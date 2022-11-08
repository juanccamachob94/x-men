const DnaValidator = require('../validators/dna_validator');

class MutantLineSequenceCounter {
  static perform(dna) {
    let total = 0;
    const dnaLength = dna.length;
    for(let i = 0; i< dnaLength;  i+= 1) {
      total += this.performSequence(dna[i]);
      if(total >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return total;
    }
    return total;
  }

  static performSequence(sequence) {
    const length = sequence.length;
    let pivot = undefined;
    let count = undefined;
    let total = 0;
    for(let q = 0; q < length;) {
      pivot = sequence[q];
      count = 0;

      while(pivot === sequence[q + count])
        if(++count === DnaValidator.MUTANT_NUM_LINE_SEQUENCE) {
          total += 1;
          break;
        }

      if(total >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return total;

      q += count;
    }
    return total;
  }
}

module.exports = MutantLineSequenceCounter;
