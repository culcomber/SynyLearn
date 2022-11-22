var p3 = new Promise( function(resolve,reject){
    resolve( "B" );
} );

var p1 = new Promise( function(resolve,reject){
    console.log( 'p3')
    console.log( p3)
    resolve( p3 );
} );

var p2 = new Promise( function(resolve,reject){
    resolve( "A" );
} );

p1.then( function(v){
    console.log(p3)
    console.log( p3 );
    console.log( v );
} );

p2.then( function(v){
    console.log( v );
} );

// A B  <-- not  B A  as you might expect