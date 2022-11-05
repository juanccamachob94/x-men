<h1 align="center">Mutants identification</h1>
<p align="center">
  <img width="460" height="300" src="https://user-images.githubusercontent.com/42450812/200134790-bd17f64f-be62-4712-9702-1e162918f979.png">
</p>

https://user-images.githubusercontent.com/42450812/200134656-a017b9ea-42ef-4609-95fb-e7193d9bec14.mp4


### How to use
You can test the functionality by consuming the service:
- [mutants](https://x-men-ml.herokuapp.com/mutant) (POST)
- [stats](https://x-men-ml.herokuapp.com/stats) (GET)
#### Requirements
- `Node ~16.17.0`
#### Get started
- clone the repository
```
git clone git@github.com:juanccamachob94/x-men.git
```
- Enter the project
```
cd x-men
```
- Install dependencies
```
npm install
```
- Start the service
```
npm start
```
- To testing (creates/updates the `coverage` directory in the project)
```
npm test
```

### What dna belongs to a mutant?
All human dna has an NxN matrix structure such that each element of the matrix has one of the four nitrogenous bases G, T, A or C as its value. A human is a mutant if his dna has more than one sequence followed by 4 nitrogenous bases from the same value in horizontal, vertical or oblique position within the respective matrix.

### Examples
Below are 4 examples of mutant dna in different cases.

#### 1. Horizontal and vertical sequences
|C|T|G|C|`G`|A|
| :---: | :---: | :---: | :---: | :---: | :---: |
|C|A|G|T|`G`|C|
|T|T|A|T|`G`|T|
|A|G|A|A|`G`|G|
|`C`|`C`|`C`|`C`|T|A|
|T|C|A|C|T|G|

#### 2. Horizontal and oblique sequences
|`A`|T|G|C|G|A|
| :---: | :---: | :---: | :---: | :---: | :---: |
|C|`A`|G|T|G|C|
|T|T|`A`|T|G|T|
|A|G|A|`A`|T|G|
|`C`|`C`|`C`|`C`|G|A|
|T|C|A|C|T|G|

#### 3. Vertical and oblique sequences
|`A`|T|G|C|`G`|A|
| :---: | :---: | :---: | :---: | :---: | :---: |
|C|`A`|G|T|`G`|C|
|T|T|`A`|T|`G`|T|
|A|G|A|`A`|`G`|G|
|T|C|C|C|G|T|
|T|C|A|C|T|G|

#### 4. Horizontal sequences
|A|T|G|C|G|A|C|G|
| :---: | :---: | :---: | :---: | :---: | :---: |:---: | :---: |
|C|A|`C`|`C`|`C`|`C`|T|A|
|T|T|A|T|G|T|G|C|
|A|G|A|T|C|G|A|T|
|C|T|A|A|C|G|A|A|
|G|T|C|A|T|C|G|G|
|T|G|G|A|T|C|A|T|
|A|C|`G`|`G`|`G`|`G`|A|C|

### Technical details
The solution basically consisted of creating a service called `MutantIdentifier` that receives the dna as a string array and indicates with a boolean value if said `dna` received as a parameter belongs to a mutant human or not.
To identify mutant sequences, the `dna` data is first validated. First, it is verified that the dna is an array to later validate its content, which means validating that it is not empty, that its size is `NxN` and as each row of the array is valid, it is verified that it contains the valid nitrogenous base characters. Once the dna has been validated, the second consists of executing the algorithm.

The sequence identification algorithm basically has the three cases executed in order of complexity (horizontal, vertical and oblique), all supported by the identification of the number of sequences of size `4` of the same character within a string through the ` function performSequence` inside the `MutantLineSequenceCounter` class.

#### Horizontal
To identify the horizontal sequences, a simple traversal of the array is made such that for each element of the array, that is, each row of the matrix, the `performSequence` function mentioned above is executed.

![Screenshot_432](https://user-images.githubusercontent.com/42450812/200132680-8b3ed560-6824-42fb-8a4a-d9a03c080631.png)

#### Vertical
To identify the vertical sequences, the trasposed function of the StrMatrixHelper helper is used, which returns the transposed matrix of the matrix sent as a parameter, in this case the dna. With the transposed dna matrix, the vertical sequences are now in a horizontal position, allowing the algorithm mentioned in the previous paragraph to be executed.

![Screenshot_434](https://user-images.githubusercontent.com/42450812/200132673-5881c092-d5bd-4e18-bdce-073f45c6675b.png)

#### Oblique
Finally, to identify the oblique sequences, the oblique sequences are read from the upper left part of the matrix to the lower right part such that the number of characters exceeds the minimum value 4. As this data is read, it is validated in concatenations of 4 characters the presence of sequences of the same value until finding 2 or more. This process is repeated with the same transposed matrix generated in the previous step.

![Screenshot_435](https://user-images.githubusercontent.com/42450812/200132663-a15684e3-161c-4892-8976-fc8e67061b46.png)
![Screenshot_436](https://user-images.githubusercontent.com/42450812/200132664-f4cb8c48-cbc1-42a1-ace1-51a6266d9007.png)


Returning to the `MutantLineSequenceCounter` class, the protagonist of all the algorithms, it basically counts the number of matches between the string of each row in each generated array of the `3` cases, and an automatically generated regex from the allowed nitrogenous bases.


### API REST

To build the API, the express package was used with its code generator. Later we created the `routers/mutant` that sends the post request to the create function of `controllers/mutant`. The controller was programmed in such a way that it calls the MutantIdentifier service so that, based on the response, the status of the response is modified or not and finally it is answered.

Added files and configuration for `routes/stats` and `controllers/stats`. In this second file, it is executed on the `index` function, the `StatsService` service that queries the database through the `Dna` class and the `count()` function, memorizing the results for the `ratio` attribute. which is part of the answer. This service supports the `helpers/numbers_helper.js` helper to round the result of the `ratio` attribute.

### Database
MongoDB is chosen as the database engine as a result of an investigation whose conclusions are summarized [here](https://www.plesk.com/blog/various/mongodb-vs-postgresql/). The mongoose package configured through the `config/database.js` and `config/mongodb` files is integrated in support of the `dotenv` package for assigning credentials for connecting to the database.

Since this database engine requires no migrations, only the corresponding mongoose DnaSchema schema is created in `models/dna.js` in which the `sequence` and `isMutant` database attributes are assigned. The database sequence attribute records the dna in join with the `|` character. To automate and improve the interaction of the use of `sequence` and `dna` where the former is the latter produced as a string, the virtual attribute `dna` was created within the schema, facilitating and centralizing the use of these.

With the need for registration in DB, the `DnaClassifier` service is added, which slightly modifies the logic officially defined in the API. Now the controller consumes this service which initially instantiates the `Dna` model, proceeds to validate the dna. If the dna is invalid, directly set the `isMutant` attribute to false and respond. On the contrary, if the dna is valid, it is searched in the database and it is assigned if it has been found; if it was not found, the `MutantIdentifier` service is executed and later it makes the registration to the database.


### Tests
The `supertest` and `jest` packages were integrated since they are the most used and their structure is easy to understand. Tests were made on the REST service (controllers) with all the cases that trigger the execution of multiple scenarios within services, helpers, models, etc.

Additionally, the response for case 404 was added.

![Screenshot_431](https://user-images.githubusercontent.com/42450812/200134039-5984eb94-5457-42e4-98b5-3e2bf5f42777.png)


