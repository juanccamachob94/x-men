const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const StrMatrixHelper = require('../helpers/str_matrix_helper');
const DnaValidator = require('../validators/dna_validator');

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
    let limit = DnaValidator.MUTANT_NUM_LINE_SEQUENCE - 1;
    let x = this.dnaLength - 1;
    let y = limit;
    for(; y < this.dnaLength; y += 1) {
      total += this.numMutantSequences(x, y);
      if(total > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return total;
    }
    for(x -= 1; x >= limit; x -= 1) {
      total += this.numMutantSequences(x, y - 1);
      if(total > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
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
      if(sequence.length % DnaValidator.MUTANT_NUM_LINE_SEQUENCE === 0) {
        num = MutantLineSequenceCounter.performSequence(sequence);
        if(num > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
          return num;
      }
    }

    if(sequence.length % DnaValidator.MUTANT_NUM_LINE_SEQUENCE !== 0)
      return MutantLineSequenceCounter.performSequence(sequence);
    return num;
  }
}

module.exports = ObliqueMutantIdentifier;
