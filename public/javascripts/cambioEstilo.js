//Se ejecuta el cargar el documento
$(document).ready(cambiarEstilo());


function cambiarEstilo(){


	if(localStorage.getItem("Estilo")==2)
		$("head").append('<link id="estiloCargado" rel="stylesheet" href="/stylesheets/estiloOpcion.css">');


	$("#bEstilo").click(function(){



 	 var cambioEstilo= localStorage.getItem("Estilo");

 	 if(cambioEstilo==null){

 	 	$("head").append('<link id="estiloCargado" rel="stylesheet" href="/stylesheets/estiloOpcion.css">');
 	 	localStorage.setItem("Estilo",2);
 	 }
 	 else{
	 	 	if(cambioEstilo==2){
	 	 		$("#estiloCargado").remove();
	 	 		localStorage.setItem("Estilo",1);
	 	 	}
	 	 	else{//Si estilo es igual a 1
					$("head").append('<link id="estiloCargado" rel="stylesheet" href="/stylesheets/estiloOpcion.css">');
	 	 			localStorage.setItem("Estilo",2);

	 	 		}

 	 }


	});

}
