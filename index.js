#!/usr/bin/env node
const program = require('commander'),
      eb_sdk  = require('./src/eb-sdk.js'),
      m       = require('./src/main.js')

program
  .version('0.0.2')
  .usage('[options] <file ...>')
  .arguments('<file>')
  .option('-p, --path [path]', 'path of the json file to parse')
  .option('-n, --name [name]', 'name of the eb environment to update')
  .option('-l, --local', 'populates the local enviornment')
  .option('-c, --cloud', 'populates the elastic beanstalk enviornment')
  .action((file) => {
    m.read_file(program.path, file)
      .then(config_object => {
        m.config_parser(config_object, '');
        if(program.local) {
          m.env_to_string(m.parsed_config)
            .then(env_variables => {
              m.write_local_file(env_variables)
            })
            .catch(err => console.log(err));
        }
        else if(program.cloud) {
          const params = {
            EnvironmentName: program.name,
            OptionSettings: m.env_to_object(parsed_config)
          }
          eb_sdk.updateEnvironmentVariables(params)
         }
    })
    .catch(err => console.log(err));
  })
  .parse(process.argv)
