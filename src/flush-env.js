const csv  = require('./csv-parser'),
      exec = require('child_process').exec

csv.pasre_csv_to_array(file)
  .then(parsed_array => {
    exec(`eb setenv ${parsed_array[0]}`, (err, stdout, stderr) => {
      err ? console.log(err, stderr) : console.log(stdout)
    })
  })
  .catch(err => console.log(err))