# confion
App to browse conference talks


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
