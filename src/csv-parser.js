const fs       = require('fs'),
      readline = require('readline')

const file_reader = (file_to_parse) => {
  return rl = readline.createInterface({
    input: fs.createReadStream(file_to_parse),
    terminal: false
  })
}

const pasre_csv_to_array = (file_to_parse) => {
  const csv = []
  file_reader(file_to_parse)
  return new Promise((resolve, reject) => {
    rl.on('line', input => {
      csv.push(input.split(','))
    })
    rl.on('close', () => {
      csv.length ? resolve(csv) : reject('Error: empty array')
    })
  })
}


pasre_csv_to_array('../testing-files/haulo_credentials_test.csv')
  .then(r => console.log(r))
  .catch(err => console.log(err))
