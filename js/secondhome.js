$(document).ready(function(){
  var nome, email;
  var emailConvertido;
  var qtdeRespostas;

  var titulo;
  var dataPergunta;
  var textoPergunta;
  var emailPergunta; 
  var key;

  var imagemUsuario;

  var rootRef = firebase.database().ref('perguntas');
    rootRef.on('child_added', function(snapshot){

      titulo = snapshot.child('titulo').val();
      dataPergunta = snapshot.child('data').val();
      textoPergunta = snapshot.child('pergunta').val();
      emailPergunta = snapshot.child('email').val();
      key = snapshot.child('key').val();
      nome = snapshot.child('nome').val();
      qtdeRespostas = snapshot.child('qtdeRespostas').val();
      imagemUsuario = snapshot.child('imagem').val();
      emailConvertido = btoa(emailPergunta);

      if(qtdeRespostas == 1){qtdeRespostas = qtdeRespostas + ' resposta';}
        else{qtdeRespostas = qtdeRespostas + ' respostas';}

      $('#perguntas').append('<a id="link_perguntas" href="resposta.html?'+key+'">' +
         '<div class="panel panel-default" >' +
            '<div id="div_um">' +
              ' <div id="div_dois" class="col-sm-1">' +
                  '<img id="fotoUsuario" src="'+imagemUsuario+'" class="img img-responsive img-rounded" alt="perfilUsuario">' +
               '</div>' +
               '<div class="col-sm-12">' +
                  '<div id="div_titulo" class="panel-heading">' +
                     '<h3 id="titulo_pergunta" class="panel-title">'+titulo+'</h3>'+
                  '</div>' +
                  '<div class="panel-body">' + textoPergunta+
                     '<br>' +
                     '<p class="numeroRespostas">'+qtdeRespostas+'</p>'+
                  '</div>' +
               '</div>'+
            '</div>'+
         '</div>'+
      '</a>');
  });


	$('#sair').click(function(){
      firebase.auth().signOut().then(function(){
        $(location).attr('href', 'index.html');
      }, function(error){
        console.log(error.message);
      });
	});

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
	
});