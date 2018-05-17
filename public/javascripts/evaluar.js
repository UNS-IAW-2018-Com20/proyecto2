//Acción del click en el botón de volver de la pantalla de evaluación
$("#backButton").click(function(){
  window.location.href = "/evaluador";
});

$("#formEvaluacion").submit(function(event){
  event.preventDefault();
  //Se agrega la nota general al formulario
  $('<input>').attr({
      type: 'hidden',
      name: 'nota_General',
      value: $("#nota_general").text()
  }).appendTo('#formEvaluacion');

  $(this).unbind('submit').submit();
});


$(document).ready(function() {

  $(".criterioSelect").change(function(){
    let i;
    let total = 0;
    let cantidadCriterios = 3;

    for (i=0;i<cantidadCriterios;i++){
      total+= parseInt($("#criterio"+i).find(":selected").text());
    }

    $("#nota_general").text(total/cantidadCriterios);

  });
});
