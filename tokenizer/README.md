# Tokenizer JQuery Plugin

##### Summary
This plugin provides a tokenizer widget. Tokens are entered in an input field; they then appear as tokens below the input.
Tokens can be deleted by clicking on them.


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
import 'jquery-plugins/tokenizer/dist/js/tokenizer.js';
import 'jquery-plugins/tokenizer/dist/css/tokenizer.css';
```


##### Initialize Plugin

```javascript
var tokens = [];
$('#app').tokenizer({allowDupes: false, tokens:tokens});	
```
-----

##### Configuration
* allowDupes: whether or not to allow dupe tokens
* tokens: the array to store the tokens; required



