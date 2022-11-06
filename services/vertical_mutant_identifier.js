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
    let nitrogenBase = undefined;
    let sequence = '';
    let completeSequence = '';
    let num = undefined;
    let sequenceLength = undefined;
    for(let x = this.dnaLength - 1; x >= 0; x -= 1) {
      nitrogenBase = this.dna[x][y]
      sequence += nitrogenBase;
      completeSequence += nitrogenBase;
      sequenceLength = sequence.length
      if(sequenceLength % DnaValidator.MUTANT_NUM_LINE_SEQUENCE === 0) {
        num = MutantLineSequenceCounter.performSequence(sequence);
        if(num > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
          return num;
        else if(num == 0 && sequenceLength > DnaValidator.MUTANT_NUM_LINE_SEQUENCE)
          sequence = sequence.substring(DnaValidator.MUTANT_NUM_LINE_SEQUENCE);
      }
    }
    this.rotatedDna.push(completeSequence);
    if(sequence.length % DnaValidator.MUTANT_NUM_LINE_SEQUENCE !== 0)
      return MutantLineSequenceCounter.performSequence(sequence);
    return num;
  }

  getRotatedDna() {
    return this.rotatedDna;
  }
}

module.exports = VerticalMutantIdentifier;
