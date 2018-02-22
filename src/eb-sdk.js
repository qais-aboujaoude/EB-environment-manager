const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const elasticbeanstalk = new AWS.ElasticBeanstalk()

module.exports = {

  /**
   * @method updateEnvironmentVariables runs the sdk's function updateEnvironment
   * and updates the environment with the environment variables supploed by
   * the user in the main program
   * @param {object} params the paramaters object that contains
   * the name of the environment and the environmetn variables to update
   */
  updateEnvironmentVariables: params => {
    elasticbeanstalk.updateEnvironment(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else     console.log(data)
    })
  },

  /**
   * @async
   * @method getEnvironmentVariables runs the sdk's fdescribeConfigurationSettings
   * the returned data is filtered and the function returns a
   * string containing the the evnironment variables
   * @param {object} params the paramaters object that contains EB App and Env name
   * @return {string} a string that contains the environment variables
   */
  getEnvironmentVariables: params => {
    return new Promise ((resolve, reject) => {
      elasticbeanstalk.describeConfigurationSettings(params, (err, data) => {
        if (err) {
          reject(err, err.stack)
        }
        else {
          const env_array = data.ConfigurationSettings[0].OptionSettings.filter(o => {
            return o.OptionName === 'EnvironmentVariables'
          })
          resolve(env_array[0].Value)
        }
      })
    })
  }
}


