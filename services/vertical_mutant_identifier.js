const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const SequenceProcessor = require('../services/sequence_processor');
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
      if(total >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return total;
    }
    return total;
  }

  numMutantSequences(y) {
    let nitrogenBase = undefined;
    let sequence = '';
    let completeSequence = '';
    let response = undefined;
    for(let x = this.dnaLength - 1; x >= 0; x -= 1) {
      nitrogenBase = this.dna[x][y]
      sequence += nitrogenBase;
      response = SequenceProcessor.perform(sequence);
      if(typeof(response) === 'number')
        return response;
      sequence = response;
      completeSequence += nitrogenBase;
    }
    this.rotatedDna.push(completeSequence);
    return MutantLineSequenceCounter.performSequence(sequence);
  }

  getRotatedDna() {
    return this.rotatedDna;
  }
}

module.exports = VerticalMutantIdentifier;
