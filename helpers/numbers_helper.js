module.exports = {
  round(number, decimals) {
    const places = 10 ** decimals;
    return Math.round(number * places) / places;
  }
}
