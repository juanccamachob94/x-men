const StrMatrixHelper = require('../helpers/str_matrix_helper');
const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const ObliqueMutantIdentifier = require('../services/oblique_mutant_identifier');
class MutantIdentifier {
  static MUTANT_NUM_LINE_SEQUENCE() {
    return 4
  }

  static HUMAN_NITROGEN_BASES() {
    return ['A', 'C', 'G', 'T'];
  }

  static perform(dna) {
    let mutanIdentifier = new MutantIdentifier(dna);
    return mutanIdentifier.isValid() && mutanIdentifier.isMutant();
  }

  constructor(dna) {
    this.dna = dna;
    this.dnaLength = this.isDnaAMatrix() ? dna.length : 0;
    this.trasposedDna = undefined;
  }

  isDnaAMatrix() {
    return Array.isArray(this.dna);
  }

  isValid() {
    if(!this.isDnaAMatrix())
      return false
    let numValidNitrogenBases = 0;
    for(let i = 0; i < this.dnaLength; i += 1)
      for(let j = 0; j < this.dna[i].length; j += 1)
        if(MutantIdentifier.HUMAN_NITROGEN_BASES().includes(this.dna[i][j]))
          numValidNitrogenBases += 1;
    return numValidNitrogenBases == this.dnaLength * this.dnaLength;
  }

  isMutant() {
    let minimumMutantSequences = 1;
    let numSequences = 0;
    numSequences = this.numMutantHorizontalSequence();
    if(numSequences > minimumMutantSequences)
      return true;

    numSequences += this.numMutantVerticalSequence();
    if(numSequences > minimumMutantSequences)
      return true;

    numSequences += ObliqueMutantIdentifier.perform(this.dna);
    if (numSequences > minimumMutantSequences)
      return true;

    return numSequences
      + ObliqueMutantIdentifier.perform(this.getTransposedDna()) > minimumMutantSequences;
  }

  numMutantHorizontalSequence() {
    return MutantLineSequenceCounter.perform(this.dna);
  }

  numMutantVerticalSequence() {
    return MutantLineSequenceCounter.perform(this.getTransposedDna());
  }

  getTransposedDna() {
    if(this.trasposedDna === undefined)
      this.trasposedDna = StrMatrixHelper.trasposed(this.dna);
    return this.trasposedDna;
  }
}

module.exports = MutantIdentifier;
