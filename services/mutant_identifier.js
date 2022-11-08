const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const ObliqueMutantIdentifier = require('../services/oblique_mutant_identifier');
const VerticalMutantIdentifier = require('../services/vertical_mutant_identifier');
const DnaValidator = require('../validators/dna_validator');

class MutantIdentifier {
  static perform(dna) {
    return new MutantIdentifier(dna).isMutant();
  }

  constructor(dna) {
    this.dna = dna;
    this.dnaLength = dna?.length || 0;
    this.verticalMutantIdentifier = undefined;
  }

  isMutant() {
    let numSequences = 0;

    numSequences = this.numMutantHorizontalSequence();
    if(numSequences >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
      return true;

    numSequences += this.numMutantVerticalSequence();
    if(numSequences >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
      return true;

    numSequences += ObliqueMutantIdentifier.perform(this.dna);
    if(numSequences >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
      return true;

    return numSequences + ObliqueMutantIdentifier.perform(
        this.getVerticalMutantIdentifier().getRotatedDna()
      )
      >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES;
  }

  numMutantHorizontalSequence() {
    return MutantLineSequenceCounter.perform(this.dna);
  }

  numMutantVerticalSequence() {
    return this.getVerticalMutantIdentifier().process();
  }

  getVerticalMutantIdentifier() {
    if(this.verticalMutantIdentifier === undefined)
      this.verticalMutantIdentifier = new VerticalMutantIdentifier(this.dna);
    return this.verticalMutantIdentifier;
  }
}

module.exports = MutantIdentifier;
