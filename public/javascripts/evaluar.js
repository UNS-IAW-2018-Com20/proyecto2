//Acción del click en el botón de volver de la pantalla de evaluación
$("#backButton").click(function(){
  window.location.href = "/evaluador";
});

$("#formEvaluacion").submit(function(event){
  window.location.href = "/evaluador/evaluar/enviar/"
});


$(document).ready(function() {

  $(".criterioSelect").change(function(){
    console.log("dale");
    let i;
    let total = 0;
    //cantidad de criterios
    let cantidadCriterios = $("#cantidadCriterios").val();
    console.log(cantidadCriterios);

    for (i=0;i<cantidadCriterios;i++){
      console.log($("#criterio"+i).find(":selected").val());
      total+= parseInt($("#criterio"+i).find(":selected").val());
    }
    console.log(total);
    $("#nota_general").text(total/cantidadCriterios);
  });
});
