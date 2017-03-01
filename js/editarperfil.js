$(document).ready(function(){
	var email, emailConvertido;
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			email = firebaseUser.email;
			emailConvertido = btoa(email);

			var dbRef = firebase.database().ref().child('usuarios').child(emailConvertido);
	      	dbRef.on('value', function(snapshot){

		      nome = snapshot.child('nome').val();
		      email = snapshot.child('email').val();
		      biografia = snapshot.child('biografia').val();

		      $('#menu_drop').html(nome + '<span class="caret"></span>');
		      $('#nomeUsuario').val(nome);
		      $('#emailUsuario').html(email);
		      $('#biografiaUsuario').html(biografia);
		     
		  });
		}
		else{
			$(location).attr('href', 'index.html');
		}
	});

	$('#enviarAlteracoes').click(function(){
		var nomeNovo = $('#nomeUsuario').val();
		var biografiaNova = $('#biografiaUsuario').val();
		if(nomeNovo != '' && biografiaNova != ''){
			firebase.database().ref('usuarios').child(emailConvertido).update({
				nome: nomeNovo,
				biografia: biografiaNova
			}).then(function(){
				alert('Alteração feita com sucesso');
			});	

		}
	});

	$('#cancelarAlteracoes').click(function(){
		$(location).attr('href', 'home.html');
	});


});