$(document).ready(function(){
	$('#add_restaurant').click(function(event){
        // event.preventDefault();
        const nameInput = $('#name');
        const locationInput = $('#location');
        const usernameInput = $('#username');
        const passwordInput = $('#password');
        const phoneNumberUnput = $('#phone_number');
        const emailInput = $('#email');
        const opensAtInput = $('#opens_at');
        const closesAt = $('#closes_at');

        var input = $('#real-file')[0];
        var file = input.files[0];
        var imageName = file.name;
        console.log(file.name);

        var inputs = document.getElementsByClassName( 'added_ingridiant' ),
        ingridients  = [].map.call(inputs, function( input ) {
            return input.value;
        }).join( ',' );

        const data = {
            name: nameInput.val(),
            location: locationInput.val(),
            username: usernameInput.val(),
            password: passwordInput.val(),
            phoneNumber: phoneNumberUnput.val(),
            openingHour: opensAtInput.val(),
            closingHour: closesAt.val(),
            email: emailInput.val(),
            foodCategory: ingridients,
            imageName: imageName
        };

        const options = {
            method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(data)
        }

        fetch('/admin/new-restaurant   ', options)
            .then((response) => { return response.json() })
            .then((myJson) => { console.log(myJson) })
        })
});