$(document).ready(function(){
    var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    const carrierId = data.carrierId;

    $.ajax({
        url: 'admin/single-carier',
        data: {
            carrierId: carrierId
        },
        success: function(response){
            const carrier = response.carrier;

            $('#carrier_main_name').append(carrier[0].Firstname + ' ' + carrier[0].Lastname);

            $('#custom-button').attr('src', '/superadmin/getCarrierImage?image=' + carrier[0].Image)

            $('#firstname').val(carrier[0].Firstname);
            $('#lastname').val(carrier[0].Lastname);
            $('#idNumb').val(carrier[0].Identification_number);
            $('#email').val(carrier[0].Email);
            $('#username').val(carrier[0].Username);
            $('#pass').val(carrier[0].Password);
            $('#hrAvailable').val(carrier[0].Hours_available);
            $('#phNumber').val(carrier[0].Phone_number);

            const addHereDiv = $('#add_here');

			for(var i = 0; i < carrier.length; i++){
                const ingridients = carrier[i].City;
                const allIngridients = ingridients.split(',');
                for(var j = 0; j < allIngridients.length; j++) {
                    const categoryLi = $('<li>');
                           	const categoryInput = $('<input>').addClass('added_ingridiant').attr({ 'type':'text', 'value':allIngridients[j] });
                            const categoryInputLink = $('<a>').addClass('remove').attr('href', '#');
                            const categoryInputXIcon = $('<i>').addClass('fas fa-plus-circle');
                            categoryInputLink.append(categoryInputXIcon);
                    categoryLi.append(categoryInput);
                    categoryLi.append(categoryInputLink);
                    addHereDiv.append(categoryLi);
                }
            }
        }
    });


    $('#save_carrier_btn').click(function(event){
        // event.preventDefault();

        const firstname = $('#firstname');
        const lastname = $('#lastname');
        const idNumb = $('#idNumb');
        const email = $('#email');
        const username = $('#username');
        const pass = $('#pass');
        const hoursAvailable = $('#hrAvailable');
        const phoneNumber = $('#phNumber');

        var inputs = $( '.added_ingridiant' ),
        ingridients  = [].map.call(inputs, function( input ) {
            return input.value;
        }).join( ',' );

        $.ajax({
            url: 'admin/edit-carier',
            method: 'put',
            data: {
                carrierId: carrierId,
                firstname: firstname.val(),
                lastname: lastname.val(),
                idNumber: idNumb.val(),
                email: email.val(),
                username: username.val(),
                password: pass.val(),
                hoursAvailable: hoursAvailable.val(),
                phNumber: phoneNumber.val(),
                locations: ingridients
            },
            success: function(response){
                // console.log(response);
                if(response.message == 'carrier edited'){
                    location.href = 'superadmin/manage-carriers'
                }
            }
        })     
    })
});