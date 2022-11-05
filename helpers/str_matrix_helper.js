class StrMatrixHelper {
  static rotate(strMatrix) {
    let strMatrixLength = strMatrix.length;
    let rotatedStrMatrix = [];
    let row = undefined;
    let x = undefined;
    for(let y = 0; y < strMatrixLength; y += 1) {
      row = '';
      for(x = strMatrixLength - 1; x >= 0; x -= 1)
        row += strMatrix[x][y];
      rotatedStrMatrix.push(row);
    } 
    return rotatedStrMatrix;
  }

  static isWithin(strMatrix, x, y) {
    let length = strMatrix.length;
    return x >= 0 && x < length && y >= 0 && y < length;
  }
}

module.exports = StrMatrixHelper;
