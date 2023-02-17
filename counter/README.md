# Counter JQuery Plugin

##### Summary
This plugin provides a mechanical styled counter. Digits change in a animated, rolling fashion.


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
import 'jquery-plugins/counter/dist/js/counter.js';
import 'jquery-plugins/counter/dist/css/counter.css';
```


##### Initialize Plugin

```javascript
 var counter =  $('#element1').counter();
```
-----
##### Configuration

The configuration plugin offers the following configurations


```javascript
var opts = {
   length: 5,
   setTime:12345,
   increment:1
};
var counter =  $('#element1').counter(opts);
```

* length: The about of digits in the counter.
* setTime: The initial time
* increment: The increment 



