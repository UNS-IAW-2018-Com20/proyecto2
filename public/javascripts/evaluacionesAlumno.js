$(".btnEvaluaciones").click(function(){
  window.location.href = "/alumno/mostrarEvaluacion?evaluacionComision="+this.id;
});

$("#btnVolver").click(function(){
  window.location.href = "/alumno";
});
