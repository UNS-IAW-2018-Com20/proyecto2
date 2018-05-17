$(function(){
	/*
	//Acción del submit del formulario de evaluación
	$("#formEvaluacion").submit(function(event){
		event.preventDefault();
		//Se agrega la nota general al formulario
		$('<input>').attr({
    		type: 'hidden',
    		name: 'nota_General',
    		value: $("#nota_general").text()
		}).appendTo('#formEvaluacion');

		evaluar($("#formEvaluacion").serializeArray());
		$(this).unbind('submit').submit();
	});
*/
	cargarEvaluaciones();




});


//Cambio de pantalla a evaluación
function horaDeEvaluar(numeroDeComision,nombreDeComision){

	var data = JSON.parse(window.localStorage.getItem("_datos"));
	//Obtiene la evaluación de la comisión
	var eval_com = getElementArray(data.evaluaciones_comisiones,"comision",numeroDeComision);
	var eval = getElementArray(data.evaluaciones,"evaluacion",eval_com.evaluacion);

	//Obtengo las notas de la escala
	var escala_datos = getElementArray(data.escalas_notas,"escala_notas",eval.escala_notas);
	var escalaNotas = getElementsArray(data.escala_notas_detalles,"escala_notas",eval.escala_notas);

	//Creación del botón para seleccionar la nota correspondiente
	var select = $(document.createElement('select'));
	$.each(escalaNotas,function(){
		select.append("<option>"+this.nota+"</option>");
	});
	select.attr("form-control");
	select.attr("id","criterio"+this.criterio_evaluacion);


	$("#tituloEvaluar").append("<h2>"+eval.nombre+" - "+nombreDeComision+"</h2>");

	//Se crea una lista, se obtienen los miembros de la comisión, y se agregan a la misma
	/*$("#tablaEvaluar tbody").prepend("<tr><td colspan='3'><ul></ul></td></tr>");*/
	var miembros = getElementsArray(data.comisiones_integrantes,"comision",numeroDeComision);

	$.each(miembros,function(){
		var alumno = getElementArray(data.alumnos,"alumno",this.alumno);
		$("#tituloEvaluar").append("<h3>"+alumno.apellido+", "+alumno.nombre+"</h3>");
	});

	//Se obtienen los criterios de la evaluación
	var criterios = getElementsArray(data.criterio_evaluables,"evaluacion",eval.evaluacion);
	var long = criterios.lenght
	$.each(criterios,function(){

		//Creación del botón para seleccionar la nota correspondiente
		var select = $(document.createElement('select'));
		select.attr("name","notas");
		$.each(escalaNotas,function(){
			select.append("<option>"+this.nota+"</option>")
		});
		select.attr("name","criterio"+this.criterio_evaluacion);
		select.attr("id","criterio"+this.criterio_evaluacion);


		select.change(function(){
				//Al cambiar una opción se recalcula la nota
				var cantidadCriterios = Object.keys(criterios).length;
				var i;
				var total=0;
				for (i=0;i<cantidadCriterios;i++){
					total+= parseInt($("#criterio"+criterios[i].criterio_evaluacion).find(":selected").text());
				}
				$("#nota_general").text(total/cantidadCriterios);
		});

		$("#divCriterios").append(this.descripcion+" ");
		$("#divCriterios").append(select);
		$("#divCriterios").append("<br><textarea class='form-control' rows='2' name='obs"+this.criterio_evaluacion+"' form='formEvaluacion' cols='50' placeholder='Observación...'></textarea><br>");


	});

	$("#nota_general").text(1);


	//Se agrega el número de comisión y de evaluación
	$('<input>').attr({
    	type: 'hidden',
    	name: 'nro_Comision',
    	value: numeroDeComision
	}).appendTo('#formEvaluacion');

	$('<input>').attr({
    	type: 'hidden',
    	name: 'nro_Evaluacion',
    	value: eval.evaluacion
	}).appendTo('#formEvaluacion');


	$("#divEvaluacionesGeneral").hide();
	$("#divEvaluarGeneral").show();
}

function evaluar(arreglo_formulario){
	//Se reciben los datos del formulario como un arreglo
	var largo = arreglo_formulario.length;
	//Los últimos cuatro elementos representan las observaciones generales, el número de comisión, el de evaluación y la nota general respectivamente
	var nota_General = arreglo_formulario[largo-1].value;

	var numeroEvaluacion = arreglo_formulario[largo-2].value;

	var numeroComision = arreglo_formulario[largo-3].value;

	var obs = arreglo_formulario[largo-4].value;


	//Al ser evaluado es necesario modificar "evaluaciones_comisiones" y "evaluciones_comisiones_criterios"
	//Primero se modifica la evaluacion_comisiones
	var encontrado = false;
	var i = 0;
	var datos = JSON.parse(window.localStorage.getItem("_datos"));
	while (!encontrado){
		if ((datos.evaluaciones_comisiones[i].comision == numeroComision) && (datos.evaluaciones_comisiones[i].evaluacion == numeroEvaluacion)){
			encontrado = true;
			datos.evaluaciones_comisiones[i].observaciones = obs;
			datos.evaluaciones_comisiones[i].evaluacion_completa = true;
			datos.evaluaciones_comisiones[i].nota = nota_General;
		}
		i++;
	}

	//Luego se modifica evaluaciones_comisiones_criterios
	i = 0;
	j = 0;
	while (j<(largo - 4)){ //Mientras haya criterios
		console.log(datos.evaluaciones_comisiones_criterios);
		if (datos.evaluaciones_comisiones_criterios[i].comision == numeroComision){
			datos.evaluaciones_comisiones_criterios[i].nota = arreglo_formulario[j].value;
			datos.evaluaciones_comisiones_criterios[i].observaciones = arreglo_formulario[j+1].value;
			j+=2;
		}
		i++;
	}

	window.localStorage.setItem("_datos", JSON.stringify(datos));
}

}
