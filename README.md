# annotation_tool
DR Assignment

Scenario
------------------------------------------
You are a data analyst whose job is to create and correct annotations that come out of the machine-learning platform.  Your tasks include reviewing the annotations made by the system,  removing any unnecessary or incorrect annotations - hey, it's not always 100% accurate - as well as adding annotations to text that was missed by the system.  Basically, if the system says that "The White House", e.g., is a PERSON, you can delete that annotation.  If the system did not tag "The White House" as a LOCATION you can apply that annotation to the text.  All annotations will need to be visible at one time (excluding documents that scroll, of course).

There are only 3 categories of annotations: 'PERSON', 'LOCATION', and 'ORGANIZATION'.  As a developer, you will need to provide a simple web interface that displays the document in full with the text of the annotations highlighted.  You will also need to provide a simple mechanism that allows the analyst to delete incorrect annotations and add annotations at will.  Lastly, there will be a "save" button that, when clicked, will spit out a JSON representation of the annotations to the browser console.  The data can be retrieved in any manner but would be great if it was loaded via AJAX.

Commands for terminal
  - Clone repository ```git clone https://github.com/mikeulvila/annotation_tool.git```
  - Change directory into lib folder ```cd public/lib```
  - Install Bower components ```bower install```
  - ```cd ..```
  - Start up http-server ```http-server``` and go to http://localhost:8080/ in your browser.
  - If you do not have http-server installed you can find it here [NPM http-server](https://www.npmjs.com/package/http-server)
