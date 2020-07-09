$(document).ready(function(){
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const loginForm = document.querySelector('form');
    loginReq();
    function loginReq() {
        $('#logbtn').click(function(event){
            event.preventDefault();
            $.ajax({
				url: 'restaurant/login',
				method: 'post',
				data: {
					username: username.value,
	            	password: password.value
				},
				success: function(myJson){
					if(myJson.message == 'logged in') {
                        window.location.href = '/restaurants/dashboard'
                    } else {
                        console.log(myJson.message);
                        const loginErrorDiv = document.createElement('div');
                            loginErrorDiv.classList.add('error_div');
                            loginErrorDiv.append(myJson.message);
                        loginForm.append(loginErrorDiv);

                        $('.error_div').fadeOut(8000, function(){ $(this).remove();});
                    }
				}
			})
        })  
    }
})