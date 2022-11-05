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
    const length = sequence.length;
    let pivot = undefined;
    let count = undefined;
    let y = undefined;
    let total = 0;
    for(let x = 0; x < length;) {
      pivot = sequence[x];
      y = x;
      count = 0;
      while(pivot == sequence[y]) {
        count++;
        if(count >= DnaValidator.MUTANT_NUM_LINE_SEQUENCE) {
          total += 1;
          break;
        }
        if(total > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
          return total;
        y++;
      }
      x = y;
    }
    return total;
  }
}

module.exports = MutantLineSequenceCounter;
