const fs       = require('fs'),
      readline = require('readline')
/*
const file_reader = (file_to_parse) => {
  return rl = readline.createInterface({
    input: fs.createReadStream(file_to_parse),
    terminal: false
  })
}
*/

const rl = readline.createInterface({
    input: fs.createReadStream('../testing-files/haulo_credentials_test.csv'),
    terminal: false
  })

rl.on('line', input => {
  console.log(input)
})
