
	var eliminar_mail=1;
	var eliminar_password=1;
    $("#id_email_conf").on('keyup', function(){
        var value = $("#id_email_conf").val();
       	var mail = $("#id_email").val();

       	console.log(value);
       	console.log(mail);
       	

       	if(value!=mail){
       		console.log(eliminar_mail);
       		if(eliminar_mail==2){
       			$("#alerta").remove();
       			console.log("entro y elimino");
       		}

       		console.log("son iguales");
       		$("#miboton").prepend('<div id="alerta" class="alert alert-danger" role="alert"> Error: Los mails no coinciden </div>');
       		eliminar_mail=2;
       		console.log(eliminar_mail);
       	}
       	else{
       		console.log("No son iguales");
       		$("#alerta").remove();
       	}
		          
	});

	$("#id_password_conf").on('keyup', function(){
        var value = $("#id_password_conf").val();
       	var password = $("#id_password").val();

       	console.log(value);
       	console.log(password);
       	

       	if(value!=password){
       		console.log(eliminar_password);
       		if(eliminar_password==2){
       			$("#alerta").remove();
       			console.log("entro y elimino");
       		}

       		console.log("son iguales");
       		$("#miboton").prepend('<div id="alerta" class="alert alert-danger" role="alert"> Error: Las contraseñas no coinciden </div>');
       		eliminar_password=2;
       		console.log(eliminar_password);
       	}
       	else{
       		console.log("No son iguales");
       		$("#alerta").remove();
       	}
		          
	});


   
