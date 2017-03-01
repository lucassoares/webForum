$(document).ready(function(){
	var nome, email, emailConvertido, imagem;
	var tituloPergunta, pergunta, dataPergunta;
	var dataAtual = new Date();
	var dia, mes, ano;

	var tags;

	var camposMarcados = new Array();


	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			email = firebaseUser.email;
			emailConvertido = btoa(email);
			var dbRef = firebase.database().ref().child('usuarios').child(emailConvertido);
	      		dbRef.on('value', function(snapshot){
	      		nome = snapshot.child('nome').val();
	      		imagem = snapshot.child('imagemUrl').val();

	      		$('#menu_drop').html(nome + '<span class="caret"></span>');
  			});
		}
		else{
			$(location).attr('href', 'index.html');
		}
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
	

	$('#enviarPergunta').click(function(){

		tituloPergunta = $('#tituloPergunta').val();
		pergunta = $('#textoPergunta').val();
		
		// $("input[type=checkbox]:checked").each(function(){
  //   		camposMarcados.push($(this).val());
  //   		tags = camposMarcados.toString();
		// });
		
		//return false;
		if(tituloPergunta == '' || pergunta == ''){
			alert('Faça sua pergunta!');
			return false;
		}

		pegarData();

		var dbRef = firebase.database().ref('perguntas').push();
		dbRef.set({
			pergunta: pergunta,
			titulo: tituloPergunta,
			key: dbRef.key,
			data: dataPergunta,
			email: email,
			nome: nome,
			imagem: imagem,
			qtdeRespostas: 0
		}).then(function(){
			console.log('pergunta enviada com sucesso');
			$(location).attr('href', 'home.html');
		});


		

	});


});	