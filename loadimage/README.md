# Load Image JQuery Plugin

##### Summary
This plugin provides a simple way to bulk load images.

* Only a certain number of images are allowed to load in parallel. Additional images will wait in a queue. This allows images close to top of the page to load first.
* Plugin supports a full screen onClick modal that will overlay a larger version of the image. 
* While loading, a  loading spinner will be displayed where the image will be.
* If the image load fails, an "X" will be displayed where the image would have been.
  

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
import 'jquery-plugins/loadimage/dist/js/loadimage.js';
import 'jquery-plugins/loadimage/dist/css/loadimage.css';
```


##### Initialize Plugin

```html
<div src="/photos/bird1.jpg" > </div>
<div src="/photos/bird2.jpg" > </div>	
```

```javascript
$('div').loadimage();
```
-----
##### Configuration


Use the following code to set the max number of images that can be fetched at once. Any additional images are stored in a FIFO queue. 
On completion of an image, another will be retrieved from the queue and processed.

```javascript
 $.fn.loadimageConfig({processLimit:1});  
```


One or more images can be loaded using the command below. Image styles can be passed in via a config object. 

```javascript
$('img.small').loadimage( { width:"50px", height:"50px" } ); 
$('img.large').loadimage( { width:"200px", height:"200px"} ); 
```



Uses have the option of including a fullscreen modal that appears if the image is clicked. Simply include the "href" attribute in the tag.


```javascript
<div src="/photos/small/bird.jpg" href="/photos/large/bird_big.jpg" > </div>
```



