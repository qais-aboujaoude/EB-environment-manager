const fs = require('fs'),
  readline = require('readline')

const csv_parser = module.exports = {

  file_reader: (file_to_parse) => {
    return rl = readline.createInterface({
      input: fs.createReadStream(file_to_parse),
      terminal: false
    })
  },

  pasre_csv_to_array: file_to_parse => {
    const parsed_array = []
    csv_parser.file_reader(file_to_parse)
    return new Promise((resolve, reject) => {
      rl.on('line', input => {
        parsed_array.push(input.split(','))
      })
      rl.on('close', () => {
        parsed_array.length ? resolve(parsed_array) : reject('Error: empty array')
      })
    })
  }
}