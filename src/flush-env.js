const eb_sdk  = require('./eb-sdk'),
      exec    = require('child_process').exec

module.exports = {  

  /**
   * @method flushEnvironmentVariables flushes the environment variables 
   * of the supplied environment. 
   * It executes a shell command eb setenv 
   * on the returned string from @method getEnvironmentVariables
   * @param {string} app name of the elastic beanstalk application
   * @param {string} name name of the environment to flush
   */
  flushEnvironmentVariables: (app, name) => {
    eb_sdk.getEnvironmentVariables(app, name)
    .then(r => {
      exec(`eb setenv ${r}`, (err, stdout, stderr) => {
        err ? console.log(err, stderr) : console.log(stdout)
      })
    })
    .catch(err => console.log(err))
  }
  
}




