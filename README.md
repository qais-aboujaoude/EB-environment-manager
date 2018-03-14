# EB-environment-manager

A command line tool that parses a json or a csv file that contains environment variables and updates a selected Elastic Beanstalk Environment with environment variables from the csv/json file. 

It can also generate a **.env** file that can be used with other packages like [dotenv](https://www.npmjs.com/package/dotenv) 

It can handle flushing/deleting all environment variables in an environment but you must have [EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html) installed locally on your machine and you must call this program in a directory that has been [initialized](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-init.html) with eb-cli

It handles json and csv files only. 

### Installing

install globally via npm:

```
npm i -g eb-environment-manager 

```

### Usage

This program will assume the AWS region to be defined as a global variable.  

If the region is not defined as a global variable, then it will retrieve the region from the ~/.aws/credentials  or the ~/.aws/config. 

You can read more about how the aws-sdk handles the region [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html#setting-region-order-of-precedence)

Easiest way to switch/modify the region would be to set the AWS_REGION global variable

~~~
export AWS_REGION=<your region>
// example:
export AWS_REGION=us-west-2
~~~

To run the package: 

~~~
eb-manager
~~~

Available options: 

~~~
Options:
    -V, --version      output the version number
    -p, --path [path]  path of the json file to parse
    -n, --name [name]  name of the eb environment to update
    -a, --app [app]    name of the Elastic Beanstalk app
    -l, --local        populates the local enviornment
    -c, --cloud        populates the elastic beanstalk environment
    -h, --help         output usage information
  
  Commands:

    delete

~~~

Examples: 


~~~
eb-manager [options] <file ...>

to delete all environment variables in an elastic beanstalk environment: 
$ eb-manager delete -a <EB App name> -n <EB Environment name>
    
to populate an environment with environment variables:
$ eb-manager -c -n <EB Environment name> [file]

to generate a local file:
$ eb-manager -l [file]
~~~

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

## Acknowledgments

Thanks to:
* Hassan Assi for all the love, complaints and support
* George Rattel for helping with the regex
* [Commander](https://github.com/tj/commander.js/) for the amazing package. 

## License

This project is licensed under the Mozilla Public License MPL  License - see the [LICENSE.md](LICENSE.md) file for details
