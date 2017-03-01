$(document).ready(function(){
	var email, nome, emailConvertido, biografia;
	var count = 0;
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
		      $('#nomeUsuario').html(nome);
		      $('#emailUsuario').html(email);
		      $('#biografiaUsuario').html(biografia);
		     
		  });

	      emailConvertido = btoa(email);
		  firebase.storage().ref().child('fotosUsuarios/'+emailConvertido).getDownloadURL().then(function(url){
		  	var imagem = url;
		  	$('#imagemUsuario').attr('src', imagem);
		  }).catch(function(error){
		  	alert(error);
		  });

  var rootRef = firebase.database().ref('perguntas');
    rootRef.on('child_added', function(snapshot){
      var titulo = snapshot.child('titulo').val();
      var dataPergunta = snapshot.child('data').val();
      var textoPergunta = snapshot.child('pergunta').val();
      var emailPergunta = snapshot.child('email').val();
      var key = snapshot.child('key').val();
      var nome = snapshot.child('nome').val();
      var qtdeRespostas = snapshot.child('qtdeRespostas').val();

      if(email == emailPergunta){
		  $('#perguntasDoUsuario').append('<div class="panel panel-default">' +
		  '<div class="panel-heading">' + 
		    '<h3 class="panel-title"><a href="resposta.html?'+key+'"> '+titulo+' </a>'+'</h3>' +
		  '</div>' + 
		  '<div class="panel-body">' + 
		    textoPergunta + '<br><p class="numeroRespostas">'+qtdeRespostas+' respostas</p>'+ 
		  '</div>' +
		'</div>');
		  	count++;
		}

		$('#numeroPerguntas').html(count + ' perguntas');
  });
	  	}
	  	else{
	  		$(location).attr('href', 'index.html');
	  	}
  	});


});