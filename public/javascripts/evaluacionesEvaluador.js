$(function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/evaluador/obtenerEvaluaciones",
  })
  .done(function(data){
    console.log(data);
    $.each(data.evaluaciones_comisiones,function(){
      //Obtengo datos de la evaluación
      $.ajax({
        type: "GET",
        dataType: "json",
        url: "/datos/obtenerEvaluaciones/"+this.evaluacion,
      })
      .done(dataEvaluacion=>{
          console.log(dataEvaluacion);
          const from = dataEvaluacion.fecha.split("/");
          const f = new Date(from[2], from[1] - 1, from[0]);
          const actual = new Date();
          //Si la fecha pasó entonces se muestra ya que se puede evaluar
          if (f <= actual){
            $.ajax({
              type: "GET",
              dataType: "json",
              url: "/datos/obtenerComisiones/"+this.comision,
            })
            .done(dataComision=>{
              var nota = (this.evaluacion_completa === true) ? "<td>Nota: "+ this.nota +"</td><td>Observación: "+this.observaciones+"</td>" : "<td> No Evaluado</td><td><a href='/datos/evaluar/"+this._id+"'>Evaluar</a></td>";
              $("#tablaEvaluaciones tbody").append("<tr><td>"+dataEvaluacion.nombre+"</td><td>"+dataComision.nombre+"</td><td>"+dataEvaluacion.fecha+"</td>"+nota+"</tr>");
            });
          }

        });
    });
  });
});
