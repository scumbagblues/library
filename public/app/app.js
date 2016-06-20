'use strict';

angular.module('library',['ngRoute','ngResource','ui.bootstrap'])
    .config(function($routeProvider){
        $routeProvider
            .when('/books',{
                templateUrl: 'views/index.html',
                controller: 'IndexBookCtrl'
            })
            .when('/books/new',{
                templateUrl: 'views/bookform.html',
                controller: 'CreateBookCtrl'
            })
            .when('/books/edit/:id',{
                templateUrl: 'views/bookform.html',
                controller: 'EditBookCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

