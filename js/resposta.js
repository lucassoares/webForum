$(document).ready(function(){

	var url = window.location.search;
	var key = url.replace('?','');
	var nome, email, emailConvertido,pergunta, titulo, nomePergunta;

	var dataAtual = new Date();
	var dia, mes, ano, dataPergunta;

	var count = 0;

	var loop = 0;

	firebase.auth().onAuthStateChanged(firebaseUser =>{
  	if(firebaseUser){
  	  email = firebaseUser.email;
      emailConvertido = btoa(email);
      var dbRef = firebase.database().ref().child('usuarios').child(emailConvertido).child('nome');
      dbRef.on('value', function(snapshot){
      nome = snapshot.val();
      $('#menu_drop').html(nome + '<span class="caret"></span>');

  });

  	}
  	else{
  		$(location).attr('href', 'index.html');
  	}
  });


	var rootRef = firebase.database().ref('perguntas').child(key);
	rootRef.on('value',function(snapshot){
		titulo = snapshot.child('titulo').val();
		pergunta = snapshot.child('pergunta').val();
		emailPergunta = snapshot.child('email').val();
		nomePergunta = snapshot.child('nome').val();

		loop+=1;

		if(loop == 1){
			$('#perguntaCompleta').append('<div class="panel panel-default">' +
		  '<div class="panel-heading">' + 
		    '<h3 class="panel-title">'+ titulo +'</h3>' +
		  '</div>' + 
		  '<div class="panel-body">' + 
		    pergunta + '<br><strong>' + nomePergunta + 
		  '</strong></div>' +
		'</div>');
		}
	});

	$('#enviarResposta').click(function(){
		var resposta = $('#respostaPergunta').val();
		if(resposta == ''){
			alert('Digite sua resposta para o usuario');
			return false;
		}

		pegarData();

		firebase.database().ref('respostas').child(key).push().set({
			respostaTexto: resposta,
			emailResposta: email,
			dataResposta: dataPergunta,
			nomeResposta: nome,
			keyPergunta: key
		});
		$('#respostaPergunta').val('');
	});

	firebase.database().ref('respostas').child(key).on('child_added', function(snapshot){
		var respostaTexto = snapshot.child('respostaTexto').val();
		var emailResposta = snapshot.child('emailResposta').val();
		var nomeResposta = snapshot.child('nomeResposta').val();

		$('#respostasPegunta').append('<div class="panel panel-default">' +
	  		'<div class="panel-body">' + respostaTexto + '<br><strong>' + nomeResposta + '</strong></div></div>' );
		count+=1;

		firebase.database().ref('perguntas').child(key).update({
			qtdeRespostas: count
		});
	});
	
	function pegarData(){
			dia = dataAtual.getDate();
			mes = dataAtual.getMonth()+1;
			ano = dataAtual.getFullYear();

			if(dia < 10){
				dia = '0'+dia;
			}
			if(mes < 10){
				mes = '0'+mes;
			}
			dataPergunta = ano+mes+dia;
		}


	$('#sair').click(function(){
      firebase.auth().signOut().then(function(){
        $(location).attr('href', 'index.html');
      }, function(error){
        console.log(error.message);
      });
	});

});