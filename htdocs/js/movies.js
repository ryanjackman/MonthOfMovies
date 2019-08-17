/*
  File: ass9.js
  Created by: Clayton K. Smith, UMass Lowell Computer Science, Clayton_Smith@student.uml.edu
  Copyright (c) 2014 by Clayton K. Smith.
  All rights reserved. May be freely copied or excerpted for any purpouse with
  credit to the author.
  
  Created on: 12/9/2014

*/

/* Creates the MovieApp object. */
var MovieApp = angular.module('movieApp', []);
               
var getURL = function( type, field){
    var apiKey = '2bf076411fb501d0db08919b8769a0cc'
    return 'http://api.themoviedb.org/3/' + type + '/' + field + '?api_key=' + apiKey;
}

/* MovieApp controller for app.*/       
MovieApp.controller("movieCtrl", ['$scope', '$http', function (scope, http){
    console.log("File found");  
    scope.reverse = true ;
    scope.content = 'Things will be going here at some point for testing.'
    scope.monthOfMovies  = [[]] ;
    scope.date = (new Date(Date())).getDate() ;
    
    var searchField = '54ced553c3a3687f82006d33' ;
    var searchType  = 'list' 

   
    // Get all the object from the json array in order.
    var getListParts = function(list){
	if( list.length == 0 ) return ;
	http.get( getURL('movie', list[0]['id']) ).
	    success( function(movieJF){
		
		// Magic
		var count =  ((scope.monthOfMovies.length -1) * 7) + scope.monthOfMovies[scope.monthOfMovies.length -1].length + 1 ;
		
		// Magic
		scope.monthOfMovies[scope.monthOfMovies.length -1].push( {
		    
		    // Magic
		    'count':       ((scope.monthOfMovies.length -1) * 7) + scope.monthOfMovies[scope.monthOfMovies.length -1].length + 1,
		    'name':         movieJF['title'],
		    'runtime':      movieJF['runtime'],
		    'vote_average': movieJF['vote_average'],
		    'release_date': movieJF['release_date'],
		    'link':         movieJF['homepage'],
		    'poster':       'http://image.tmdb.org/t/p/w154' + movieJF['poster_path'],
		    'active':       count == scope.date ? 'red' : 'white' // This is super hacky and I'm sorry 
		});
		
		// Math
		if( scope.monthOfMovies[scope.monthOfMovies.length -1].length % 7 == 0 ){
		    scope.monthOfMovies.push( [] ) ;
		};
		
		// Get rid of first obj. Look at next.
		list.shift()
		getListParts( list);
	    });		
    };
    
    // get locat file
    http.get( '/data/movies.json' ).
	success( function(data){
	    scope.content = data
	    scope.itemCount = data['item_count'];
	    getListParts( data['items'] ); 
	});
    
    console.log(  scope.monthOfMovies.length );
}]);
