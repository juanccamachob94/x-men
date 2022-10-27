class MutantLineSequenceCounter {
  static MUTANT_LINE_SEQUENCE_REGEX() {
    return MutantLineSequenceCounter.buildMutantLineSequenceRegex();
  }

  static buildMutantLineSequenceRegex() {
    let nitrogenBasesMatchers = [];
    ['A', 'C', 'G', 'T'].forEach(nitrogenBase => {
      nitrogenBasesMatchers.push(`${nitrogenBase}{${4}}`);
    });

    return new RegExp(nitrogenBasesMatchers.join('|'), 'g');
  }

  static perform(dna) {
    let total = 0;
    dna.forEach(sequence => { total += this.performSequence(sequence); });
    return total;
  }

  static performSequence(sequence) {
    return (sequence.match(MutantLineSequenceCounter.MUTANT_LINE_SEQUENCE_REGEX()) || []).length;
  }
}




module.exports = MutantLineSequenceCounter;
