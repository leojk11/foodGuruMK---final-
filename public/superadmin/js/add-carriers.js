$(document).ready(function(){
    $('#add_carrier_btn').click(function(event){ 
        const firstnameInput = $('#firstname');
        const lastnameInput = $('#lastname');
        const idNumbInput = $('#id_numb');
        const emailInput = $('#email');
        const usernameInput = $('#username');
        const passwordInput = $('#password');
        const phNumberInput = $('#ph_number');
        const cityinput = $('#city');
        const hoursAvailableInput = $('#hours_available');

        var input = $('#real-file')[0];
        var file = input.files[0];
        var imageName = file.name;

        var inputs = $('.added_ingridiant'),
        ingridients  = [].map.call(inputs, function( input ) {
            return input.value;
        }).join( ',' );

        // const data = {
        //     firstname: firstnameInput.val(),
        //     lastname: lastnameInput.val(),
        //     idNumb: idNumbInput.val(),
        //     email: emailInput.val(),
        //     username: usernameInput.val(),
        //     password: passwordInput.val(),
        //     phNumber: phNumberInput.val(),
        //     hoursAvailable: hoursAvailableInput.val(),
        //     locations: ingridients,
        //     imageName: imageName
        // };

        // const options = { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(data) };

        // fetch('/admin/new-carier', options)
        //     .then((response) => { return response.json() })
        //     .then((myJson) => { 
        //         // console.log(myJson); 
        //         // location.href = 'superadmin/manage-carriers'
        //     })
        $.ajax({
            url: 'admin/new-carrier',
            method: 'post',
            data: {
                firstname: firstnameInput.val(),
                lastname: lastnameInput.val(),
                idNumb: idNumbInput.val(),
                email: emailInput.val(),
                username: usernameInput.val(),
                password: passwordInput.val(),
                phNumber: phNumberInput.val(),
                hoursAvailable: hoursAvailableInput.val(),
                locations: ingridients,
                imageName: imageName
            },
            success: function(response){
                console.log(response);
            }
        })
    })
});