const eb_sdk  = require('./eb-sdk'),
      exec    = require('child_process').exec

module.exports = {  
  flushEnvironmentVariables: (app_name, env_name) => {
    eb_sdk.getEnvironmentVariables(app_name, env_name)
    .then(r => {
      exec(`eb setenv kousa=mehshe`, (err, stdout, stderr) => {
        err ? console.log(err, stderr) : console.log(stdout)
      })
    })
    .catch(err => console.log(err))
  }
}




