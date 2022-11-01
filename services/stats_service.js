const Dna = require('../models/dna');
const NumbersHelper = require('../helpers/numbers_helper');

class StatsService {
  static async perform() {
    return await (new StatsService().process());
  }

  constructor() {
    this.countMutantDna = undefined;
    this.countHumanDna = undefined;
    this.ratio = undefined;
  }

  async process() {
    return {
      count_mutant_dna: await this.getCountMutantDna(),
      count_human_dna: await this.getCountHumanDna(),
      ratio: await this.getRatio(),
    };
  }

  async getCountMutantDna() {
    if(this.countMutantDna === undefined)
      this.countMutantDna = await Dna.count({ isMutant: true });
    return this.countMutantDna;
  }

  async getCountHumanDna() {
    if(this.countHumanDna === undefined)
      this.countHumanDna = await Dna.count();
    return this.countHumanDna;
  }

  async getRatio() {
    const round = 4;
    if((await this.getCountHumanDna()) === 0)
      return 0;
    return NumbersHelper.round(
      (await this.getCountMutantDna()) / (await this.getCountHumanDna()), round
    );
  }
}


module.exports = StatsService;
