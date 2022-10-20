const path = require('path');



module.exports = env => {

	return  {


	  
	  entry: { index: './main.js'  },

	  mode: 'development',
	  devServer: {
		port: 80   ,
		historyApiFallback: true,
	    static: {
	      directory: path.join(__dirname, 'src')
	    },
	  },
	
	}
}


