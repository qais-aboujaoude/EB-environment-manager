const fs = require('fs'),
      readline = require('readline')

  /**
   * @method file_reader opens an interface to reads and parse csv file  
   * @param file_to_parse the csv file to read
   * @return {object} a readline object 
   */
const file_reader = file_to_parse => {
    return rl = readline.createInterface({
      input: fs.createReadStream(file_to_parse),
      terminal: false
    })
  }

const csv_parser = module.exports = {

  /**
   * @async
   * @method pasre_csv_to_array reada csv file line by line. splits the line at 
   * a comma and pushes it into an array
   * @param file_to_parse the csv file to read and parse
   * @return {array} parsed_array, an array contains the parsed csv file
   */
  pasre_csv_to_array: file_to_parse => {
    const parsed_array = []
    file_reader(file_to_parse)
    return new Promise((resolve, reject) => {
      rl.on('line', input => {
        let index = input.indexOf(',')
        parsed_array.push([input.slice(0, index), input.slice(index + 1)])
      })
      rl.on('close', () => {
        parsed_array.length 
          ? resolve(parsed_array) 
          : reject('Error: empty array')
      })
    })
  }
}