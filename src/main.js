#!/usr/bin/env node
const fs = require('fs')

const main = module.exports = {

  /**
   * @member {array} parsed_config the array that gets filled
   * with the parsed configurtion from the config_parser function
   */
  parsed_config: [],

  /**
   * @method file_type returns the extension/type of the file
   * @param {string} file file to check the type of
   * @return {string} 
   */
  file_type: file => file.split('.').pop(),

  /**
   * @async
   * @method read_file loads the json file
   * @param {string} path the json object to be read
   * @param {string} file the path to be read
   * @return {Promise<{object}>} a json object
   **/
  // TODO rethink your life
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
   * @method config_parser parses the config json file into an iterable array
   * @param {object} object the json object to be parsed
   * @param {string} parent the prefix for the 'parent' object
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
   * @async
   * @method env_to_string takes an array and transforms it to a string of environment variables
   * @param {array} env_array the array of variables to be transformed into a string
   * @return {Promise<{string}>} a string of enviornment variables
   **/
  env_to_string: env_array => {
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

  /**
   * @method env_to_object the config and turns it into a string of environment variables
   * @param {array} env_array. the array of variables to be turned into a string
   * @return {} a string of enviornment variables
   **/
  env_to_object: env_array => {
    return env_array.map(e => {
      return {
        Namespace: "aws:elasticbeanstalk:application:environment",
        OptionName: e[0].toUpperCase(),
        Value: e[1]
      }
    })
  },

  /**
   * @method write_local_file creates a file named .env 
   * @param {string} env_variable the string of environment variables to be written into the file
   * this string should be the return value of fil_env_variables
   */
  write_local_file: env_variables => {
    fs.writeFile('.env', env_variables, (err) => {
      if (err) throw err
      console.log('Done! enviornment variables saved in .env')
    })
  },

  /**
   * @method create_dotenv_file takes an array and creates a .env
   * file that has key:value separated by new lines
   * @param {array} env_array the array to write into a file
   */
  create_dotenv_file: env_array => {
    const file = fs.createWriteStream('.env');
    file.on('error', err => { throw new Error(`Error: ${err}`) })
    for (let [index, val] of env_array.entries()) {
      file.write(`${val[0].toUpperCase()}=${val[1]} \n`)
    }
    file.end()
  }
  
}
