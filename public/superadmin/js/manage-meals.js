$(document).ready(function(){
	const allMealsDiv = $('#all_meals');

	fetch('/admin/meals')
		.then((response) => { return response.json() })
		.then((meals) => {
			const allMeals = meals.meals;

			for(var i = 0; i < allMeals.length; i++) {
				const singleMeal = $('<div>').addClass('bigmeal_single');
				const imageDiv = $('<div>').addClass('singlemeal_img');
					const image = $('<img>').attr({ 'src': '/superadmin/getMealImage?image=' + allMeals[i].Image });
				imageDiv.append(image);
				singleMeal.append(imageDiv);

				const infoBoxDiv = $('<div>').addClass('tripleinfobox');
					const singleMealTitle = $('<div>').addClass('single_mealtitle').append(allMeals[i].Name);
						infoBoxDiv.append(singleMealTitle);
					const singleMealDescDiv = $('<div>').addClass('single_mealdesc').append(allMeals[i].Description);
						infoBoxDiv.append(singleMealDescDiv);

					const ingridientsDiv = $('<div>').addClass('single_ingredients');
					const ingridients = allMeals[i].Ingridients;
					const allIgridients = ingridients.split(',');
						for(var j = 0; j < allIgridients.length; j++) {
							const singleIngSpan = $('<span>').addClass('single_ing').append(allIgridients[j]);
								ingridientsDiv.append(singleIngSpan);
							infoBoxDiv.append(ingridientsDiv)
						}
					const restaurantNameDiv = $('<div>').addClass('byrestaurantlabel').append('By' + ' ' + allMeals[i].Restaurant_name);
						infoBoxDiv.append(restaurantNameDiv);
				singleMeal.append(infoBoxDiv);

				const foodCategoryDiv = $('<div>').addClass('singlecatlabel').append(allMeals[i].Food_category);
					singleMeal.append(foodCategoryDiv);

				const priceDiv = $('<div>').addClass('singleprice').append(allMeals[i].Price + 'ДЕН');
					singleMeal.append(priceDiv);

				const removeAndEditButtonsWrapperDiv = $('<div>').addClass('cat_stats');
				const editButtonWrapperDiv = $('<div>').addClass('cat_edits');
					const editButtonLink = $('<a>').addClass('edit_button').attr({ 'href': 'superadmin/edit-meal', 'id': allMeals[i].ID });
						const editButtonDiv = $('<div>').addClass('cat_icon');
							const editButtonIcon = $('<img>').attr({ 'src': 'superadmin/icon/editIcon' });
						editButtonDiv.append(editButtonIcon);
					editButtonLink.append(editButtonDiv);
					editButtonWrapperDiv.append(editButtonLink);

				const removeButtonWrapperDiv = $('<div>').addClass('cat_edits remove_button').attr({ 'id': allMeals[i].ID });
					const removeButtonDiv = $('<div>').addClass('cat_icon');
						const removeButtonIcon = $('<img>').attr({ 'src':'superadmin/icon/binIcon' });
					removeButtonDiv.append(removeButtonIcon);
					removeButtonWrapperDiv.append(removeButtonDiv);
				removeAndEditButtonsWrapperDiv.append(editButtonWrapperDiv);
				removeAndEditButtonsWrapperDiv.append(removeButtonWrapperDiv);
				singleMeal.append(removeAndEditButtonsWrapperDiv);

				allMealsDiv.append(singleMeal);

			}

			$('.edit_button').click(function(event){
				event.preventDefault()
				var mealId = this.id;	
				var url = 'superadmin/edit-meal?mealid=' + mealId;
				window.location.href = url;
			})

			$('.remove_button').click(function(event){
				event.preventDefault();
				var mealId = this.id;

				$.ajax({
					url: 'admin/delete-meal?mealId=' + mealId,
					method: 'delete',
					success: function(response){
						if(response.message == 'meal deleted'){
							location.reload();
						}
					}, error: function(error){
						console.log(error);
					}
				});
			})

			$(".search_box").on('keypress', async e =>{
                if(e.which == 13){
                    e.preventDefault();
                    // console.log(event.target.value)

					const mealInfo = event.target.value;
					
					if(mealInfo != ''){

						$.ajax({
							url: 'admin/search-meals',
							method: 'get',
							data: {
								mealInfo: mealInfo
							}, 
							success: function(response){
								console.log(response);
								const allMeals = response.meals;

								$('.bigmeal_single').css({ 'display':'none' });

								for(var i = 0; i < allMeals.length; i++) {
									const singleMeal = $('<div>').addClass('bigmeal_single');
									const imageDiv = $('<div>').addClass('singlemeal_img');
										const image = $('<img>').attr({ 'src': '/superadmin/getMealImage?image=' + allMeals[i].Image });
									imageDiv.append(image);
									singleMeal.append(imageDiv);

									const infoBoxDiv = $('<div>').addClass('tripleinfobox');
										const singleMealTitle = $('<div>').addClass('single_mealtitle').append(allMeals[i].Name);
											infoBoxDiv.append(singleMealTitle);
										const singleMealDescDiv = $('<div>').addClass('single_mealdesc').append(allMeals[i].Description);
											infoBoxDiv.append(singleMealDescDiv);

										const ingridientsDiv = $('<div>').addClass('single_ingredients');
										const ingridients = allMeals[i].Ingridients;
										const allIgridients = ingridients.split(',');
											for(var j = 0; j < allIgridients.length; j++) {
												const singleIngSpan = $('<span>').addClass('single_ing').append(allIgridients[j]);
													ingridientsDiv.append(singleIngSpan);
												infoBoxDiv.append(ingridientsDiv)
											}
										const restaurantNameDiv = $('<div>').addClass('byrestaurantlabel').append('By' + ' ' + allMeals[i].Restaurant_name);
											infoBoxDiv.append(restaurantNameDiv);
									singleMeal.append(infoBoxDiv);

									const foodCategoryDiv = $('<div>').addClass('singlecatlabel').append(allMeals[i].Food_category);
										singleMeal.append(foodCategoryDiv);

									const priceDiv = $('<div>').addClass('singleprice').append(allMeals[i].Price + 'ДЕН');
										singleMeal.append(priceDiv);

									const removeAndEditButtonsWrapperDiv = $('<div>').addClass('cat_stats');
									const editButtonWrapperDiv = $('<div>').addClass('cat_edits');
										const editButtonLink = $('<a>').addClass('edit_button').attr({ 'href': 'superadmin/edit-meal', 'id': allMeals[i].ID });
											const editButtonDiv = $('<div>').addClass('cat_icon');
												const editButtonIcon = $('<img>').attr({ 'src': 'superadmin/icon/editIcon' });
											editButtonDiv.append(editButtonIcon);
										editButtonLink.append(editButtonDiv);
										editButtonWrapperDiv.append(editButtonLink);

									const removeButtonWrapperDiv = $('<div>').addClass('cat_edits remove_button').attr({ 'id': allMeals[i].ID });
										const removeButtonDiv = $('<div>').addClass('cat_icon');
											const removeButtonIcon = $('<img>').attr({ 'src':'superadmin/icon/binIcon' });
										removeButtonDiv.append(removeButtonIcon);
										removeButtonWrapperDiv.append(removeButtonDiv);
									removeAndEditButtonsWrapperDiv.append(editButtonWrapperDiv);
									removeAndEditButtonsWrapperDiv.append(removeButtonWrapperDiv);
									singleMeal.append(removeAndEditButtonsWrapperDiv);

									allMealsDiv.append(singleMeal);
					
								}

							}, error: function(error){
								console.log(error)
							}
						})

						} else {
							location.reload();
						}
                }
            })
		})
});