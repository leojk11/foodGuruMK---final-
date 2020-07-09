$(document).ready(function(){
	// get all food categories
	fetch('/admin/food-categories')
		.then((response) => { return response.json() })
		.then((categoriesJson) => {
			const categories = categoriesJson.categories;
			// console.log(categories);
			const allCategoriesDiv = $('#all_categories');

			for(var i = 0; i < categories.length; i++) {
				const foodCatStats = $('<div>').addClass('food_cat_stats');

				const catImgDiv = $('<div>').addClass('cat_img');
					const catTitleDiv = $('<div>').addClass('cat_title').append(categories[i].Category);
					const catImg = $('<img>').attr({ 'src':"superadmin/getCategoryImage?image=" + categories[i].Image });
				catImgDiv.append(catTitleDiv);
				catImgDiv.append(catImg);
				foodCatStats.append(catImgDiv);

				const catPositionWrapperDiv = $('<div>').addClass('position-wrapper');

				const catPositionDiv = $('<div>').addClass('cat_position');
					const catPositionNumber = $('<div>').addClass('pos_num').append('#' + categories[i].Position);
					const catPositionLabel = $('<div>').addClass('mid_label').append('Position');
				catPositionDiv.append(catPositionNumber);
				catPositionDiv.append(catPositionLabel);
				foodCatStats.append(catPositionDiv);

				const catMealsDiv = $('<div>').addClass('cat_position');
					const catMealsNumber = $('<div>').addClass('pos_num').append(categories[i].Meals);
					const catMealsLabel = $('<div>').addClass('mid_label').append('Meals');
				catMealsDiv.append(catMealsNumber);
				catMealsDiv.append(catMealsLabel);
				// catPositionWrapperDiv.append(catMealsDiv)
				foodCatStats.append(catMealsDiv);

				foodCatStats.append(catPositionWrapperDiv);
				
				const catViewsAndOrdersStats = $('<div>').addClass('cat_stats');
					const catViewsDiv = $('<div>').addClass('cat_meals');
						const catViewsNumb = $('<div>').addClass('meal_num').append(categories[i].Views);
						const catViewsLabel = $('<div>').addClass('mid_label').append('Views');
					catViewsDiv.append(catViewsNumb);
					catViewsDiv.append(catViewsLabel);
					catViewsAndOrdersStats.append(catViewsDiv);

					const catOrdersDiv = $('<div>').addClass('cat_meals');
							const catOrdersNumb = $('<div>').addClass('meal_num').append(categories[i].Orders);
							const catOrdersLabel = $('<div>').addClass('mid_label').append('Orders');
					catOrdersDiv.append(catOrdersNumb);
					catOrdersDiv.append(catOrdersLabel);
					catViewsAndOrdersStats.append(catOrdersDiv);
				foodCatStats.append(catViewsAndOrdersStats);

				const removeAndEditButtonsWrapperDiv = $('<div>').addClass('cat_stats');
					const editButtonWrapperDiv = $('<div>').addClass('cat_edits');
						const editButtonLink = $('<a>').addClass('edit_button').attr({ 'href':'superadmin/edit-meal', 'id': categories[i].ID });
							const editButtonDiv = $('<div>').addClass('cat_icon');
								const editButtonIcon = $('<img>').attr({ 'src':'superadmin/icon/editIcon' });
							editButtonDiv.append(editButtonIcon);
						editButtonLink.append(editButtonDiv);
						editButtonWrapperDiv.append(editButtonLink);

					const removeButtonWrapperDiv = $('<div>').addClass('cat_edits remove_button').attr({ 'id': categories[i].ID });
						const removeButtonDiv = $('<div>').addClass('cat_icon');
							const removeButtonIcon = $('<img>').attr({ 'src': 'superadmin/icon/binIcon' });
							// removeButtonIcon.setAttribute('onclick', 'removeRestaurant(event)')
						removeButtonDiv.append(removeButtonIcon);
						removeButtonWrapperDiv.append(removeButtonDiv);
					removeAndEditButtonsWrapperDiv.append(editButtonWrapperDiv);
					removeAndEditButtonsWrapperDiv.append(removeButtonWrapperDiv);
				foodCatStats.append(removeAndEditButtonsWrapperDiv);

				allCategoriesDiv.append(foodCatStats);
			}

			$('.edit_button').click(function(event){
				event.preventDefault()
				var catId = this.id;

				var url = 'superadmin/edit-category?catId=' + catId;
				window.location.href = url;
			})

			$('.remove_button').click(function(event){
				event.preventDefault();
				var catId = this.id;

				$.ajax({
					url: 'admin/delete-cat?catId=' + catId,
					method: 'delete',
					success: function(response){
						if(response.message == 'category deleted'){
							location.reload();
						}
					}
				});
			})
		})
});