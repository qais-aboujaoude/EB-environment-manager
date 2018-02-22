const eb_sdk  = require('./eb-sdk'),
      exec    = require('child_process').exec

module.exports = {  

  /**
   * @method flushEnvironmentVariables flushes the environment variables 
   * of the supplied environment. 
   * It executes a shell command eb setenv 
   * on the returned string from @method getEnvironmentVariables
   * @param {string} app_name name of the elastic beanstalk application
   * @param {string} env_name name of the environment to flush
   */
  flushEnvironmentVariables: (app_name, env_name) => {
    eb_sdk.getEnvironmentVariables(app_name, env_name)
    .then(r => {
      exec(`eb setenv ${r}`, (err, stdout, stderr) => {
        err ? console.log(err, stderr) : console.log(stdout)
      })
    })
    .catch(err => console.log(err))
  }
}




