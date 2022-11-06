const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const DnaValidator = require('../validators/dna_validator');

class VerticalMutantIdentifier {
  constructor(dna) {
    this.dna = dna;
    this.dnaLength = this.dna.length;
    this.rotatedDna = [];
  }

  process() {
    let total = 0;
    for(let y = 0; y < this.dnaLength; y += 1) {
      total += this.numMutantSequences(y);
      if(total > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return total;
    }
    return total;
  }

  numMutantSequences(y) {
    let sequence = '';
    let num = undefined;
    for(let x = this.dnaLength - 1; x >= 0; x -= 1) {
      sequence += this.dna[x][y];
      if(sequence.length % DnaValidator.MUTANT_NUM_LINE_SEQUENCE === 0) {
        num = MutantLineSequenceCounter.performSequence(sequence);
        if(num > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
          return num;
      }
    }
    if(sequence.length % DnaValidator.MUTANT_NUM_LINE_SEQUENCE !== 0)
      return MutantLineSequenceCounter.performSequence(sequence);
    this.rotatedDna.push(sequence);
    return num;
  }

  getRotatedDna() {
    return this.rotatedDna;
  }
}

module.exports = VerticalMutantIdentifier;
