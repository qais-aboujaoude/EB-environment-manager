#!/usr/bin/env node
const fs = require('fs')

const main = module.exports = {
  
  parsed_config: [],
  /**
   * @method reads the json file
   * @param {file} object. the json object to be read
   * @return  {Promise.<{data: object}>} a json object
   **/
  read_file: (path, file) => {
    return new Promise((resolve, reject) => {
      if (!path) {
        fs.readFile(`${file}`, (err, data) => {
          err ? reject(err) : resolve(JSON.parse(data))
        })
      } else {
        fs.readFile(`${path}${file}`, (err, data) => {
          err ? reject(err) : resolve(JSON.parse(data))
        })
      }
    })
  },

  /**
   * @method parses the config json file into an iterable array
   * @param {object} object. the json object to be parsed
   * @param {string} parent the prefix for the 'parent' object
   * @return nothing. Fills parsed_config with array of parsed config
   **/
  config_parser: (object, parent) => {
    for (let key in object) {
      if (typeof (object[key]) === 'string') {
        main.parsed_config.push([parent + "_" + key, object[key]])
      } else if (!parent) {
        main.config_parser(object[key], parent + "" + key)
      } else {
        main.config_parser(object[key], parent + "_" + key)
      }
    }
  },

  /**
   * @method parses the config and turns it into a string of environment variables
   * @param {array} env_array. the array of variables to be turned into a string
   * @return  {Promise.<{env_variables: string}>} a string of enviornment variables
   **/
  fill_env_variables: (env_array) => {
    let env_variables = ''
    return new Promise((resolve, reject) => {
      if (Array.isArray(env_array) && env_array.length
        && !env_array.includes(null)) {
        for (let [index, val] of env_array.entries()) {
          env_variables += `${val[0].toUpperCase()}=${val[1]} `
        }
        resolve(env_variables)
      } else {
        reject('error with array')
      }
    })
  },

  fill_eb_option_settings: (env_array) => {
    return env_array.map(e => {
      return {
        Namespace: "aws:elasticbeanstalk:application:environment",
        OptionName: e[0].toUpperCase(),
        Value: e[1]
      }
    })
  }

}