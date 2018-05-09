$(function(){
  if($(window).width()<=421)
  				$("#divEvaluaciones").attr("class","table-responsive");

	$(window).resize(function() {

  			if($(window).width()<=421)
  				$("#divEvaluaciones").attr("class","table-responsive");
  			else
  				$("#divEvaluaciones").attr("class","table-responsive");

	});
});
