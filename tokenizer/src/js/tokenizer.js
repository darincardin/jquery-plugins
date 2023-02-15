



class Tokenizer {

    HTML = `
				<div class="tokenizer" >
					<div>
						<input  class='form-control error' type="text" value="" />
						<button type="text" class="btn btn-primary" >
							<span>Add</span>
			        	</button>
					</div>
					
					<div class="tokens"></div>
				</div>
	`;



	elem = null;
	props = null;		

    constructor(elem, opts) {
		if(!opts || !opts.tokens) this.throwRequiredError();
	
		this.elem = elem;
		this.props  = opts; //$.extend(true, opts, util.defaults, opts);	
				
		this.elem.html(this.HTML);
		this.render();
    } 

	onAdd = ()=>{	
		
		var input = this.elem.find('input');
		
		var val = input.val().trim();
	
		if(this.isValid(val)) {
			input.val("");
			this.props.tokens.push(val);
			this.update();			
		}		
		
		else{
			input.addClass('error')
			
		}
		
		input.focus();
	}
	
	onRemove = (i)=>{	
		this.props.tokens.splice(i,1);
		this.update();	
	}

	onKeyDown = e => this.onEnter(e);
	
    render = ()=>{	
		this.update();
		this.elem.find('button').click(this.onAdd);
	    this.elem.find('input').keydown(this.onKeyDown);	
	}
	  
	update = () => {
		
		var tokens = [];

		this.props.tokens.forEach((v, i)=>{

			var TOKEN = $(this.getToken(v));		

			TOKEN.click(()=>{this.onRemove(i)});
							
			tokens.push(TOKEN); 					
		});	
		
		this.elem.find('.tokens').html(tokens);				
	} 
	

	onEnter = function(e) {	
			if(e.key=="Enter")this.onAdd();
	}

	throwRequiredError = function(){throw new Error("Tokenizer: tokens option required!");}

	isValid = function(v){
			if(v==undefined || v=="") return false;
			if(this.props.allowDupes) return true;
			return !this.props.tokens.includes(v);
	}
		
		

	getToken = v=>{
			
			return `<span  class="token" >
							<span>${v}</span>
							<span class="close-btn" /> 
					 </span>`;
	}
		
	
	
}


$.fn.tokenizer = function(opts){
	return new Tokenizer(this, opts);
}
