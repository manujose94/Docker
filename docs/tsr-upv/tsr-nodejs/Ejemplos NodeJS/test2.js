/**   1. solucion posible

function populations() {
  var pops = [1365590000, 1246670000, 318389000];
  var names = ["China", "India", "USA"];
  var placeholder = ["1st", "2nd", "3rd", "4th"];
  var array = [];
  for (i=0; i<pops.length; i++)
    array[i] = function(x) {
                console.log("The " + placeholder[x] +
                " most populated country is " +
                names[x] + " and its population is " +pops[x]);
              };
  return array;
}

var ps = populations();
first = ps[0];
second = ps[1];
third = ps[2];
//console.log(ps[0]());
//The 4th most populated country is undefined and its population
// is undefined
console.log(ps[0](0)); //OKEY
first(0);
second(1);
third(2);


**/

/**   2n. solucion posible **/

function populations() {
  var pops = [1365590000, 1246670000, 318389000];
  var names = ["China", "India", "USA"];
  var placeholder = ["1st", "2nd", "3rd", "4th"];
  var array = [];
  for (i=0; i<pops.length; i++)

    array[i] = function(x) {
              return function() {
                console.log("The " + placeholder[x] +
                " most populated country is " +
                names[x] + " and its population is " +pops[x]);
                  }
              }(i);
  return array;
}

var ps = populations();
first = ps[0];
second = ps[1];
third = ps[2];
//console.log(ps[0]());
//The 4th most populated country is undefined and its population
// is undefined
console.log(ps[0]); //OKEY
first(0);
second();
third(2);
