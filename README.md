# confion
App to browse conference talks

![Build Status](https://travis-ci.org/webplatformz/confion.svg?branch=master) [
![Dependencies Status](https://david-dm.org/webplatformz/confion.png)](https://david-dm.org/webplatformz/confion)

## Installation
You only need to have node.js and bower installed. 

Installing node.js: 

See http://nodejs.org/download/


Install bower: 
```sh
$ npm install -g bower
```
Install node modules:
```sh
$ npm install
```

Install frontend dependencies: 
```sh
$ bower install
```


## Sample data generator
http://www.json-generator.com/


      [
        '{{repeat(20)}}',
        {
          id: '{{index()}}',
          title: 'The {{random("java", "java script", "c++", "embedded")}} framework of the {{random("past", "futere", "century")}}',
          description: '{{lorem(4, "sentences")}}',
          category: '{{random("Technology", "Project Management", "Testing", "Cloud", "Management")}}',
          lengthInMinutes: '{{random("60", "120", "180")}}',
          presenter: '{{random("Darh Vader", "Donald Duck", "Luke Skywalker")}}'
        }
      ]
