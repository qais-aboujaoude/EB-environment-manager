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
   * @method getEnvironmentVariables runs the sdk's function describeConfigurationSettings
   * filters the returned object  and string containing the the evnironment variables
   * @param {string} app_name name of the elastic beanstalk application
   * @param {string} env_name name of the environment to retreieve the variables from
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
          const env_array = data.ConfigurationSettings[0].OptionSettings.filter(o => {
            return o.OptionName === 'EnvironmentVariables'
          })
          resolve(env_array[0].Value)
        }
      })
    })
  }
}


