module.exports = function(grunt) {

grunt.initConfig({
  watch:{
  	views:{
  		files:'public/views/**/*.html',
  		options:{
  			livereload:true
  		}
  	},
  	css:{
  		files:'dist/css/AdminLTE.min.css',
  		options:{
  			livereload:true
  		}
  	},
  	browser:{
  		files:'public/views/**/*.js',
        options:{
  		    livereload:true
  	    }
  	},
  	app:{
  		files:["server.js","api/**/*.js","controllers/**/*.js",""]
  	}
  }


});

 // Load the plugin that provides required task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register Default task(s).
  grunt.registerTask('default', ['watch']);


};