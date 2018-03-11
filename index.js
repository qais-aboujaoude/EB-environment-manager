#!/usr/bin/env node
const program = require('commander'),
      eb_sdk  = require('./src/eb-sdk'),
      flush   = require('./src/flush-env')
      csv     = require('./src/csv-parser'),
      m       = require('./src/main.js') // short for main

const local_or_cloud = parsed_array => {
  if(program.local) {
    m.create_dotenv_file(parsed_array)
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
  .command('delete')
  .action(() => {
    flush.flushEnvironmentVariables(program.app, program.name)
  })

program
  .version('1.0.2')
  .description('A tool to manage the enviornment variables of an Elastic Beanstalk App')
  .usage('[options] <file ...>')
  .arguments('<file>')
  .option('-p, --path [path]', 'path of the json file to parse')
  .option('-n, --name [name]', 'name of the Elastic Beanstalk environment to update')
  .option('-a, --app [app]', 'name of the Elastic Beanstalk app')
  .option('-l, --local', 'populates the local enviornment')
  .option('-c, --cloud', 'populates the elastic beanstalk enviornment')
  .action(file => {
    if (m.file_type(file) === 'json') {
      m.read_file(program.path, file)
        .then(config_object => {
          m.config_parser(config_object, '')
          local_or_cloud(m.parsed_config)
        })
        .catch(err => console.log(err))
    } else if (m.file_type(file) === 'csv') {
      csv.pasre_csv_to_array(file)
        .then(parsed_array => {
          local_or_cloud(parsed_array)
        })
        .catch(err => console.log(err))
    } else {
      throw new Error('Error: File type not supported')
    }
  })
  
program.parse(process.argv)
