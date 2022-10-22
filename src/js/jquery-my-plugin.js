

   var defaults = {
      length: 5,
      setTime:12345,
      increment:1
   };


	



   class Counter {

	 counters = new Array(5);
	 main = null;
	 options = null;

     constructor(element, options) {
		
	 	this.options = $.extend(true, {}, defaults, options);		    
        this.main    = $(element);
        this._init(); 
     }

	 setTime = (v) =>{
			
		var time = v.toString().split('').map(i=> parseInt(i));
													
		for(var i = (this.options.length-1) ; i >= 0 ; i--){	
			
			var newValue = time.pop() || 0;

			if(this.counters[i] != newValue) {			
				this.counters[i] = newValue;
				this.animate(i, newValue)			
			}		
		}				
	 }
	
	 convert = {
		toNumber: ()=> {},
		toArray: (v)=> v.toString().split('').map(i=> parseInt(i))
		
	}

	increment = (n = 0) => {

	
	    var value = parseInt( this.counters.join(""));     
	     
	    value += this.options.increment;
	    this.setTime(value);
	}		
		
	animate = (i, newValue )=> {
		var _this = this;

		this.main.find(`.${i}`).prepend(newValue+ " ").addClass('out');
					
		setTimeout(function(){
			_this.main.find(`.${i}`).html(newValue).removeClass('out')
		}, 100);
	}	
			
	set =   v=>{ this.setTime(v) }
		
	clear = v =>{ this.setTime(0) }
		
	reset = v =>{ this.setTime(this.options.setTime) }

    _init() {
		 this.main.addClass('counter');		
				
		 var time = this.options.setTime.toString().split('').map(i=> parseInt(i));		
				
		 for(var i = 0; i <  this.options.length; i++){
			
			this.counters[i] = time[i] || 0;
			this.main.append(`<span><b class='${i}'>${this.counters[i]}</b></span>`)
			
		 }
     }
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

   // Default Options






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
