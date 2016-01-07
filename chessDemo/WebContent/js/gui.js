$(function(){
	$("#fenIn")[0].value = START_FEN;
});

$("#SetFen").click(function(){
	var fenStr = $("#fenIn").val();
	ParseFen(fenStr);
	PrintBoard();
});