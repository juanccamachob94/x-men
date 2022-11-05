const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const DnaValidator = require('../validators/dna_validator');

class VerticalMutantIdentifier {
  constructor(dna) {
    this.dna = dna;
    this.dnaLength = this.dna.length;
    this.rotatedDna = [];
  }

  process() {
    let row = undefined;
    let x = undefined;
    let num = undefined;
    let total = 0;
    for (let y = 0; y < this.dnaLength; y += 1) {
      row = '';
      for(x = this.dnaLength - 1; x >= 0; x -= 1) {
        row += this.dna[x][y];
        num = total + MutantLineSequenceCounter.performSequence(row);
        if(row.length % DnaValidator.MUTANT_NUM_LINE_SEQUENCE === 0
          && num > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
            return num;
      }
      total += MutantLineSequenceCounter.performSequence(row);
      if(total > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return total;
      this.rotatedDna.push(row);
    }
    return total;
  }

  getRotatedDna() {
    return this.rotatedDna;
  }
}

module.exports = VerticalMutantIdentifier;
