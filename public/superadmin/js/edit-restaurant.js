$(document).ready(function(){
    // get rest id from url
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }

    const restId = data.restId;

    $.ajax({
        url: 'admin/single-restaurant',
        type: 'get',
        data: {
            restId: restId
        },
        success: function(response){
            const restaurant = response.restaurantInfo;

            $('#restaurant_name').append(restaurant[0].Name);
			$('#custom-button').attr('src', '/superadmin/getRestaurantImage?image=' + restaurant[0].Image);

            $('#name').attr('value', restaurant[0].Name);
            $('#location').attr('value', restaurant[0].Location);
            $('#username').attr('value', restaurant[0].Username);
            $('#password').attr('value', restaurant[0].Password);
            $('#phone_number').attr('value', restaurant[0].Phone_number);
            $('#email').attr('value', restaurant[0].Email);
            $('#opens_at').attr('value', restaurant[0].Opens);
            $('#closes_at').attr('value', restaurant[0].Closes);
            const addHereDiv = $('#add_here');

            for(var i = 0; i < restaurant.length; i++){
                const categories = restaurant[i].Food_category;
                const allCategories = categories.split(',');
                for(var j = 0; j < allCategories.length; j++) {
                    const categoryLi = $('<li>');
                        const categoryInput = $('<input>').attr({ 'type':'text', 'value': allCategories[j]}).addClass('added_ingridiant');
                        const categoryInputLink = $('<a>').addClass('remove').attr('href', '#');
                       	const categoryInputXIcon = $('<i>').addClass('fas fa-plus-circle');
                            categoryInputLink.append(categoryInputXIcon);
                    categoryLi.append(categoryInput);
                    categoryLi.append(categoryInputLink);
                    addHereDiv.append(categoryLi);
                }
            }
        }, error: function(error){
            console.log(error);
        }
    })

    $('#save_changes_button').click(function(event){
        const singleRestName = $('#name')
        const singelRestLocation = $('#location');
        const singleRestUsername = $('#username');
        const singleRestPassword = $('#password');
        const singeRestPhNumber = $('#phone_number');
        const singleRestEmail = $('#email');
        const singleRestOpeningHours = $('#opens_at');
        const singleRestClosingHours = $('#closes_at');

        var input = $('#real-file')[0];
        var file = input.files[0];

        let imageName;
        if(file != undefined){
            imageName = file.name;
        }

        var inputs = $( '.added_ingridiant' ),
        ingridients  = [].map.call(inputs, function( input ) {
            return input.value;
        }).join( ',' );

        $.ajax({
            url: 'admin/edit-restaurant',
            type: 'put',
            data: {
                restId: restId,
                restName: singleRestName.val(),
                restLocation: singelRestLocation.val(),
                restusername: singleRestUsername.val(),
                restPass: singleRestPassword.val(),
                restNumb: singeRestPhNumber.val(),
                restEmail: singleRestEmail.val(),
                restOpen: singleRestOpeningHours.val(),
                restClose: singleRestClosingHours.val(),
                category: ingridients,
                image: imageName
            },
            success: function(response){
                if(response.message == 'rest edited'){
                    location.href = 'superadmin/manage-restaurants';
                }
            }
        })
    })
});