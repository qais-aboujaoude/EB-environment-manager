const fs = require('fs'),
      readline = require('readline')

const csv_parser = module.exports = {

  /**
   * @method file_reader
   */
  file_reader: file_to_parse => {
    return rl = readline.createInterface({
      input: fs.createReadStream(file_to_parse),
      terminal: false
    })
  },

  /**
   * @method pasre_csv_to_array
   */
  pasre_csv_to_array: file_to_parse => {
    const parsed_array = []
    csv_parser.file_reader(file_to_parse)
    return new Promise((resolve, reject) => {
      rl.on('line', input => {
        let index = input.indexOf(',')
        parsed_array.push([input.slice(0, index), input.slice(index+1)])
      })
      rl.on('close', () => {
        parsed_array.length 
          ? resolve(parsed_array) 
          : reject('Error: empty array')
      })
    })
  }
}