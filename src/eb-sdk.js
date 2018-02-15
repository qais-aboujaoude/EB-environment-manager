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
  updateEnvironmentVariables: (params) => {
    elasticbeanstalk.updateEnvironment(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else     console.log(data)
    }) 
  }

}