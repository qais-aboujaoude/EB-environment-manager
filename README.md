# EB-environment-manager

A command line tool that parses a json or a csv file that contains environment variables and updates Elastic Beanstalk Environment with Environment Variables. It can also generated a local file .env that contains the environment variables
It handles json and csv files only 

### Installing

Install package from npm. Install it globally

```
npm install -g eb-environment-manager 
```
### Usage

To run the package: 
~~~
eb-manager
~~~

Options:
    -V, --version      output the version number
    -p, --path [path]  path of the json file to parse
    -n, --name [name]  name of the eb environment to update
    -l, --local        populates the local enviornment
    -c, --cloud        populates the elastic beanstalk enviornment
    -h, --help         output usage information

For help: 
~~~
env-cli -h 
~~~


## Built With

* [Commander](https://github.com/tj/commander.js/) - Tooling to create CLI tools with node.js
* [aws-sdk](https://aws.amazon.com/sdk-for-node-js/) - SDK for managing AWS resources

## Authors

* **Qais Aboujaoude** 
* **Connor Makhlouta** 

## License

This project is licensed under the Mozilla Public License MPL  License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Hassan Assi for all the love and support
