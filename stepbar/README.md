# Stepbar JQuery Plugin

##### Summary
This plugin provides a stepbar that shows a user the current task they are on in a series of tasks. When moving to a new
task, the stepbar will animate and the new task will highlight. Stepbar will loop back to step one if no more steps exist.

##### Requirements
  + [jQuery](http://jquery.com/)

-----
##### Installation 


```bash
npm install darincardin/jquery-plugins
```

##### Commands

```bash
# serve with hot reload at localhost:3000
npm run start

# build for production with minification
npm run build
```

##### Import Plugin

```javascript
import 'jquery-plugins/dist/stepbar.js';
import 'jquery-plugins/dist/stepbar.css';
```


##### Initialize Plugin

```javascript
var array =  [{label:"A"},{label:"B"},{label:"C"}] 
var step = $('#stepbar').stepbar({ index:1, array:array});	
```
-----

##### Configuration

* array: the data to use
* index: the step to start on


##### Commands
```javascript
//Moves the stepbar to the next step
step.next()    
//Moves the stepbar to the step specified
step.set(2)    
```
