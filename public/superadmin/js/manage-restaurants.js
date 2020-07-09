$(document).ready(function(){
    const allRestaurantsDiv = $('#all_rest');

    $.ajax({
        url: 'admin/restaurants',
        method: 'get',
        success: function(response){
            const allRestaurants = response.restaurants;

            for(var i = 0; i < allRestaurants.length; i++) {
                const bigRestSingleDiv = $('<div>').addClass('bigmeal_single');

                    const singleRestImageDiv = $('<div>').addClass('singlemeal_img');
                        const singleRestImage = $('<img>').attr({ 'src':'/superadmin/getRestaurantImage?image=' + allRestaurants[i].Image });
                        singleRestImageDiv.append(singleRestImage);
                    bigRestSingleDiv.append(singleRestImageDiv);

                    const tripleInfoBoxDiv = $('<div>').addClass('tripleinfobox');
                        const singleMealTitleDiv = $('<div>').addClass('single_mealtitle').append(allRestaurants[i].Name);
                    tripleInfoBoxDiv.append(singleMealTitleDiv);

                        const restLocationDiv = $('<div>').addClass('single_mealdeesc');
                            const restLocationLabel = $('<span>').addClass('smalliconlabel');
                                const locationIconImg = $('<img>').attr({ 'src':'superadmin/pinIcon' });
                            restLocationLabel.append(locationIconImg);
                            restLocationLabel.append(allRestaurants[i].Location);
                        restLocationDiv.append(restLocationLabel);
                    tripleInfoBoxDiv.append(restLocationDiv);

                        const foodCategories = allRestaurants[i].Food_category;
                        const allFoodCategories = foodCategories.split(',');

                        const foodCategoryDiv = $('<div>').addClass('single_ingredients');
                        for(var j = 0; j < allFoodCategories.length; j++) {
                            const singleCategorySpan = $('<span>').addClass('single_ing').append(allFoodCategories[j]);
                            foodCategoryDiv.append(singleCategorySpan);
                            tripleInfoBoxDiv.append(foodCategoryDiv);
                        };

                        const workingHoursDiv = $('<div>').addClass('byrestaurantlabel');
                            const workingHoursLabel = $('<span>').addClass('smalliconlabel');
                                const workingHoursIcon = $('<img>').attr({ 'src':'superadmin/clockIcon' });
                            workingHoursLabel.append(workingHoursIcon);
                        workingHoursDiv.append(workingHoursLabel);
                        workingHoursDiv.append(allRestaurants[i].Opens + '-' + allRestaurants[i].Closes);
                    tripleInfoBoxDiv.append(workingHoursDiv);

                        const switchButtonWrapper = $('<div>').addClass('cat_position');
                            const statusLabelDiv = $('<div>').addClass('mid_label').append(allRestaurants[i].Status.toUpperCase());
                            const buttonWrapperDiv = $('<div>').addClass('pos_num');
                                const sliderSwitchDiv = $('<div>').addClass('slider_switch');
                                    const switchDiv = $('<label>').addClass('switch');
                                    let checkBoxInput;
                                    if(allRestaurants[i].Status == 'Offline'){
                                        checkBoxInput = $('<input>').addClass('slider' + allRestaurants[i].ID).attr({ 'type':'checkBox', 'onChange':'valueChanged(' + allRestaurants[i].ID +  ')', 'value':'1' }).prop({ 'checked':'true' });
                                        statusLabelDiv.css({ 'color':'red' })
                                    } else {
                                        checkBoxInput = $('<input>').addClass('slider' + allRestaurants[i].ID).attr({ 'type':'checkBox', 'onChange':'valueChanged(' + allRestaurants[i].ID +  ')', 'value':'1' });
                                    }
                                    switchDiv.append(checkBoxInput);
                                        const sliderRoundSpan = $('<div>').addClass('slider round').attr({ 'id': allRestaurants[i].ID });
                                    switchDiv.append(sliderRoundSpan);
                                sliderSwitchDiv.append(switchDiv);
                            buttonWrapperDiv.append(sliderSwitchDiv);
                        switchButtonWrapper.append(buttonWrapperDiv);
                        switchButtonWrapper.append(statusLabelDiv);

                        bigRestSingleDiv.append(tripleInfoBoxDiv)

                        bigRestSingleDiv.append(switchButtonWrapper);

                    const removeAndEditButtonsWrapperDiv = $('<div>').addClass('cat_stats');
                    const editButtonWrapperDiv = $('<div>').addClass('cat_edits');
                
                    const editButtonLink = $('<a>').addClass('edit_button').attr({ 'id': allRestaurants[i].ID });
                
                    const editButtonDiv = $('<div>').addClass('cat_icon'); 
                    const editButtonIcon = $('<img>').attr({ 'src':'superadmin/icon/editIcon' });
                    editButtonDiv.append(editButtonIcon);
                    editButtonLink.append(editButtonDiv);
                    editButtonWrapperDiv.append(editButtonLink);
                
                    const removeButtonWrapperDiv = $('<div>').addClass('cat_edits remove_button').attr({ 'id': allRestaurants[i].ID });
                    const removeButtonDiv = $('<div>').addClass('cat_icon');
                    const removeButtonicon = $('<img>').attr({ 'src':'superadmin/icon/binIcon' })
                    removeButtonDiv.append(removeButtonicon);
                    removeButtonWrapperDiv.append(removeButtonDiv);
                    removeAndEditButtonsWrapperDiv.append(editButtonWrapperDiv);
                    removeAndEditButtonsWrapperDiv.append(removeButtonWrapperDiv);
                    bigRestSingleDiv.append(removeAndEditButtonsWrapperDiv);
                
                allRestaurantsDiv.append(bigRestSingleDiv);
            }

            $('.remove_button').click(function(event){
                event.preventDefault()
                var restId = this.id;

                $.ajax({
                    url: 'admin/delete-restaurant',
                    method: 'delete',
                    data: {
                        restId: restId
                    },
                    success: function(response){
                        if(response.message == 'restaurant deleted')  {
                            location.reload();
                        }
                    }, error: function(error){
                        console.log(error);
                    }
                })
            });

            $('.edit_button').click(function(event){
                event.preventDefault()
                var restId = this.id;
                // console.log(restId)

                var url = 'superadmin/edit-restaurant?restId=' + restId;
				window.location.href = url;
            })

            $('.search_box').on('keypress', async e => {
                if(e.which == 13){
                    e.preventDefault();
                    const restInfo = event.target.value;

                    if(restInfo != ''){
                        $.ajax({
                            url: 'admin/search-restaurants',
                            method: 'get',
                            data: {
                                restInfo: restInfo
                            },
                            success: function(response){
                                const allRestaurants = response.restaurants;

                                $('.bigmeal_single').css({ 'display':'none' });

                                for(var i = 0; i < allRestaurants.length; i++) {
                                    const bigRestSingleDiv = $('<div>').addClass('bigmeal_single');

                                        const singleRestImageDiv = $('<div>').addClass('singlemeal_img');
                                            const singleRestImage = $('<img>').attr({ 'src':'/superadmin/getRestaurantImage?image=' + allRestaurants[i].Image });
                                            singleRestImageDiv.append(singleRestImage);
                                        bigRestSingleDiv.append(singleRestImageDiv);

                                        const tripleInfoBoxDiv = $('<div>').addClass('tripleinfobox');
                                            const singleMealTitleDiv = $('<div>').addClass('single_mealtitle').append(allRestaurants[i].Name);
                                        tripleInfoBoxDiv.append(singleMealTitleDiv);

                                            const restLocationDiv = $('<div>').addClass('single_mealdeesc');
                                                const restLocationLabel = $('<span>').addClass('smalliconlabel');
                                                    const locationIconImg = $('<img>').attr({ 'src':'superadmin/pinIcon' });
                                                restLocationLabel.append(locationIconImg);
                                                restLocationLabel.append(allRestaurants[i].Location);
                                            restLocationDiv.append(restLocationLabel);
                                        tripleInfoBoxDiv.append(restLocationDiv);

                                            const foodCategories = allRestaurants[i].Food_category;
                                            const allFoodCategories = foodCategories.split(',');

                                            const foodCategoryDiv = $('<div>').addClass('single_ingredients');
                                            for(var j = 0; j < allFoodCategories.length; j++) {
                                                const singleCategorySpan = $('<span>').addClass('single_ing').append(allFoodCategories[j]);
                                                foodCategoryDiv.append(singleCategorySpan);
                                                tripleInfoBoxDiv.append(foodCategoryDiv);
                                            };

                                            const workingHoursDiv = $('<div>').addClass('byrestaurantlabel');
                                                const workingHoursLabel = $('<span>').addClass('smalliconlabel');
                                                    const workingHoursIcon = $('<img>').attr({ 'src':'superadmin/clockIcon' });
                                                workingHoursLabel.append(workingHoursIcon);
                                            workingHoursDiv.append(workingHoursLabel);
                                            workingHoursDiv.append(allRestaurants[i].Opens + '-' + allRestaurants[i].Closes);
                                        tripleInfoBoxDiv.append(workingHoursDiv);

                                        const switchButtonWrapper = $('<div>').addClass('cat_position');
                                            const statusLabelDiv = $('<div>').addClass('mid_label').append(allRestaurants[i].Status.toUpperCase());
                                            const buttonWrapperDiv = $('<div>').addClass('pos_num');
                                                const sliderSwitchDiv = $('<div>').addClass('slider_switch');
                                                    const switchDiv = $('<label>').addClass('switch');
                                                    let checkBoxInput;
                                                    if(allRestaurants[i].Status == 'Offline'){
                                                        checkBoxInput = $('<input>').addClass('slider' + allRestaurants[i].ID).attr({ 'type':'checkBox', 'onChange':'valueChanged(' + allRestaurants[i].ID +  ')', 'value':'1' }).prop({ 'checked':'true' });
                                                        statusLabelDiv.css({ 'color':'red' })
                                                    } else {
                                                        checkBoxInput = $('<input>').addClass('slider' + allRestaurants[i].ID).attr({ 'type':'checkBox', 'onChange':'valueChanged(' + allRestaurants[i].ID +  ')', 'value':'1' });
                                                    }
                                                    switchDiv.append(checkBoxInput);
                                                        const sliderRoundSpan = $('<div>').addClass('slider round').attr({ 'id': allRestaurants[i].ID });
                                                    switchDiv.append(sliderRoundSpan);
                                                sliderSwitchDiv.append(switchDiv);
                                            buttonWrapperDiv.append(sliderSwitchDiv);
                                        switchButtonWrapper.append(buttonWrapperDiv);
                                        switchButtonWrapper.append(statusLabelDiv);
                
                                        bigRestSingleDiv.append(tripleInfoBoxDiv)
                
                                        bigRestSingleDiv.append(switchButtonWrapper);

                                        const removeAndEditButtonsWrapperDiv = $('<div>').addClass('cat_stats');
                                        const editButtonWrapperDiv = $('<div>').addClass('cat_edits');
                                    
                                        const editButtonLink = $('<a>').addClass('edit_button').attr({ 'id': allRestaurants[i].ID });
                                    
                                        const editButtonDiv = $('<div>').addClass('cat_icon'); 
                                        const editButtonIcon = $('<img>').attr({ 'src':'superadmin/icon/editIcon' });
                                        editButtonDiv.append(editButtonIcon);
                                        editButtonLink.append(editButtonDiv);
                                        editButtonWrapperDiv.append(editButtonLink);
                                    
                                        const removeButtonWrapperDiv = $('<div>').addClass('cat_edits remove_button').attr({ 'id': allRestaurants[i].ID });
                                        const removeButtonDiv = $('<div>').addClass('cat_icon');
                                        const removeButtonicon = $('<img>').attr({ 'src':'superadmin/icon/binIcon' })
                                        removeButtonDiv.append(removeButtonicon);
                                        removeButtonWrapperDiv.append(removeButtonDiv);
                                        removeAndEditButtonsWrapperDiv.append(editButtonWrapperDiv);
                                        removeAndEditButtonsWrapperDiv.append(removeButtonWrapperDiv);
                                        bigRestSingleDiv.append(removeAndEditButtonsWrapperDiv);
                                    
                                    allRestaurantsDiv.append(bigRestSingleDiv);
                                }
                            }
                        })
                    } else {
                        location.reload();
                    }
                }
            })
        }
    })
})