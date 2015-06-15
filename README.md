# confion
App to browse conference talks

[![Build Status](https://travis-ci.org/webplatformz/confion.svg?branch=master)](https://travis-ci.org/webplatformz/confion)
[![Dependencies Status](https://david-dm.org/webplatformz/confion.png)](https://david-dm.org/webplatformz/confion)

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

            
{  presenters: 
  [
    {
      id: 1,
    name: 'Darth Vader'
    },
    {
      id: 2,
    name: 'Donald Duck'
    },
        {
          id: 3,
    name: 'Luke Skywalker'
    }
  ],
  sessions:
  [
    '{{repeat(20)}}',
    {
      id: '{{index()}}',
      title: 'The {{random("java", "java script", "c++", "embedded")}} framework of the {{random("past", "future", "century")}}',
      description: '{{lorem(4, "sentences")}}',
      category: '{{random("Technology", "Project Management", "Testing", "Cloud", "Management")}}',
      lengthInMinutes: '{{random("60", "120", "180")}}',
      presenter: '{{random(1, 2, 3)}}:true',
      room: '{{ random("Room 101", "Room 42", "Room 211", "Room 111") }}',
      startTime: ""
    }
  ]

}
