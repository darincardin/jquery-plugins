

   var defaults = {
      processLimit:4,
    
   };

   class LoadImage {
	 static queue = [];			
	 static workers = 0;
	 static processLimit = 4;
	
	static async add(elem, opts){
		
		LoadImage.queue.push( new XImage(elem, opts) );

		if(LoadImage.workers < LoadImage.processLimit){ 
			LoadImage.workers++;
			setTimeout(LoadImage.initWorker)
		}
	}
	
	static async initWorker() {	
		while(LoadImage.queue.length>0) await LoadImage.process();		
		LoadImage.workers--;		 
	}

	static process(){
		
		return  new Promise((resolve, reject) => {		
			var xImage = LoadImage.queue.shift();
			xImage.process(resolve);
		});	
	}	 
}


$.fn.loadimageConfig = opts =>{
		
	var props = $.extend(true, {}, defaults, opts);
	
	LoadImage.processLimit = props.processLimit;
} 


 $.fn.loadimage = function(opts){
	
	this.each(function(i,elem){
		LoadImage.add($(elem), opts); 
	})	
}



class XImage {
	
	elem = null;	

	constructor(elem, style){
		
		this.elem = elem;

		this.elem.addClass('loadimage load-spinner').append( `<img />` );	
		
		this.setStyles(style);	
	}
	
		
	setStyles = style =>{

		for(var key in style) 	this.elem.find('img').css(key, style[key])							
	}

	process= (resolve)=>{
		
		var img = new Image();
		img.src = this.elem.attr('src');;
		
		img.onload = () =>{	
			resolve();
	
			this.elem.find('img').attr('src', img.src );		
			
			if(this.elem.attr('href') ) this.initFullScreenMode();
			
			setTimeout(()=>{
				this.elem.addClass('complete').removeClass('load-spinner');
			})
		}	
			
		img.onerror = ()=>{
			resolve();
			this.elem.removeClass('load-spinner').addClass('load-error')	
		}			
	}

	
	initFullScreenMode =()=>{
	
				this.elem.addClass('href');
				
				this.elem.click(()=>{
	
						var fullImgElem = $(`<div class="fullscreen load-spinner" />`)
						$('body').append(fullImgElem);	
						
						var img = new Image();
						img.src = this.elem.attr('href');									
						
						img.onload = ()=>{	
							fullImgElem.removeClass('load-spinner')
							.css({'background-image':`url('${img.src}')`})
							.click( ()=>fullImgElem.remove() );
						}	
						
						img.onerror = ()=>{ 
							fullImgElem.removeClass('load-spinner')
							.addClass('load-error')
							.click(()=>fullImgElem.remove()	);		
						}	
						
												
				});		
	}
	
}





