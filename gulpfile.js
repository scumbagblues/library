var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    var bpath = 'node_modules/bootstrap-sass/assets';
  	var jqueryPath = 'resources/assets/vendor/jquery';
  	var angularPath = 'resources/assets/vendor/angular'
  	mix.sass('app.scss')
  	  .copy(angularPath + '/angular.min.js', 'public/js')
  	  .copy(angularPath + '-route/angular-route.min.js', 'public/js')
      .copy(angularPath + '-animate/angular-animate.js', 'public/js')
      .copy(angularPath + '-resource/angular-resource.min.js', 'public/js')
      .copy(angularPath + '-touch/angular-touch.js', 'public/js')
      .copy(angularPath + '-sanitize/angular-sanitize.js', 'public/js')
      .copy(angularPath + '-bootstrap/ui-bootstrap-tpls.min.js', 'public/js')
  	  //.copy(angularPath + '-modal-service/dst/angular-modal-service.min.js', 'public/js')	
      .copy(jqueryPath + '/dist/jquery.min.js', 'public/js')
      .copy(bpath + '/fonts', 'public/fonts') 
      .copy(bpath + '/javascripts/bootstrap.min.js', 'public/js');
});

