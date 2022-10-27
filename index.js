class StrMatrixHelper {
  static trasposed(strMatrix) {
    let strMatrixLength = strMatrix.length;
    let trasposedStrMatrix = [];
    for(let i = 0; i < strMatrixLength; i += 1)
      trasposedStrMatrix.push(strMatrix.map(row => row[i]).join(''));
    return trasposedStrMatrix;
  }
}

class MutantIdentifier {
  static MUTANT_NUM_LINE_SEQUENCE = 4;
  static HUMAN_NITROGEN_BASES = ['A', 'C', 'G', 'T'];
  static MUTANT_LINE_SEQUENCE_REGEX = MutantIdentifier.buildMutantLineSequenceRegex();

  static perform(dna) {
    let mutanIdentifier = new MutantIdentifier(dna);
    return mutanIdentifier.isValid() && mutanIdentifier.isMutant();
  }

  static buildMutantLineSequenceRegex() {
    let nitrogenBasesMatchers = [];
    MutantIdentifier.HUMAN_NITROGEN_BASES.forEach(nitrogenBase => {
      nitrogenBasesMatchers.push(`${nitrogenBase}{${MutantIdentifier.MUTANT_NUM_LINE_SEQUENCE}}`);
    });
    return new RegExp(nitrogenBasesMatchers.join('|'), 'g');
  }

  constructor(dna) {
    this.dna = dna;
    this.dnaLength = dna.length;
  }

  isValid() {
    let numValidNitrogenBases = 0;
    for(let i = 0; i < this.dnaLength; i += 1)
      for(let j = 0; j < this.dna[i].length; j += 1)
        if(MutantIdentifier.HUMAN_NITROGEN_BASES.includes(this.dna[i][j]))
          numValidNitrogenBases += 1;
    return numValidNitrogenBases == this.dnaLength * this.dnaLength;
  }

  isMutant() {
    let mutantHorizontalSequence = this.hasMutantHorizontalSequence();
    let mutantVerticalSequence = this.hasMutantVerticalSequence();

    if(mutantHorizontalSequence && mutantVerticalSequence)
      return true;
    let mutantObliqueSequence = this.hasMutantObliqueSequence();
    return (mutantHorizontalSequence && mutantObliqueSequence) ||
      (mutantVerticalSequence && mutantObliqueSequence);
  }

  hasMutantHorizontalSequence() {
    return this.hasMutantLineSequence(this.dna);
  }

  hasMutantVerticalSequence() {
    return this.hasMutantLineSequence(StrMatrixHelper.trasposed(this.dna));
  }

  hasMutantObliqueSequence() {
    let numChekableRows = this.dnaLength - MutantIdentifier.MUTANT_NUM_LINE_SEQUENCE + 1;
    let j = undefined;
    for(let i = 0; i < numChekableRows; i += 1)
      for(j = 0; j < this.dnaLength; j += 1)
        if(ObliqueWithSameValuesIdentifier.perform(this.dna,
            MutantIdentifier.MUTANT_NUM_LINE_SEQUENCE, i, j))
          return true;
    return false;
  }

  hasMutantLineSequence(dna) {
    return dna.some(sequence => sequence.match(MutantIdentifier.MUTANT_LINE_SEQUENCE_REGEX));
  }
}

class ObliqueWithSameValuesIdentifier {
  static perform(matrix, numLineSequence, x, y) {
    return new ObliqueWithSameValuesIdentifier(matrix, numLineSequence, x, y).identify();
  }

  constructor(matrix, numLineSequence, x, y) {
    this.matrix = matrix;
    this.matrixLength = matrix.length;
    this.numLineSequence = numLineSequence;
    this.x = x;
    this.y = y;
  }

  identify() {
    return this.identifyByOrientation(true) || this.identifyByOrientation(false);
  }

  identifyByOrientation(type) {
    let limit = this.numLineSequence - 1;
    let i = type ? this.x + limit : this.x - limit
    let j = this.y + limit;

    if(i < 0 || i >= this.matrixLength || j < 0 || j >= this.matrixLength)
      return false;

    let item = this.matrix[this.x][this.y];
    if(this.matrix[i][j] !== item)
      return false;

    let xBase = type ? this.x : i;
    let l = undefined;
    for(l = this.y + 1; l < j; l += 1) {
      xBase += type ? 1 : -1;
      if(this.matrix[xBase][l] !== item)
        return false;
    }
    return true;
  }
}

function isMutant(dna) {
  return MutantIdentifier.perform(dna);
}
