const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const SequenceProcessor = require('../services/sequence_processor');
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
    const limit = DnaValidator.MUTANT_NUM_LINE_SEQUENCE - 1;
    let x = this.dnaLength - 1;
    let y = limit;
    for(; y < this.dnaLength; y += 1) {
      total += this.numMutantSequences(x, y);
      if(total >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return total;
    }
    for(x -= 1; x >= limit; x -= 1) {
      total += this.numMutantSequences(x, y - 1);
      if(total >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return total;
    }
    return total;
  }

  numMutantSequences(x, y) {
    let sequence = '';
    let i = x;
    let j = y;
    let response = undefined;
    while(StrMatrixHelper.isWithin(this.dna, i, j)) {
      sequence += this.dna[i--][j--];
      response = SequenceProcessor.perform(sequence);
        if(typeof(response) === 'number')
          return response;
        sequence = response;
    }

    return MutantLineSequenceCounter.performSequence(sequence);
  }
}

module.exports = ObliqueMutantIdentifier;
