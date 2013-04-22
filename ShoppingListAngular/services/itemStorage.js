'use strict';


//Hier werden Daten lokal gespeichert und können abgerufen werden
 
shopper.factory( 'itemStorage', function() {
  var STORAGE_ID = 'todos-angularjs';

  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function( items ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(items));
    }
  };
});
