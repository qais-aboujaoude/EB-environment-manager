#!/usr/bin/env node
const program = require('commander'),
      eb  = require('./src/eb-sdk'),
      flush   = require('./src/flush-env')
      csv     = require('./src/csv-parser'),
      m       = require('./src/main.js') // short for main

const localOrCloud = parsedArray => {
  if(program.local) {
    m.createDotenvFile(parsedArray)
  }
  else if(program.cloud) {
    const params = {
      EnvironmentName: program.name,
      OptionSettings: m.envToObject(parsedArray)
    }
    eb.updateEnvironmentVariables(params)
   }
}

program
  .command('delete')
  .action(() => {
    flush.flushEnvironmentVariables(program.app, program.name)
  })

program
  .version('1.2.0')
  .description('A tool to manage the environment variables of an Elastic Beanstalk App')
  .usage('[options] <file ...>')
  .arguments('<file>')
  .option('-p, --path [path]', 'path of the json file to parse')
  .option('-n, --name [name]', 'name of the Elastic Beanstalk environment to update')
  .option('-a, --app [app]', 'name of the Elastic Beanstalk app')
  .option('-l, --local', 'populates the local environment')
  .option('-c, --cloud', 'populates the elastic beanstalk environment')
  .action(file => {
    if (m.fileType(file) === 'json') {
      m.readFile(program.path, file)
        .then(configObject => {
          m.configParser(configObject, '')
          localOrCloud(m.parsedConfig)
        })
        .catch(err => console.log(err))
    } else if (m.fileType(file) === 'csv') {
      csv.parseCSVToArray(file)
        .then(parsedArray => {
          localOrCloud(parsedArray)
        })
        .catch(err => console.log(err))
    } else {
      throw new Error('Error: File type not supported')
    }
  })
  
program.parse(process.argv)
