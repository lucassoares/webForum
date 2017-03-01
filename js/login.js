$(document).ready(function(){
	var email;
	var senha;

	$('#fazerLogin').click(function(){
		email = $('#email_input').val();
		senha = $('#senha_input').val();

		if(email == '' || senha == ''){
			alert('Preencha todos os campos necessários para fazer o login');
			return false;
		}

		var fazerLogin = firebase.auth().signInWithEmailAndPassword(email,senha).then(function(){
			$(location).attr('href', 'home.html');
		}).catch(function(error){
			alert(error.message);
		});

	});

	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			console.log('A pessoa está logada');
			$(location).attr('href', 'home.html');
		}
	});
	
});