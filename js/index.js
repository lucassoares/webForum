$(document).ready(function(){
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			console.log('A pessoa está logada');
			$(location).attr('href', 'home.html');
		}
		else{
			console.log('a pessoa não está logada');
		}
	});
});