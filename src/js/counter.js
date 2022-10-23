



   /* Converts a number into an array of individual digits */
   Number.prototype.toArray = function() { return this.toString().split('').map(i=> parseInt(i) ); }
	
   /* Converts an array of strings to a single number  */	
   Array.prototype.toNumber = function() {return parseInt( this.join(""));}  




   var defaults = {
      length: 5,
      setTime:12345,
      increment:1
   };


   class Counter {

	 main = null;
	 opts = null;
	 counters = null;
	 

     constructor(element, opts) {
		
	 	 this.opts      = $.extend(true, {}, defaults, opts);		
	 	
	 	 this.counters  = new Array(this.opts.length);   
	 	    	
         this.main      = $(element).addClass('counter');					
		
	 	 var counterArr = this.opts.setTime.toArray();
				
		 for(var i = 0; i <  this.opts.length; i++){		
			this.counters[i] = counterArr[i] || 0;
			this.main.append(`<span><b class='${i}'>${this.counters[i]}</b></span>`);
		 }	 
     }

	 setTime = (v) =>{

		var counterArr = v.toArray();
											
		for(var i = (this.opts.length-1) ; i >= 0 ; i--){	
			
			var newValue = counterArr.pop() || 0;

			if(this.counters[i] != newValue) {			
				this.counters[i] = newValue;
				this.animate(i, newValue);		
			}		
		}				
	 }  
	

	 increment = () => {

		var value = this.counters.toNumber();
		  
	    value += this.opts.increment;
	    this.setTime(value);
	 }		
		
	 animate = (i, newValue )=> {
		var _this = this;

		this.main.find(`.${i}`).prepend(newValue+ " ").addClass('out');
					
		setTimeout(function(){
			_this.main.find(`.${i}`).html(newValue).removeClass('out');
		}, 100);
	 }	
			
	 set =   v=>{ this.setTime(v); }
		
	 clear = v =>{ this.setTime(0); }
		
	 reset = v =>{ this.setTime(this.opts.setTime); }

   }




























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





   // Wrapper for the plugin
   $.fn.counter = function (options) {
      var pluginName = "myPlugin";

      if (options === undefined || typeof options === 'object') {
		
		 
		 return new Counter(this, options)
		
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
