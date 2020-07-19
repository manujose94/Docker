function table(x) { // Prints column x of a (1..10) multiplication table
	for (var j=1; j<11; j++)
	console.log("%d * %d = %d", x, j, x*j);
	console.log("");
}
function allTables() {
	for (var i=1; i<11; i++)
	table(i);
}
table( 4, 1);
console.log("----------");
console.log("----------");
//4 * 1 = 4
//4 * 2 = 8
//....

table(table(2));
//..........
//4 * 1 = 4
//4 * 2 = 8

//NaN * 1 = NaN
//NaN * 2 = NaN
//NaN * 3 = NaN
//....

//allTables(table(30),table(20),table(10));
