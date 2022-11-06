const app = require('../../app');
const request = require('supertest');
const db = require('../db');
const Dna = require('../../models/dna');

describe('mutant', () => {
  afterEach(async() => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  describe('POST /create', () => {
    const launchRequest = async (expectedIsMutant, dna) => {
      const response = await request(app).post('/mutant').send({ dna: dna });
      expect(response.statusCode).toEqual(expectedIsMutant ? 200 : 403);
      expect(response.body).toHaveProperty('isMutant', expectedIsMutant);
    }

    describe('request has dna', () => {
      describe('dna is valid', () => {
        describe('human is mutant', () => {
          describe('human dna has mutant horizontal and vertical sequences', () => {
            it('should respond with a 200 status code', async () => {
              await launchRequest(true, [
                'CTGCGA',
                'CAGTGC',
                'TTATGT',
                'AGAAGG',
                'CCCCGA',
                'TCACTG'
              ]);
            });
          });

          describe('human dna has mutant horizontal and oblique sequences', () => {
            it('should respond with a 200 status code', async () => {
              await launchRequest(true, [
                'ATGCGA',
                'CAGTGC',
                'TTATGT',
                'AGAATG',
                'CCCCGA',
                'TCACTG'
              ]);
            });
          });

          describe('human dna has mutant vertical and oblique sequences', () => {
            it('should respond with a 200 status code', async () => {
              await launchRequest(true, [
                'ATGCGA',
                'CAGTGC',
                'TTATGT',
                'AGAAGG',
                'TCCCGA',
                'TCACTG'
              ]);
            });
          });

          describe('human dna has mutant horizontal, vertical and oblique sequences', () => {
            describe('dna registered', () => {
              it('should respond with a 200 status code', async () => {
                const dna = [
                  'ATGCGA',
                  'CAGTGC',
                  'TTATGT',
                  'AGAAGG',
                  'CCCCGA',
                  'TCACTG'
                ];
                await launchRequest(true, dna);
                expect(await Dna.findOne({ sequence: dna.join('|') })).not.toBe(null);
                await launchRequest(true, dna);
              });
            });

            describe('dna not registered', () => {
              it('should respond with a 200 status code', async () => {
                await launchRequest(true, [
                  'ATGCGA',
                  'CAGTGC',
                  'TTATGT',
                  'AGAAGG',
                  'CCCCGA',
                  'TCACTG'
                ]);
              });
            });
          });

          describe('human dna has multiple mutant horizontal sequences', () => {
            describe('human dna has 2 mutant horizontal sequences', () => {
              it('should respond with a 200 status code', async () => {
                await launchRequest(true, [
                  'ATGCGACG',
                  'CCCCCCCC',
                  'TTATGTGC',
                  'AGATCGAT',
                  'CTAACGAA',
                  'GTCATCGG',
                  'TGGATCAT',
                  'ACGCGGAC'
                ]);
              });

              it('should respond with a 200 status code', async () => {
                await launchRequest(true, [
                  'ATGCGACG',
                  'CACCCCTA',
                  'TTATGTGC',
                  'AGATCGAT',
                  'CTAACGAA',
                  'GTCATCGG',
                  'TGGATCAT',
                  'ACGGGGAC'
                ]);
              });

              describe('human dna has mutant vertical sequence', () => {
                it('should respond with a 200 status code', async () => {
                  await launchRequest(true, [
                    'ATGCGACG',
                    'CACCCCTA',
                    'TTATGTGC',
                    'AGATCGAT',
                    'CTATCGAA',
                    'GTCTTCGG',
                    'TGGATCAT',
                    'ACGGGGAC'
                  ]);
                });
              });

              describe('human dna has mutant oblique sequence', () => {
                it('should respond with a 200 status code', async () => {
                  await launchRequest(true, [
                    'ATGCGACG',
                    'CACCCCTA',
                    'TTATGTGC',
                    'AGAACGAT',
                    'CTAACGAA',
                    'GTCATCGG',
                    'TGGATCAT',
                    'ACGGGGAC'
                  ]);
                });
              });
            });

            describe('human dna has 3 mutant horizontal sequences', () => {
              it('should respond with a 200 status code', async () => {
                await launchRequest(true, [
                  'ATGCGACG',
                  'CACCCCTA',
                  'TTATGTGC',
                  'AGATCGAT',
                  'CTAACGAA',
                  'GTCATCGG',
                  'TGTTTTAT',
                  'ACGGGGAC'
                ]);
              });
            });
          });

          describe('human dna has multiple mutant vertical sequences', () => {
            describe('human dna has 2 mutant vertical sequences', () => {
              it('should respond with a 200 status code', async () => {
                await launchRequest(true, [
                  'ATGCGACG',
                  'CAGTCCTA',
                  'TTATGTGC',
                  'ATATCGAT',
                  'CTAACGAA',
                  'GTCATCGG',
                  'TGGATCAT',
                  'ACGATAAC'
                ]);
              });

              it('should respond with a 200 status code', async () => {
                await launchRequest(true, [
                  'ATGCGACG',
                  'CTGTCCTA',
                  'TTATGTGC',
                  'ATATCGAT',
                  'CTAACGAA',
                  'GTCATCGG',
                  'TTGCTCAT',
                  'ATGATAAC'
                ]);
              });

              describe('human dna has mutant horizontal sequence', () => {
                it('should respond with a 200 status code', async () => {
                  await launchRequest(true, [
                    'ATGCGACG',
                    'CAGTCCTA',
                    'TTATGGGG',
                    'ATATCGAT',
                    'CTAACGAA',
                    'GTCATCGG',
                    'TGGATCAT',
                    'ACGATAAC'
                  ]);
                });
              });

              describe('human dna has mutant oblique sequence', () => {
                it('should respond with a 200 status code', async () => {
                  await launchRequest(true, [
                    'ATGCGACG',
                    'CAGTCGTA',
                    'TTATGTGC',
                    'ATATCGAG',
                    'CTAACGAA',
                    'GTCATCGG',
                    'TGGATCAT',
                    'ACGATAAC'
                  ]);
                });
              });
            });

            describe('human dna has 3 mutant vertical sequences', () => {
              it('should respond with a 200 status code', async () => {
                await launchRequest(true, [
                  'ATGCGACG',
                  'CAGTCCTA',
                  'TTATGCGC',
                  'ATATCGCT',
                  'CTAACGAA',
                  'GTCATCGG',
                  'TGGATCAT',
                  'ACGATAAC'
                ]);
              });
            });
          });

          describe('human dna has multiple mutant oblique sequences', () => {
            describe('human dna has 2 mutant oblique sequences', () => {
              describe('human dna has a shared nitrogen based', () => {
                it('should respond with a 200 status code', async () => {
                  await launchRequest(true, [
                    'ATGCGACG',
                    'CAGTACTA',
                    'TTAAGTGC',
                    'AGAACGAT',
                    'CTAACGAA',
                    'GTCATCGG',
                    'TGGATCAT',
                    'ACGGTAAC'
                  ]);
                });

                it('should respond with a 200 status code', async () => {
                  await launchRequest(true, [
                    'ATGCGACG',
                    'CAGTGCTA',
                    'TTAAGTGC',
                    'AGAACGAT',
                    'CTAAAGAA',
                    'GTCATAGG',
                    'TGGATCAT',
                    'ACGGTAAA'
                  ]);
                });
              });

              describe("human dna hasn't shared nitrogen based", () => {
                it('should respond with a 200 status code', async () => {
                  await launchRequest(true, [
                    'ATGCGACG',
                    'CAGTCCTA',
                    'TTATGTGC',
                    'AGAACGAT',
                    'CTAAAGAA',
                    'GTCATAGG',
                    'TGGATCAT',
                    'ACGGTAAA'
                  ]);
                });
              });

              describe('human dna has 3 mutant oblique sequences', () => {
                describe('human dna has a shared nitrogen based', () => {
                  it('should respond with a 200 status code', async () => {
                    await launchRequest(true, [
                      'ATGAGACG',
                      'CAGTACTA',
                      'TTAAGAGC',
                      'AGAACGAT',
                      'CTAACGAA',
                      'GTCATCGG',
                      'TGGATCAT',
                      'ACGGTAAC'
                    ]);
                  });
                });

                describe("human dna hasn't shared nitrogen based", () => {
                  it('should respond with a 200 status code', async () => {
                    await launchRequest(true, [
                      'ATGCGACG',
                      'CAGTCCTA',
                      'TTATGTGC',
                      'AGAAGGAT',
                      'CTAAAGAA',
                      'GTCATAGG',
                      'TGGATCAG',
                      'ACGGTAAA'
                    ]);
                  });
                });
              });
            });
          });
        });

        describe('human is not mutant', () => {
          describe("human dna doesn't have any sequence", () => {
            it('should respond with a 403 status code', async () => {
              await launchRequest(false, [
                'CTGCGACTGCGACTGCGACTGCGA',
                'CAGTTCCAGTTCCAGTTCCAGTTC',
                'TTACGTGTATGCGTACGCGTATGC',
                'AGAATGAGACTGAGATTGACACTG',
                'GTGTGAGTGTGAGTGTGAGTGTGA',
                'TCGCTCTCGCTCTCGCTGTCGCTG',
                'GTGTGAGTGTGAGTGTGAGTGTGA',
                'TAACCTGTATCCGTACCTGCATAC',
                'CTGCGACTGCGACCGCGACTGCGA',
                'GTGTGAGAGTGAGTGTGAGTGTGA',
                'AGAATGCGAAGGAGAATGAGAATG',
                'CAGTTCCAGTTCCAGTTCCAGTTC',
                'TCACTGTCACTGTCGCTGTCGCTG',
                'CTGCGCCTGTGACTACGACTTCGA',
                'CAGTTCCAGTTCCAGTTCCAGTTC',
                'TTACGTGTATGCGTACGTGTATGC',
                'AGAATGAGAATGAGCCTGAGAATG',
                'GTGTGAGTGTGAGTGTGAGTGTGA',
                'TCGCTGTCGCTGTCGCTGTCGCTG',
                'GTGTAAGTGTCAGTGTCAGCGTGA',
                'TCACGTGTATGCGTACGTGTATGC',
                'CTGCGACCGCCACCGCGACTGCCA',
                'GTGTGAGTGTGAGTGTCAGTGTGA',
                'AGAATGAGAATGAGAATGAGAATG'
              ]);
            });
          });

          describe('human dna only has one horizontal mutant sequence', () => {
            it('should respond with a 403 status code', async () => {
              await launchRequest(false, [
                'ATGCGA',
                'CTGTGC',
                'TTATCT',
                'AGAAGG',
                'CCCCGA',
                'TCACTG'
              ]);
            });

            it('should respond with a 403 status code', async () => {
              await launchRequest(false, [
                'CTGCGACT',
                'CAGTTCCA',
                'TTACGTGT',
                'AGAATGAG',
                'GTGTGAGT',
                'TCGCTCTC',
                'GGGGGGGT',
                'TAACCTGT'
              ]);
            });
          });

          describe('human dna only has one vertical mutant sequence', () => {
            it('should respond with a 403 status code', async () => {
              await launchRequest(false, [
                'ATGCGA',
                'CAGTGC',
                'TTCTGT',
                'AGAAGG',
                'CCACGA',
                'TCACTG'
              ]);
            });

            it('should respond with a 403 status code', async () => {
              await launchRequest(false, [
                'CTGCGACT',
                'CAGTTCCA',
                'CTACGTGT',
                'CGAATGAG',
                'CTGTGAGT',
                'CCGCTCTC',
                'CTGTGAGT',
                'TAACCTGT'
              ]);
            });
          });

          describe('human dna only has one oblique mutant sequence', () => {
            it('should respond with a 403 status code', async () => {
              await launchRequest(false, [
                'ATGCGA',
                'CAGTCC',
                'TTATGT',
                'AGAAGG',
                'CACCGA',
                'TCACTG'
              ]);
            });

            it('should respond with a 403 status code', async () => {
              await launchRequest(false, [
                'CTGCGACT',
                'CCGTTCCA',
                'TTCCGTGT',
                'AGACTGAG',
                'GTGTCAGT',
                'TCGCTCTC',
                'GTGTGACT',
                'TAACCTGT'
              ]);
            });
          });

          describe('human dna is small', () => {
            it('should respond with a 403 status code', async () => {
              await launchRequest(false, ['CT', 'CA']);
            });
          });
        });
      });

      describe('dna is invalid', () => {
        describe('dna has invalid dimensions', () => {
          it('should respond with a 403 status code', async () => {
            await launchRequest(false, [
              'CTGCGA',
              'CAGTTC',
              'TTATGT',
              'CGTAGC',
              'AACTG',
              'GAGGTT'
            ]);
          });


          it('should respond with a 403 status code', async () => {
            await launchRequest(false, [
              'CTGCGA',
              'CAGTTC',
              'TTATGT'
            ]);
          });
        });

        describe('dna is empty', () => {
          it('should respond with a 403 status code', async () => {
            await launchRequest(false, []);
          });
        });

        describe('dna has invalid nitrogen base', () => {
          it('should respond with a 403 status code', async () => {
            await launchRequest(false, [
              'CTGCGA',
              'CAGTTC',
              'TTATGT',
              'AGAATG',
              'GTTTGA',
              'TCGCTX'
            ]);
          });
        });
      });
    });

    describe("request hasn't dna", () => {
      it('should respond with a 403 status code', async () => {
        const response = await request(app).post('/mutant').send({ invalid: 2 });
        expect(response.statusCode).toEqual(403);
        expect(response.body).toHaveProperty('isMutant', false);
      });
    });
  });
});
