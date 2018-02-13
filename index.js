#!/usr/bin/env node
const fs             = require('fs'),
      program        = require('commander'),
      eb_sdk         = require('./src/eb-sdk.js'),
      parsed_config  = [];

/**
 * @method reads the json file
 * @param {file} object. the json object to be read
 * @return  {Promise.<{data: object}>} a json object
 **/
const read_file = (path, file) => {
  return new Promise((resolve, reject) =>{
    if(!path) {
      fs.readFile(`${file}`, (err, data) => {
        err ? reject(err) : resolve(JSON.parse(data));
      });
    } else {
      fs.readFile(`${path}${file}`, (err, data) => {
        err ? reject(err) : resolve(JSON.parse(data));
      });
    }
  });
}

/**
 * @method parses the config json file into an iterable array
 * @param {object} object. the json object to be parsed
 * @param {string} parent the prefix for the 'parent' object
 * @return nothing. Fills parsed_config with array of parsed config
 **/
const config_parser = (object, parent) => {
   for(let key in object) {
     if(typeof(object[key]) === 'string') {
      parsed_config.push([parent+"_"+key, object[key]]);
     } else if(!parent) {
      config_parser(object[key],parent+""+key);
     } else {
      config_parser(object[key],parent+"_"+key);
     };
   };
 };

/**
 * @method parses the config and turns it into a string of environment variables
 * @param {array} env_array. the array of variables to be turned into a string
 * @return  {Promise.<{env_variables: string}>} a string of enviornment variables
 **/
const fill_env_variables = (env_array) => {
  let env_variables = ''
  return new Promise((resolve, reject) => {
    if (Array.isArray(env_array) && env_array.length
        && !env_array.includes(null)) {
      for(let [index, val] of env_array.entries()) {
        env_variables += `${val[0].toUpperCase()}=${val[1]} `;
      }
      resolve(env_variables)
    } else {
      reject('error with array')
    }
  });
}

const fill_eb_option_settings = (env_array) => {
  return env_array.map(e => {
    return {
      Namespace: "aws:elasticbeanstalk:application:environment",
      OptionName: e[0].toUpperCase(),
      Value: e[1]
    }
  })
}

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .arguments('<file>')
  .option('-p, --path [path]', 'path of the json file')
  .option('-n, --name [name]', 'name of the eb environment to update')
  .option('-l, --local', 'populates the local enviornment')
  .option('-c, --cloud', 'populates the elastic beanstalk enviornment')
  .action((file) => {
    read_file(program.path, file)
      .then(config_object => {
        config_parser(config_object, '');
        if(program.local) {
          fill_env_variables(parsed_config)
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

