
var defaultOpts = {
	increment: 1,
	length:6,
	setTime:0
}

$.fn.counter = function(opts) {
	        var elem = this;
			var options = {...defaultOpts, ...opts}
			var counters = new Array(options.length);

			
			var  init = ()=>{
				elem.addClass('counter');
				
				setTime(options.setTime)
				
				for(var i = 0; i < options.length; i++){
					elem.prepend(`<span><b class='${i}'>${counters[i]}</b></span>`)
				}						
			}
			
			var increment = (n = 0) => {
					
				var next = counters[n] +  (n==0?options.increment : 1);
				
				if(next>9 && n < options.length) setTimeout(()=>{increment(n+1)});
				
				elem.find(`.${n}`).removeClass('in out')
				elem.find(`.${n}`).addClass('out')
						
				setTimeout(function(){					
					counters[n] = next>9 ? 0 : next;	
					elem.find(`.${n}`).html(counters[n])
					elem.find(`.${n}`).addClass('in')	
				}, 150);
			}		
			
			var set =   v=>{ setTime(v) }
		
			var clear = v =>{ setTime(0) }
		
			var reset = v =>{ setTime(options.setTime) }
		
			var setTime = v =>{
				var time = v.toString().split('').map(i=> parseInt(i));
				
				for(var i = 0; i < options.length; i++){			
					counters[i] = time.pop() || 0;
					elem.find(`.${i}`).html(counters[i]);		
				}				
			}
		
			init();
			
			return {increment, clear, reset, set}
};

