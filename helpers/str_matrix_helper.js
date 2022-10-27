class StrMatrixHelper {
  static trasposed(strMatrix) {
    let strMatrixLength = strMatrix.length;
    let trasposedStrMatrix = [];
    for (let i = 0; i < strMatrixLength; i += 1)
      trasposedStrMatrix.push(strMatrix.map(row => row[i]).join(''));
    return trasposedStrMatrix;
  }

  static isWithin(strMatrix, x, y) {
    let length = strMatrix.length;
    return x >= 0 && x < length && y >= 0; y < length;
  }
}

module.exports = StrMatrixHelper;
