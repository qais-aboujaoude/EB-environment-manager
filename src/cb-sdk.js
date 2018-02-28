process.env.AWS_SDK_LOAD_CONFIG = true

const AWS       = require('aws-sdk'),
      codebuild = new AWS.CodeBuild()

const params = {
  name: 'custom-build-test',
  artifacts: {
    type: 'CODEPIPELINE',

  },
  cache: {
    type: 'NO_CACHE'
  },
  environment: {
    computeType: 'BUILD_GENERAL1_SMALL',
    image: 'sqwirllab/codebuild-node-amazonlinux',
    type: 'LINUX_CONTAINER',
    environmentVariables: [
      {
        name: 'rattel',
        value: 'sattel',
        type: 'PLAINTEXT'
      },
    ],
  },
  source: {
    type: 'CODEPIPELINE',
  }
}
module.exports = {

  updateCodebuildProject: params => {
    codebuild.updateProject(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else     console.log(data)
    })
  }

}

codebuild.updateProject(params, (err, data) => {
  if (err) console.log(err, err.stack)
  else     console.log(data)
})


