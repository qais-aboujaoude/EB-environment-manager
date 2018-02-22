const csv  = require('./csv-parser'),
      sdk  = require('./eb-sdk'),
      exec = require('child_process').exec

sdk.getEnvironmentVariables('haulo-apiapp', 'haulo-apiapp-demo')
  .then(r => console.log(r))
  .catch(err => console.log(err))

/*
csv.pasre_csv_to_array('../testing-files/haulo_credentials_test.csv')
  .then(parsed_array => {
    env_to_string(parsed_array)
      .then(r => {
        console.log(r)
        exec(`eb setenv kousa=mehshe`, (err, stdout, stderr) => {
          err ? console.log(err, stderr) : console.log(stdout)
        })
      })
  })
  .catch(err => console.log(err))

const env_to_string = env_array => {
  let env_variables = ''
  return new Promise((resolve, reject) => {
    if (Array.isArray(env_array) && env_array.length
      && !env_array.includes(null)) {
      for (let [index, val] of env_array.entries()) {
        env_variables += `${val[0].toUpperCase()}= `
      }
      resolve(env_variables)
    } else {
      reject('error with array')
    }
  })
}
*/
