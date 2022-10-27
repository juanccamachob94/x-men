const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const StrMatrixHelper = require('../helpers/str_matrix_helper');

class ObliqueMutantIdentifier {
  static perform(dna) {
    return new ObliqueMutantIdentifier(dna).process();
  }

  constructor(dna) {
    this.dna = dna;
    this.dnaLength = this.dna.length;
  }

  process() {
    let total = 0;
    let limit = 4 - 1;
    let x = this.dnaLength - 1;
    let y = limit;
    for(; y < this.dnaLength; y += 1) {
      total += this.numMutantSequences(x, y);
      if(total > 1)
        return total;
    }
    for(x -= 1; x >= limit; x -= 1) {
      total += this.numMutantSequences(x, y - 1);
      if(total > 1)
        return total;
    }
    return total;
  }

  numMutantSequences(x, y) {
    let sequence = '';
    let i = x;
    let j = y;
    let num = undefined;
    while(StrMatrixHelper.isWithin(this.dna, i, j)) {
      sequence += this.dna[i--][j--];
      if(sequence.length % 4 == 0) {
        num = MutantLineSequenceCounter.performSequence(sequence);
        if(num > 1)
          return num;
      }
    }

    if(sequence.length % 4 != 0)
      return MutantLineSequenceCounter.performSequence(sequence);
    return num;
  }
}

module.exports = ObliqueMutantIdentifier;
