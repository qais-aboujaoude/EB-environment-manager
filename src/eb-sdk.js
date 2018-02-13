const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const elasticbeanstalk = new AWS.ElasticBeanstalk()

const app_params = {
  ApplicationName: "haulo-apiapp-demo"
}

const env_params = {
  EnvironmentName: "haulo-apiapp"
}
/*
elasticbeanstalk.describeApplicationVersions(app_params, (err, data) => {
  if (err) console.log(err, err.stack)
  else     console.log(data)
})

elasticbeanstalk.describeEnvironmentResources(env_params, (err, data) => {
   if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);
})
*/

const params = {
  EnvironmentName: "haulo-apiapp-demo",
  OptionSettings: [
    {
      Namespace: "aws:elasticbeanstalk:application:environment",
      OptionName: 'Allah',
      Value: 'Owuet'
    }
  ]
}

elasticbeanstalk.updateEnvironment(params, (err, data) => {
   if (err) console.log(err, err.stack)
   else     console.log(data)
})

