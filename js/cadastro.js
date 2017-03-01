$(document).ready(function(){

	var email;
	var nome;
	var senha;
	var biografia;
	var imagem_perfil;
	var criaCadastro;
	var permissao = true;

	$('#enviar_cadastro').click(function(){
		permissao = false;
		email     =	$('#email_input').val();
		nome 	  = $('#nome_input').val();
		senha 	  = $('#senha_input').val();
		biografia = $('#biografia_input').val();
		if(email == '' || senha == '' || nome == ''){
			alert('Complete todos os campos obrigatórios para continuar');
			return false;
		}

		$('#formulario_cadastro').css('display', 'none');
		$('#loading_gif').css('display', 'block');
		criarCadastro();
		
	}); 

	function criarCadastro(){
		criaCadastro = firebase.auth().createUserWithEmailAndPassword(email,senha).then(function(){
		 	firebase.database().ref('usuarios').child(btoa(email)).set({
			    nome: nome,
			    email: email,
			    biografia : biografia
				});
				var storageRef = firebase.storage().ref('fotosUsuarios/' + btoa(email));
				var task = storageRef.put(imagem_perfil);
				task.on('state_changed', 
				  		function progress(snapshot){
				  			console.log('em carregamento');
				  		},

				  		function error(e){
				  			alert(e);
				  		},

				  		function complete(){
				  			console.log('terminou o carregamento');
				  			var downloadURL = task.snapshot.downloadURL;
							console.log(downloadURL);
							firebase.database().ref('usuarios').child(btoa(email)).update({
								imagemUrl: downloadURL
							}).then(function(){
								$(location).attr('href', 'home.html');
							});
				  		}
				  	);
		}).catch(function(error){
				alert(error.message);
			});	
	}

	function readURL(input){
	    if (input.files && input.files[0]){
	        var reader = new FileReader();

	        reader.onload = function(e){
	            $('#foto_perfil').attr('src', e.target.result);
	        }
	        imagem_perfil = input.files[0];
	        reader.readAsDataURL(imagem_perfil);
	    }
	}

	$('#input_foto').change(function(){
		readURL(this);
	});

	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser && permissao){
			console.log('A pessoa está logadaaaaaa');
			$(location).attr('href', 'home.html');
		}
		else{
			console.log('a pessoa não está logada');
		}
	});

});