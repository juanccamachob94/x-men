const DnaValidator = require('../validators/dna_validator');
const mongoose = require('mongoose');

const DnaSchema = new mongoose.Schema({
    sequence: {
      type: String,
      unique: true,
      required: true
    },
    isMutant: {
      type: Boolean,
      required: true
    }
});

DnaSchema.virtual('dna')
  .get(function() {
    if(!this.dnaList)
      this.dnaList = this.sequence?.split(DnaValidator.SEPARATOR);
    return this.dnaList;
  })
  .set(function(dna) {
    this.dnaList = dna;
    try {
      this.sequence = this.sequence || dna.join(DnaValidator.SEPARATOR);
    } catch(error) {
    }
  });

DnaSchema.methods.getDefaultData = function() {
  let response = { dna: this.dna };
  if(this.isMutant !== undefined)
    response.isMutant = this.isMutant;
  return response;
};

const Dna = mongoose.model('Dna', DnaSchema);
module.exports = Dna;
