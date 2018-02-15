#!/usr/bin/env node
const program        = require('commander'),
      m          = require('./src/main.js'),
      fs = require('fs'),
      eb_sdk         = require('./src/eb-sdk.js')

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .arguments('<file>')
  .option('-p, --path [path]', 'path of the json file')
  .option('-n, --name [name]', 'name of the eb environment to update')
  .option('-l, --local', 'populates the local enviornment')
  .option('-c, --cloud', 'populates the elastic beanstalk enviornment')
  .action((file) => {
    m.read_file(program.path, file)
      .then(config_object => {
        m.config_parser(config_object, '');
        if(program.local) {
          m.fill_env_variables(m.parsed_config)
            .then(env_variables => {
              fs.writeFile('.env', env_variables, (err) => {
                if (err) throw err;
                console.log('Done! enviornment variables saved in .env');
              });  
            })
            .catch(err => console.log(err));
        }
        else if(program.cloud) {
          const params = {
            EnvironmentName: program.name,
            OptionSettings: fill_eb_option_settings(parsed_config)
          }
          eb_sdk.updateEnvironmentVariables(params)
         }
    })
    .catch(err => console.log(err));
  })
  .parse(process.argv);

