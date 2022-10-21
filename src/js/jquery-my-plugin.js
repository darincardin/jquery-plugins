/*!
 * jquery-my-plugin 1.0.0
 * Made with create-jquery-plugin
 *
 * Created by Darin Cardin <darinjaycardin@gmail.com>
 *
 * @license MIT
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
   "use strict";

   // Default Options
   var defaults = {
      myStyle: 'my-style1',
      length: 5,
      setTime:122,
      increment:1
   };








   class MyPlugin {

	 counters = new Array(5);
	 main = null;
	 options = null;

     constructor(element, options) {
		
	 	this.options = $.extend(true, {}, defaults, options);		    
        this.main    = $(element);
        this._init(); 
     }

	 setTime(v) {
		var _this	= this;	
		
		var time = v.toString().split('').map(i=> parseInt(i));
				
		for(var i = 0; i < this.options.length; i++){	
			
			var newValue = time.pop() || 0;

			if(this.counters[i] != newValue) {
				
				this.counters[i] = newValue;
				
				this.main.find(`.${i}`).removeClass('in out').addClass('out');
				
				(function(i, newValue){		
					setTimeout(function(){					
						_this.main.find(`.${i}`).html(newValue).addClass('in')	
					}, 150);	 		
				})(i, newValue)				
			}		
		}				
	 }


	increment = (n = 0) => {
					
		var _this	= this;	
		
		this.counters[n] += (n==0?this.options.increment : 1) ;
		
		if(this.counters[n]>9) {
			this.counters[n] = 0;
			setTimeout(()=>{this.increment(n+1)})
		} 	
				
		this.main.find(`.${n}`).removeClass('in out').addClass('out')
					
		setTimeout(function(){					
			_this.main.find(`.${n}`).html(_this.counters[n]).addClass('in')	
		}, 100);	
	}		
		
	animate = ()=> {
		
		
		
	}	
		
	update = (n=0, val=0)=>{
		var _this	= this;	
		
		this.main.find(`.${n}`).removeClass('in out').addClass('out')
					
		setTimeout(function(){					
			_this.counters[n] = val;
			_this.main.find(`.${n}`).html(_this.counters[n]).addClass('in')	
		}, 150);	
	}
			
	set =   v=>{ this.setTime(v) }
		
	clear = v =>{ this.setTime(0) }
		
	reset = v =>{ this.setTime(this.options.setTime) }

    _init() {
		 this.main.addClass('counter');		
				
		 var time = this.options.setTime.toString().split('').map(i=> parseInt(i));		
				
		 for(var i = 0; i <  this.options.length; i++){
			
			this.counters[i] = time[i] || 0;
			this.main.prepend(`<span><b class='${i}'>${this.counters[i]}</b></span>`)
			
		}
     }
   }







   // Wrapper for the plugin
   $.fn.myPlugin = function (options) {
      var pluginName = "myPlugin";

      if (options === undefined || typeof options === 'object') {
		console.log(1)
		 
		 return new MyPlugin(this, options)
		
        // return this.each(function () {
           //  if (!$.data(this, pluginName)) {
          //      $.data(this, pluginName, new MyPlugin(this, options));
         //   }
         //});
      } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
         let instance = $.data(this[0], pluginName);

         if (options === 'destroy') {
             $.data(this, pluginName, null);
         }

         if (instance instanceof MyPlugin && typeof instance[options] === 'function') {
             return instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
         } else {
	
			
	
             return this;
         }
      }
   };
}));
