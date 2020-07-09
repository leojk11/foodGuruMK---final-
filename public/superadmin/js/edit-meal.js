$(document).ready(function(){   
	// get meal info
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }

    const mealId = data.mealid;

    $.ajax({
        url: 'admin/single-meal',
        method: 'get',
        data: {
            mealId: mealId
        },
        success: function(response){
            const meal = response.singleMeal;

            $('#main_meal_name').append(meal[0].Name) 

            $('#name').attr({ 'value': meal[0].Name });
            $('#price').attr({ 'value': meal[0].Price });
            $('#description').html('').append(meal[0].Description);
            $('#category').attr({ 'value': meal[0].Food_category });
            $('#restaurant').attr({ 'value': meal[0].Restaurant_name });
            $('#calories').attr({ 'value': meal[0].Calories });
            $('#proteins').attr({ 'value': meal[0].Proteins });
            $('#fat').attr({ 'value': meal[0].Fat });
            $('#carbohydrates').attr({ 'value': meal[0].Carbohydrates });
            $('#delivery_time').attr({ 'value': meal[0].Delivery_time });
            $('#delivery_price').attr({ 'value': meal[0].Delivery_price });
            $('#custom-button').attr('src', '/superadmin/getMealImage?image=' + meal[0].Image);
            // $('#select_cat').append(meal[0].Food_category);
            const option = $('<option>').attr({ 'value':meal[0].Food_category }).append(meal[0].Food_category);
            $('#select_cat').append(option);
            const restOption = $('<option>').attr({ 'value':meal[0].Restaurant_name }).append(meal[0].Restaurant_name);
            $('#select_rest').append(restOption);


            const addHereDiv = $('#add_here');

			for(var i = 0; i < meal.length; i++){
                const ingridients = meal[i].Ingridients;
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


    // save meal edit
    $('#save_changes_button').click(function(event){
        event.preventDefault();
        // const mealId = sessionStorage.getItem('mealId');
        // get meal info
        var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }

        const mealId = data.mealid;

        const singleMealName = $('#name');
        const singleMealPrice = $('#price');
        const singleMealDesc = $('#description');
        const singleMealCat = $('#select_cat');
        const singleMealRest = $('#select_rest');
        const singleMealCal = $('#calories');
        const singleMealPro = $('#proteins');
        const singleMealFat = $('#fat');
        const singleMealCarbs = $('#carbohydrates');
        const singleMealDelTime = $('#delivery_time');
        const singleMealDelPrice = $('#delivery_price');

        
        var input = $('#real-file')[0];
        var file = input.files[0];
        // console.log(file)
        
        let imageName;
        if(file != undefined){
            imageName = file.name;
        }
        // console.log(file);

        var inputs = $( '.added_ingridiant' ),
        ingridients  = [].map.call(inputs, function( input ) {
            return input.value;
        }).join( ',' );

        $.ajax({
            url: 'admin/edit-meal',
            method: 'put',
            data: {
                mealId: mealId,
                mealName: singleMealName.val(),
                mealPrice: singleMealPrice.val(),
                mealDesc: singleMealDesc.val(),
                mealCat: singleMealCat.val(),
                mealRest: singleMealRest.val(),
                mealCal: singleMealCal.val(),
                mealPro: singleMealPro.val(),
                mealFats: singleMealFat.val(),
                mealCarbs: singleMealCarbs.val(),
                mealDelTime: singleMealDelTime.val(),
                mealDelPrice: singleMealDelPrice.val(),
                image: imageName,
                ingridients: ingridients
            },
            success: function(response){
                if(response.message == 'meal edited'){
                    location.href = 'superadmin/manage-meals';
                }
            },
            error: function(error){
                alert(error);
            }

        })
    })
});