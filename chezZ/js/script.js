$(function(){

	//month = 12 --> January; month is 0 based
	var note = $('#note'),
		ts = new Date(2015, 12, 25);

	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";

			if((new Date()) > ts){
				message += "It's finally here!";
				note.html(message);
				return;
			}
			
			message += days + " day" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
			message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";

				message += "left until release!";
			

			note.html(message);
		}
	});

});