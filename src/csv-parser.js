const fs       = require('fs'),
      readline = require('readline')

  /**
   * @method fileReader opens an interface to reads and parse csv file
   * @param fileToParse the csv file to read
   * @return {object} a readline object
   */
const fileReader = fileToParse => readline
  .createInterface({
    input: fs.createReadStream(fileToParse),
    terminal: false
  })

const csvParser = module.exports = {

  /**
   * @async
   * @method parseCSVToArray reads a csv file line by line. splits the line at
   * a comma and pushes it into an array
   * @param fileToParse the csv file to read and parse
   * @return {array} parsedArray, an array contains the parsed csv file
   */
  parseCSVToArray: fileToParse => {
    const parsedArray = []
    return new Promise((resolve, reject) => {
      fileReader(fileToParse)
        .on('line', input => {
          let index = input.indexOf(',')
          parsedArray.push([input.slice(0, index), input.slice(index + 1)])
        })
        .on('close', () => {
          parsedArray.length
            ? resolve(parsedArray)
            : reject(Error('Array is empty'))
        })
    })
  }
  
}

