const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const ObliqueMutantIdentifier = require('../services/oblique_mutant_identifier');
const VerticalMutantIdentifier = require('../services/vertical_mutant_identifier');
const TasksService = require('../services/tasks_service');
const DnaValidator = require('../validators/dna_validator');

class MutantIdentifier {
  static async perform(dna) {
    return await (new MutantIdentifier(dna).isMutant());
  }

  constructor(dna) {
    this.dna = dna;
    this.dnaLength = dna?.length || 0;
    this.verticalMutantIdentifier = undefined;
  }

  async isMutant() {
    let numSequences = 0;

    numSequences += await this.executeAlgorithms([
      this.numMutantHorizontalSequence,
      this.numMutantVerticalSequence
    ]);

    if(numSequences > DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
      return true;

      numSequences += await this.executeAlgorithms([
        this.numMutantBasicObliqueSequence,
        this.numMutantRotatedObliqueSequence
      ]);
    return numSequences > DnaValidator.MUTANT_NUM_LINE_SEQUENCES
  }

  async executeAlgorithms(tasks) {
    return (await TasksService.execute(this, tasks))
      .reduce((partialSum, a) => partialSum + a, 0);;
  }

  numMutantHorizontalSequence() {
    return MutantLineSequenceCounter.perform(this.dna);
  }

  numMutantVerticalSequence() {
    return this.getVerticalMutantIdentifier().process();
  }

  numMutantBasicObliqueSequence() {
    return ObliqueMutantIdentifier.perform(this.dna);
  }

  numMutantRotatedObliqueSequence() {
    return ObliqueMutantIdentifier.perform(this.getVerticalMutantIdentifier().getRotatedDna());
  }

  getVerticalMutantIdentifier() {
    if(this.verticalMutantIdentifier === undefined)
      this.verticalMutantIdentifier = new VerticalMutantIdentifier(this.dna);
    return this.verticalMutantIdentifier;
  }
}

module.exports = MutantIdentifier;
