$(function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/alumno/obtenerEvaluaciones",
  })
  .done(function(data){
    $.each(data.evaluaciones_comisiones,function(){
      //Obtengo datos de la evaluación
      $.ajax({
        type: "GET",
        dataType: "json",
        url: "/datos/obtenerEvaluaciones/"+this.evaluacion,
      })
      .done(data=>{
        $("#tablaEvaluaciones tbody").append("<tr><td>"+data.nombre+"</td>"+"<td>"+data.descripcion+"</td><td> "+this.nota+"</td><td><a href='/det"+this._id+"'>Detalles</a></td></tr>");
      });
    });
  });
});
