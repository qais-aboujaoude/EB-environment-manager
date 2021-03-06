process.env.AWS_SDK_LOAD_CONFIG = true

const AWS              = require('aws-sdk'),
      elasticbeanstalk = new AWS.ElasticBeanstalk()

/**
 * @method formatOutput replaces everything between a '=' and till a ','
 * with an empty space
 * @param {string} string to format
 * @return {string} formatted string
 */
const formatOutput= s => s.replace(/=.*?,/g, '= ').replace(/(.*=).*/, '$1 ')

module.exports = {

  /**
   * @method updateEnvironmentVariables runs the sdk's function updateEnvironment
   * and updates the environment with the environment variables supplied by
   * the user in the main program
   * @param {object} params the paramaters object that contains
   * the name of the environment and the environmetn variables to update
   */
  updateEnvironmentVariables: params => {
    elasticbeanstalk.updateEnvironment(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else     console.log('Success: Environment is updating!\n', data)
    })
  },

  /**
   * @async
   * @method getEnvironmentVariables runs the sdk's function describeConfigurationSettings
   * filters the returned object  and string containing the the evnironment variables
   * @param {string} app name of the elastic beanstalk application
   * @param {string} env name of the environment to retreieve the variables from
   * @return {string} a string that contains the environment variables
   */
  getEnvironmentVariables: (app, env) => {
    return new Promise ((resolve, reject) => {
      elasticbeanstalk.describeConfigurationSettings({
        ApplicationName: app,
        EnvironmentName: env
      }, (err, data) => {
        if (err) {
          reject(err, err.stack)
        }
        else {
          const envArray = data.ConfigurationSettings[0].OptionSettings
            .filter(o => o.OptionName === 'EnvironmentVariables')
          typeof envArray[0].Value === 'undefined'
            ? reject(`Error: Environment doesn't contain any Environment Variables`)
            : resolve(formatOutput(envArray[0].Value))
        }
      })
    })
  }
  
}