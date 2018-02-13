const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const elasticbeanstalk = new AWS.ElasticBeanstalk()

module.exports = {
  updateEnvironmentVariables: (params) => {
    elasticbeanstalk.updateEnvironment(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else     console.log(data)
    }) 
  }
}