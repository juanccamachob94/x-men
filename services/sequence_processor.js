const MutantLineSequenceCounter = require('../services/mutant_line_sequence_counter');
const DnaValidator = require('../validators/dna_validator');

class SequenceProcessor {
  static perform(sequence) {
    const sequenceLength = sequence.length;
    if(sequenceLength % DnaValidator.MUTANT_NUM_LINE_SEQUENCE === 0) {
      const num = MutantLineSequenceCounter.performSequence(sequence);
      if(num >= DnaValidator.MUTANT_NUM_LINE_SEQUENCES)
        return num;
      else if(num == 0 && sequenceLength > DnaValidator.MUTANT_NUM_LINE_SEQUENCE)
        return sequence.substring(DnaValidator.MUTANT_NUM_LINE_SEQUENCE);
    }
    return sequence;
  }
}

module.exports = SequenceProcessor;
