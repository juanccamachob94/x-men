class StrMatrixHelper {
  static isWithin(strMatrix, x, y) {
    const length = strMatrix.length;
    return x >= 0 && x < length && y >= 0 && y < length;
  }
}

module.exports = StrMatrixHelper;
