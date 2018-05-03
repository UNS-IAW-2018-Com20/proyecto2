
	var eliminar_mail=1;
	var eliminar_password=1;
	var eliminar=1;
	var eliminarpass=1;


 

	   	$("#id_email_conf").on('keyup', function(){
	        var value = $("#id_email_conf").val();
	       	var mail = $("#id_email").val();

	       	console.log(value);
	       	console.log(mail);
	       	

	       	var valueEmail = $("#id_email_conf").val().length;
			var maill = $("#id_email").val().length;

			console.log("entro :" +valueEmail+ "-"+ maill);
			boton_registrar();
			$("#alerta1").remove();


			if(value!="" | mail!=""){

				/*if(value!=mail && valueEmail>=maill){*/
	       	if(value!=mail /*&& valueEmail>=maill*/){
	       		console.log(eliminar_mail);
	       		if(eliminar_mail==2){
	       			$("#alerta1").remove();
	       			eliminarAlertasDIV_iguales();
	       			eliminarAlertasDIV_distintas();
	       			console.log("entro y elimino");
	       		}

	       		console.log("son distintas");
	       		$("#miboton").prepend('<div id="alerta1" class="alert alert-danger" role="alert"> Error: Los mails no coinciden </div>');
	       		eliminar_mail=2;
	       		console.log(eliminar_mail);

	       		
	       		eliminarAlertasDIV_iguales();
	       		agregarAlertasDIV_distintas();

	       	}
	       	else{

	       		if(eliminar_mail==2){
	       			$("#alerta1").remove();
	       			eliminarAlertasDIV_iguales();
	       			eliminarAlertasDIV_distintas();
	       			console.log("entro y elimino");
	       		}
	       		console.log("son iguales");
	       		$("#alerta1").remove();
	       		agregarAlertasDIV_iguales();
	       		eliminarAlertasDIV_distintas();
	       		eliminar=2
	       		
	       		
	       	}

			}

			
			          
		});
 

	
		$("#id_password_conf").on('keyup', function(){
        var value = $("#id_password_conf").val();
       	var password = $("#id_password").val();

       	
       	boton_registrar();
       	console.log(value);
       	console.log(password);

       		var valuePassword = $("#id_password_conf").val().length;
			var pass = $("#id_password").val().length;

			console.log("entro :" +valuePassword+ "-"+ pass);
       	$("#alert2").remove();

       	if(value!=""|password!=""){

       		if(value!=password /*&& valuePassword>=pass*/){
       		console.log(eliminar_password);
       		if(eliminar_password==2){
       			$("#alerta2").remove();
       			eliminarAlertasDIV_iguales_pass();
	       		eliminarAlertasDIV_distintas_pass();
       			console.log("entro y elimino");
       		}

       		console.log("son iguales");
       		$("#miboton").prepend('<div id="alerta2" class="alert alert-danger" role="alert"> Error: Las contraseñas no coinciden </div>');
       		eliminar_password=2;
       		console.log(eliminar_password);
       		eliminarAlertasDIV_iguales_pass();
	       	agregarAlertasDIV_distintas_pass();

       	}
       	else{

       		if(eliminar_mail==2){
	       			$("#alerta2").remove();
	       			eliminarAlertasDIV_iguales_pass();
	       			eliminarAlertasDIV_distintas_pass();
	       			console.log("entro y elimino");
	       		}
       		console.log("No son iguales");
       		$("#alerta2").remove();
       		agregarAlertasDIV_iguales_pass();
       		eliminarAlertasDIV_distintas_pass();
       		eliminarpass=2;
	       	
       	}
       	}

       	
		          
	});
	
function agregarAlertasDIV_iguales(){

	$("#div_email").addClass("has-success");
	$("#div_email_conf").addClass("has-success");
	$("#id_email_conf").addClass("alert alert-success");
	$("#id_email").addClass("alert alert-success");
	$("#spanalert_dist").remove();
	$("#spanalert_dist_conf").remove();
	$("#div_email").append('<span id="spanalert_iguales" class="fa fa-check form-control-feedback"></span');
	$("#div_email_conf").append('<span id="spanalert_iguales_conf" class="fa fa-check form-control-feedback"></span');
}

	
function agregarAlertasDIV_distintas(){

	$("#div_email").addClass("has-danger");
	$("#div_email_conf").addClass("has-danger");
	$("#id_email_conf").addClass("alert alert-danger");
	$("#id_email").addClass("alert alert-danger");

	$("#spanalert_iguales").remove();
	$("#spanalert_iguales_conf").remove();
	$("#div_email").append('<span id="spanalert_dist" class="fa fa-exclamation form-control-feedback"></span');
	$("#div_email_conf").append('<span id="spanalert_dist_conf" class="fa fa-exclamation form-control-feedback"></span');
}

function eliminarAlertasDIV_iguales(){

	$("#div_email").removeClass("has-success");
	$("#div_email_conf").removeClass("has-success");
	$("#id_email_conf").removeClass("alert alert-success");
	$("#id_email").removeClass("alert alert-success");
	
	$("#spanalert_iguales").remove();
	$("#spanalert_iguales_conf").remove();

}
	
function eliminarAlertasDIV_distintas(){

	$("#div_email").removeClass("has-danger");
	$("#div_email_conf").removeClass("has-danger");
	$("#id_email_conf").removeClass("alert alert-danger");
	$("#id_email").removeClass("alert alert-danger");
	

	$("#spanalert_dist").remove();
	$("#spanalert_dist_conf").remove();
}

/**/
function agregarAlertasDIV_iguales_pass(){

	$("#div_password").addClass("has-success");
	$("#div_password_conf").addClass("has-success");
	$("#id_password_conf").addClass("alert alert-success");
	$("#id_password").addClass("alert alert-success");
	$("#spanalert_dist_pass").remove();
	$("#spanalert_dist_conf_pass").remove();
	$("#div_password").append('<span id="spanalert_iguales_pass" class="fa fa-check form-control-feedback"></span');
	$("#div_password_conf").append('<span id="spanalert_iguales_conf_pass" class="fa fa-check form-control-feedback"></span');
}

	
function agregarAlertasDIV_distintas_pass(){

	$("#div_password").addClass("has-danger");
	$("#div_password_conf").addClass("has-danger");
	$("#id_password_conf").addClass("alert alert-danger");
	$("#id_password").addClass("alert alert-danger");

	$("#spanalert_iguales_pass").remove();
	$("#spanalert_iguales_conf_pass").remove();
	$("#div_password").append('<span id="spanalert_dist_pass" class="fa fa-exclamation form-control-feedback"></span');
	$("#div_password_conf").append('<span id="spanalert_dist_conf_pass" class="fa fa-exclamation form-control-feedback"></span');
}

function eliminarAlertasDIV_iguales_pass(){

	$("#div_password").removeClass("has-success");
	$("#div_password_conf").removeClass("has-success");
	$("#id_password_conf").removeClass("alert alert-success");
	$("#id_password").removeClass("alert alert-success");
	
	$("#spanalert_iguales_pass").remove();
	$("#spanalert_iguales_conf_pass").remove();

}
	
function eliminarAlertasDIV_distintas_pass(){

	$("#div_password").removeClass("has-danger");
	$("#div_password_conf").removeClass("has-danger");
	$("#id_password_conf").removeClass("alert alert-danger");
	$("#id_password").removeClass("alert alert-danger");


	$("#spanalert_dist_pass").remove();
	$("#spanalert_dist_conf_pass").remove();
}


function boton_registrar(){

	var value_email = $("#id_email_conf").val();
	var mail = $("#id_email").val();

	var value_pass = $("#id_password_conf").val();
	var password = $("#id_password").val();

		if(value_email!=mail || value_pass!=password){
			$('#register').attr("disabled", true);
			console.log("ENTRO EN BOTON");
		}
		else{
			$('#register').attr("disabled", false);
			console.log("NO ENTRO EN BOTON");
		}
}

$("#register").hover(function(){

	let nombre,apellido,email,email_conf,passwor,password_conf;
	nombre = $("#id_nombre").val();
	apellido = $("#id_apellido").val();
	email = $("#id_email").val();
	email_conf = $("#id_email_conf").val();
	password = $("#id_password").val();
	password_conf = $("#id_password_conf").val();
	
	if(nombre==""|apellido==""|email==""|email_conf==""|password==""|password_conf==""){
		$('#register').attr("disabled", true);/*deshabilito el boton REGISTRAR*/
		$("#miboton").prepend('<div id="alerta3" class="alert alert-danger" role="alert"> Error: Rellene todos los campos </div>');

	}
	else
		$("#alerta3").remove();


})

