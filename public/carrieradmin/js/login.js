$(document).ready(function(){
	// carrier login, request to server
	const username = $('#username');
	const password = $('#password');
	const loginForm = $('form');

	loginReq();

	function loginReq(){
		$('#logbtn').click(function(event){
			event.preventDefault();
			
			$.ajax({
				url: 'carrier/login',
				method: 'post',
				data: {
					username: username.val(),
	            	password: password.val()
				},
				success: function(response){
					if(response.message == 'logged in') {
	                    window.location.href = '/carrier/home'
	                } else {
	                    const loginErrorDiv = $('<div>').addClass('error_div').append(response.message);
	                    loginForm.append(loginErrorDiv);

	                    $('.error_div').fadeOut(8000, function(){ $(this).remove();});
	                };
				}
			})
    	})
	}

});