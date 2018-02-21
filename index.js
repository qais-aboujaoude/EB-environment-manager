#!/usr/bin/env node
const program = require('commander'),
      eb_sdk  = require('./src/eb-sdk.js'),
      csv     = require('./src/csv-parser'),
      m       = require('./src/main.js') // short for main

const local_or_cloud = parsed_array => {
  if(program.local) {
    m.env_to_string(parsed_array)
      .then(env_variables => {
        m.write_local_file(env_variables)
      })
      .catch(err => console.log(err));
  }
  else if(program.cloud) {
    const params = {
      EnvironmentName: program.name,
      OptionSettings: m.env_to_object(parsed_array)
    }
    eb_sdk.updateEnvironmentVariables(params)
   }
}

program
  .version('1.0.2')
  .usage('[options] <file ...>')
  .arguments('<file>')
  .option('-p, --path [path]', 'path of the json file to parse')
  .option('-n, --name [name]', 'name of the Elastic Beanstalk environment to update')
  .option('-l, --local', 'populates the local enviornment')
  .option('-c, --cloud', 'populates the elastic beanstalk enviornment')
  .action(file => {
    if (m.file_type(file) === 'json') {
      m.read_file(program.path, file)
        .then(config_object => {
          m.config_parser(config_object, '');
          local_or_cloud(m.parsed_config)
        })
        .catch(err => console.log(err));
    } else if (m.file_type(file) === 'csv') {
      csv.pasre_csv_to_array(file)
        .then(parsed_array => {
          local_or_cloud(parsed_array)
        })
        .catch(err => console.log(err))
    } else {
      throw new Error('Error: File type not supported');
    }
  })
  .parse(process.argv)
