const fs = require('fs')

const main = module.exports = {

  /**
   * @member {array} parsedConfig the array that gets filled
   * with the parsed configurtion from the configParser function
   */
  parsedConfig: [],

  /**
   * @method fileType returns the extension/type of the file
   * @param {string} file file to check the type of
   * @return {string} example: .csv .json 
   */
  fileType: file => file.split('.').pop(),

  /**
   * @async
   * @method readFile loads the json file
   * @param {string} path the json object to be read
   * @param {string} file the path to be read
   * @return {Promise<{object}>} a json object
   **/
  // TODO rethink your life
  readFile: (path, file) => {
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
   * @method configParser parses the json file into an iterable array
   * calls itself to access inner elements in the json object
   * @param {object} object the json object to be parsed
   * @param {string} parent the prefix for the 'parent' object
   **/
  configParser: (object, parent) => {
    for (let key in object) {
      if (typeof (object[key]) === 'string') {
        main.parsedConfig.push([parent + "_" + key, object[key]])
      } else if (!parent) {
        main.configParser(object[key], parent + "" + key)
      } else {
        main.configParser(object[key], parent + "_" + key)
      }
    }
  },

  /**
   * @method envToObject takes an array of config and turns it into 
   * a string of environment variables
   * @param {array} envArray. the array of variables to be turned into a string
   * @return {} a string of enviornment variables
   **/
  envToObject: envArray => envArray.map(e => 
    ({
      Namespace: "aws:elasticbeanstalk:application:environment",
      OptionName: e[0].toUpperCase(),
      Value: e[1]
    })
  ),

  /**
   * @method createDotenvFile takes an array, creates a write stream
   * in the iteration it turns the first sub-element into an upercase 
   * it creates a .env file that has key=value separated by new lines
   * @param {array} envArray the array to write into a file
   */
  createDotenvFile: envArray => {
    const file = fs.createWriteStream('.env');
    file.on('error', err => { throw new Error(err) })
    for (let [index, val] of envArray.entries()) {
      file.write(`${val[0].toUpperCase()}=${val[1]} \n`)
    }
    file.end()
    console.log(`Done!\nenviornment variables saved in .env`)
  }
  
}
