const StrMatrixHelper = require('../helpers/str_matrix_helper');
const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const ObliqueMutantIdentifier = require('../services/oblique_mutant_identifier');
const DnaValidator = require('../validators/dna_validator');

class MutantIdentifier {
  static perform(dna) {
    return new MutantIdentifier(dna).isMutant();
  }

  constructor(dna) {
    this.dna = dna;
    this.dnaLength = dna?.length || 0;
    this.trasposedDna = undefined;
  }

  isMutant() {
    let numSequences = 0;

    numSequences = this.numMutantHorizontalSequence();
    if(numSequences > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
      return true;

    numSequences += this.numMutantVerticalSequence();
    if(numSequences > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
      return true;

    numSequences += ObliqueMutantIdentifier.perform(this.dna);
    if(numSequences > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
      return true;

    return numSequences + ObliqueMutantIdentifier.perform(this.getTransposedDna())
      > DnaValidator.MUTANT_NUM_LINE_SEQUENCES;
  }

  numMutantHorizontalSequence() {
    return MutantLineSequenceCounter.perform(this.dna);
  }

  numMutantVerticalSequence() {
    return MutantLineSequenceCounter.perform(this.getTransposedDna());
  }

  getTransposedDna() {
    if(this.trasposedDna === undefined)
      this.trasposedDna = StrMatrixHelper.rotate(this.dna);
    return this.trasposedDna;
  }
}

module.exports = MutantIdentifier;
