$('#bLogout').click(function(){
  window.location.href = '/logout';
});

$('#bEstilo').click(function(){
  //Primero cambia el css

  if($("#estiloCambiado").length > 0){
    //Esta cargado el estilo oscuro
    $("#estiloCambiado").remove();
  } else {
    //Está cargado el estilo claro, se agrega el oscuro por encima
    $("head").append('<link id="estiloCambiado" rel="stylesheet" href="/stylesheets/estiloOpcion.css">');
  }

  //Llamada asincrónica para modificar en el servidor
  $.ajax({
    url: "/cambioEstilo",
  });
})
