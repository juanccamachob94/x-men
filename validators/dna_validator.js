class DnaValidator {
  static perform(dna) {
    return new DnaValidator(dna).isValid();
  }

  constructor(dna) {
    this.dna = dna;
    this.dnaLength = this.dna?.length || 0;
  }

  isValid() {
    return this.isValidDnaType() && this.hasValidContent();
  }

  isValidDnaType() {
    return Array.isArray(this.dna);
  }

  hasValidContent() {
    if(!this.dnaLength)
      return false;
    for(let i = 0; i < this.dnaLength; i += 1) {
      if(this.dna[i].length !== this.dnaLength)
        return false;
      for(let j = 0; j < this.dna[i].length; j += 1)
        if(!DnaValidator.HUMAN_NITROGEN_BASES.includes(this.dna[i][j]))
          return false;
    }
    return true;
  }
}

DnaValidator.HUMAN_NITROGEN_BASES = ['A', 'C', 'G', 'T'];
DnaValidator.MUTANT_NUM_LINE_SEQUENCE = 4;
DnaValidator.MUTANT_NUM_LINE_SEQUENCES = 1;
DnaValidator.SEPARATOR = '|';
module.exports = DnaValidator;
