//Profile info
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        const restaurantName = myProfile.singleRestInfo[0].restName
        const restaurantLogoName = myProfile.singleRestInfo[0].restLogo
        const restLogo = $('#rest-logo').attr('src', '/restaurants/rest-logo?image=' +
            restaurantLogoName);
        $('#rest_name').text(restaurantName)
    }
})
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        const restaurantName = myProfile.singleRestInfo[0].restName
        const restaurantLogoName = myProfile.singleRestInfo[0].restLogo
        $('#rest_name-mob').text(restaurantName)
    }
})
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        const restaurantName = myProfile.singleRestInfo[0].restName
        const restaurantLogoName = myProfile.singleRestInfo[0].restLogo
        const restLogo = $('#rest-logo-mob').attr('src', '/restaurants/rest-logo?image=' +
            restaurantLogoName);
        $('#rest_name-mob').text(restaurantName)
    }
})
$(".mobile-btn").click(function () {
    $(".mobile-menu").slideToggle();
    $(".mobile-menu").css("background-color", "#4a4a4a")
});
$.ajax({
    url: 'restaurant/my-meals',
    success: function(mealDetails){
        
        const meals = mealDetails.mealsDetailsForSpecificRestaurant
        for(i = 0; i < meals.length; i++) {
            let mealDiv = $('<div>').attr("class", "meal")
            $('.meals').append(mealDiv)
            let image = $('<img>').attr('src', '/superadmin/getMealImage?image=' + meals[i].Image);
            mealDiv.append(image)
            let nameDescriptionDiv = $('<div>').attr("class", "name-desc")
            mealDiv.append(nameDescriptionDiv);
            let name = $('<h1>').text(meals[i].Name)
            let description = $('<p>').html(meals[i].Description)
            nameDescriptionDiv.css('width', '100%')
            nameDescriptionDiv.append(name)
            nameDescriptionDiv.append(description)
            let ingradientsDiv = $('<div>').attr("class", "ingradients")
            nameDescriptionDiv.append(ingradientsDiv)
            let ingArr = meals[i].Ingridients.split(',')
            ingArr.forEach((e, i) => {
                let ingradientDiv = $('<div>').attr("class", "ingradient").text(ingArr[i])
                ingradientsDiv.append(ingradientDiv)
            });
            let categoryPriceDiv = $('<div>').attr("class", "category-price")
            mealDiv.append(categoryPriceDiv)
            let categoryDiv = $('<div>').attr("class", "category").text(meals[i].Food_category)
            let priceDiv = $('<div>').attr("class", "price").text(meals[i].Price)
            categoryPriceDiv.append(categoryDiv)
            categoryPriceDiv.append(priceDiv)
            let canceledDiv= $('<div>').attr("class", "canceled")
            mealDiv.append(canceledDiv)
            let sliderSwitchDiv = $('<div>').attr("class", "slider_switch")
            canceledDiv.append(sliderSwitchDiv)
            let switchLabel = $('<label>').attr("class", "switch")
            sliderSwitchDiv.append(switchLabel)
            let inputCheckbox = $('<input>').attr('type', 'checkbox').val(meals[i].Status)
            inputCheckbox.attr('class', 'status').attr('id', meals[i].ID)
            let sliderRoundSpan = $('<span>').attr('class', 'slider round')
            
            switchLabel.append(inputCheckbox)
            switchLabel.append(sliderRoundSpan)

            let mealStatus = $('<span>')
            canceledDiv.append(mealStatus)
            
            if(meals[i].Status == 'Paused'){
                $('.status')[i].checked = true;
                mealStatus.text('Paused')
            }else if(meals[i].Status == 'Active'){
                $('.status')[i].checked = false;
                mealStatus.text('Active')
            }                
        };
            $('.status').click((e) => {
                const data = {}
                    data.mealId = e.target.id;
                    if(e.target.value == 'Paused'){
                        data.status = 'Active'
                    }else if(e.target.value == 'Active'){
                        data.status = 'Paused'
                    }
                    $.ajax({
                        url: 'restaurant/edit-meal-status',
                        method: 'put',
                        data: data,
                        success: function(){
                            location.reload(true);
                        }
                    })
                })
    }
})
$.ajax({
    url: 'restaurant/my-active-meals',
    success: function(activeMeals){
        $('#active').text(activeMeals)
    }
})
$.ajax({
    url: 'restaurant/my-paused-meals',
    success: function(pausedMeals){
        $('#paused').text(pausedMeals)
    }
})
$('#search-meal').click((e) => {
    const inputValue = $('input').val()

    $.ajax({
        url: 'restaurant/my-searched-meals?inputValue=' + inputValue,
        success: function(meals){
            $('.meals').html('')
            for(i = 0; i < meals.length; i++) {
            let mealDiv = $('<div>').attr("class", "meal")
            $('.meals').append(mealDiv)
            let image = $('<img>').attr('src', '/superadmin/getMealImage?image=' + meals[i].Image);
            mealDiv.append(image)
            let nameDescriptionDiv = $('<div>').attr("class", "name-desc")
            mealDiv.append(nameDescriptionDiv);
            let name = $('<h1>').text(meals[i].Name)
            let description = $('<p>').html(meals[i].Description)
            nameDescriptionDiv.css('width', '425px')
            nameDescriptionDiv.append(name)
            nameDescriptionDiv.append(description)
            let ingradientsDiv = $('<div>').attr("class", "ingradients")
            nameDescriptionDiv.append(ingradientsDiv)
            let ingArr = meals[i].Ingridients.split(',')
            ingArr.forEach((e, i) => {
                let ingradientDiv = $('<div>').attr("class", "ingradient").text(ingArr[i])
                ingradientsDiv.append(ingradientDiv)
            });
            let categoryPriceDiv = $('<div>').attr("class", "category-price")
            mealDiv.append(categoryPriceDiv)
            let categoryDiv = $('<div>').attr("class", "category").text(meals[i].Food_category)
            let priceDiv = $('<div>').attr("class", "price").text(meals[i].Price)
            categoryPriceDiv.append(categoryDiv)
            categoryPriceDiv.append(priceDiv)
            let canceledDiv= $('<div>').attr("class", "canceled")
            mealDiv.append(canceledDiv)
            let sliderSwitchDiv = $('<div>').attr("class", "slider_switch")
            canceledDiv.append(sliderSwitchDiv)
            let switchLabel = $('<label>').attr("class", "switch")
            sliderSwitchDiv.append(switchLabel)
            let inputCheckbox = $('<input>').attr('type', 'checkbox').val(meals[i].Status)
            inputCheckbox.attr('class', 'status').attr('id', meals[i].ID)
            let sliderRoundSpan = $('<span>').attr('class', 'slider round')
            
            switchLabel.append(inputCheckbox)
            switchLabel.append(sliderRoundSpan)

            let mealStatus = $('<span>')
            canceledDiv.append(mealStatus)
            
            if(meals[i].Status == 'Paused'){
                $('.status')[i].checked = true;
                mealStatus.text('Paused')
            }else if(meals[i].Status == 'Active'){
                $('.status')[i].checked = false;
                mealStatus.text('Active')
            }                   
        };
        }
    })
})