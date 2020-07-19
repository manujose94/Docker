function alert(x){
	console.log(x);
}
function scopeFunction(){
	alsoGlobal="This is also global!!";
	var notGlobal ="This is private to subFunction";

	function subFunction(){
		alert(notGlobal); //We can still acces notGlobal in this child function
		stillGlobal="No var keyboar so this is global!"
		var isPrivate ="This is private to subFunction";
	}
	//alert(stillGlobal); //This will output --> "No var keyboar so this is global!"
	//alert(isPrivate); //This generate a an error since isPrivate ins private to subfunction()
	subFunction()
	alert(stillGlobal);

}
//alert(alsoGlobal);//It generates an error since wue haven't run scopeFunction yet
scopeFunction();
alert(alsoGlobal);

