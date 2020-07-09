$(document).ready(function(){
	// check if user is logged in
	$.ajax({
		url: 'client/check-log',
		success: function(response){
			if(response.mess == 'logged'){
				// create this header if user is logged in
				$('.mobile_menu').css({ 'display':'none' });

				$('.mobile_drop_btn').click(function(){
					$('.loggedin_mobile_menu').slideToggle(500);
				})
	
				const notLoggedHeader = $('<div>').addClass('header').attr({ 'id':'old_header' });
					const logoLink = $('<a>').attr({ 'href':'/' });
						const logoDiv = $('<div>').addClass('logo');
							const logoMascotImg = $('<img>').attr({ 'src':'desktop/mascot', 'id':"logo-mascot" }).css({ 'height':'35px' });
							const logoImg = $('<img>').attr({ 'src':'desktop/logo', 'id':"logo_image" }).css({ 'position':'absolute', 'margin-top':'8px' });
						logoDiv.append(logoMascotImg);
						logoDiv.append(logoImg);
					logoLink.append(logoDiv);
				notLoggedHeader.append(logoLink);
	
					const topMenuDiv = $('<div>').addClass('top_menu');
						const loggedInUserDiv = $('<div>').addClass('loggedUser').css({ 'padding-top':'15px', 'display':'flex' });
						const userIcon = $('<img>').attr({ 'src':'desktop/user-icon' }).css({ 'height': '24px', 'margin-right': '10px', 'vertical-align': 'bottom' });
							const loggedUserName = $('<div>').addClass('loggedUserName').css({ 'margin-right':'30px' }).append(userIcon);
								const dashboardLink = $('<a>').attr({ 'href':'dashboard' }).addClass('welcomeName').css({ 'color':'white', 'margin-rght':'20px', 'margin-top':'10px', 'padding-top':'15px', 'text-decoration':'none' }).append(userIcon);
							loggedUserName.append(dashboardLink);	
	
							const logoutBtn = $('<div>').addClass('logoutButton').css({ 'padding-top':'5px' });
								const logoutIcon = $('<img>').attr({ 'src':'desktopadmin/logout' }).css({ 'height':'23px' });
							logoutBtn.append(logoutIcon);
						loggedInUserDiv.append(loggedUserName);
						loggedInUserDiv.append(logoutBtn);
	
						const goToCartLink = $('<a>').addClass('cart_number').attr({ 'href':'my-cart' });
							const myCartDiv = $('<div>').addClass('my_cart');
								const cartIcon = $('<img>').attr({ 'src':'desktop/cart-icon' });
								const cartNumberSpan = $('<span>').addClass('num_cart_items');
							myCartDiv.append(cartIcon);
							myCartDiv.append(cartNumberSpan);
						goToCartLink.append(myCartDiv);
					topMenuDiv.append(loggedInUserDiv);
					topMenuDiv.append(goToCartLink);
				notLoggedHeader.append(topMenuDiv);
	
				$('.header_wrapper').append(notLoggedHeader);

				// logout
				$('.logoutButton').click(function(){
					$.ajax({
						url: 'client/logout',
						success: function(response){
							if(response.message == 'logged out'){
								location.href = '/';
							}
						}
					})
				});
	
				// get logged in user name
				$.ajax({
					url: 'client/lg-name',
					success: function(response){
						const lgUserFristname = response.singleUserName;
						$('.welcomeName').append('Здраво,' + ' ' + lgUserFristname + '.' + ' ');
					}
				})
            } else {
				// create this header if user is not logged in
				const notLoggedHeader = $('<div>').addClass('header').attr({ 'id':'old_header' });
					const logoLink = $('<a>').attr({ 'href':'/' });
						const logoDiv = $('<div>').addClass('logo');
							const logoMascotImg = $('<img>').attr({ 'src':'desktop/mascot', 'id':"logo-mascot" }).css({ 'height':'35px' });
							const logoImg = $('<img>').attr({ 'src':'desktop/logo', 'id':"logo_image" }).css({ 'position':'absolute', 'margin-top':'8px' });
						logoDiv.append(logoMascotImg);
						logoDiv.append(logoImg);
					logoLink.append(logoDiv);
				notLoggedHeader.append(logoLink);

					const topMenuDiv = $('<div>').addClass('top_menu');
						const loginBtnDiv = $('<div>').addClass('login_btn').append('Најави се');
						const signupBtnDiv = $('<div>').addClass('signup_btn').append('Креирај сметка');

						const goToCartLink = $('<a>').addClass('cart_number').attr({ 'href':'my-cart' });
							const myCartDiv = $('<div>').addClass('my_cart');
								const cartIcon = $('<img>').attr({ 'src':'desktop/cart-icon' });
								const cartNumberSpan = $('<span>').addClass('num_cart_items');
							myCartDiv.append(cartIcon);
							myCartDiv.append(cartNumberSpan);
						goToCartLink.append(myCartDiv);
					topMenuDiv.append(loginBtnDiv);
					topMenuDiv.append(signupBtnDiv);
					topMenuDiv.append(goToCartLink);
				notLoggedHeader.append(topMenuDiv);

				$('.header_wrapper').append(notLoggedHeader);

				// show login form
				$('.login_btn').click(function(event){
					// $('.background-container').css({'display':'block'});
					$('.complete_form').css({'display':'block', 'z-index':'999'});

					$('#page-mask').css({ 'display':'block' });
				});

				// show login form mobile version
				$('#login_mobile').click(function(){
					$('.complete_form').css({'display':'block', 'z-index':'999'});

					$('#page-mask').css({ 'display':'block' });

					$('.mobile_menu').slideToggle(500);
				})

				// close login form and remove page mask
				$('#page-mask').click(function(){
					$('.complete_form').css({'display':'none'});

					$('#page-mask').css({ 'display':'none' });
				})

				// show signup form
				$('.signup_btn').click(function(event){
					// $('.register-container').css('display', 'block');
					location.href = 'register'
				});

				// close login and signup forms
				$('.close').click(function(event){
					$('.background-container').css('display', 'none');
					$('.register-container').css('display', 'none');
				});

				// close login and signup forms with click on escape button
				$(document).keyup(function(e) {
					if (e.key === "Escape") {
						$('.background-container').css('display', 'none');
						$('.register-container').css('display', 'none'); 
					};
				});

				
				
				// on enter send login request
				$(".complete_form").keyup(function(event) {
					if (event.keyCode === 13) {
						$(".login").click();
					}
				});

				// send login request to server
				$('.login').click(function(event){
					event.preventDefault();

					const username = $('#username');
					const password = $('#password');

					$.ajax({
						url: 'client/login',
						method: 'post',
						data: {
							username: username.val(), password: password.val()
						},
						success: function(response){
							if(response.message == 'logged in'){
								location.reload();
							} else {
								$('.error_div').css({ 'display':'block' });
								$('.error_msg').append(loginJson.message);
							}
						}
					})
				});
			}
		}
	})


    // get cart items length, request to server
	$.ajax({
		url: 'client/single-cart',
		success: function(response){
			const cart = response.singleCart;
            let cartLength = cart.length;
            // console.log(cartLength);

            if(cartLength < 1){
                cartLength = 0;
            }

            $('.num_cart_items').html('').append(cartLength);
		}
	})
        

	// get all categories request to server and show them in header grey section
	$.ajax({
		url: 'client/categories',
		success: function(response){
			const foodCategoriesDiv = $('#food_categories');
			const categories = response.categories;

			for(var i = 0; i < categories.length; i++){
				const catLinkWrapper = $('<a>').attr({ 'id':'cat_link' });
				const singleCatDiv = $('<div>').addClass('category');
					const singleCatIconDiv = $('<div>').addClass('cat_icon');
						const singleCatIcon = $('<img>').attr({ 'src':"superadmin/getCategoryImage?image=" + categories[i].icon });
					singleCatIconDiv.append(singleCatIcon);
				singleCatDiv.append(singleCatIconDiv);
				
					const singleCatName = $('<div>').addClass('cat_name');
						singleCatName.append(categories[i].Category);
				singleCatDiv.append(singleCatName);

				catLinkWrapper.append(singleCatDiv)
				foodCategoriesDiv.append(catLinkWrapper);
			};

			$('.category').click(function(event){
				event.preventDefault();
				var category = $(this).find('.cat_name');
				var categoryName = $(category).text().trim();

				location.href = 'category?categoryName=' + categoryName;
			});
		}
	})

	// get meal info
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }

	const singleMealCat = data.categoryName;

	$.ajax({
		url: 'client/count-category-views?category=' + singleMealCat,
		method: 'patch',
		success: function(response){
			console.log(response);
		}
	})

	$.ajax({
		url: 'client/single-category?category=' + singleMealCat,
		success: function(response){
			const category = response.singleCat;
			console.log(category)
			const categoryIconDiv = $('.category_name_label');
				const categoryIcon = $('<img>').attr({ 'src':"superadmin/getCategoryImage?image=" + category[0].icon });
			categoryIconDiv.append(categoryIcon);

			const categoryName = category[0].Category;
			$('.category_name_label').append(' ' + categoryName);

		}
	})

	$.ajax({
		url: 'client/cat-meals?singleMealCat=' + singleMealCat,
		success: function(response){
			const allRelevantMealsDiv = $('.all_meals_category');
			const catMeals = response.mealsCat;

			for(var i = 0; i < catMeals.length; i++) {

				const homeMealWrapper = $('<a>').addClass('meal_snippet_wrapper').attr({ 'id': catMeals[i].ID });
				const mealSnippet = $('<div>').addClass('meal_snippet');
					const mealTop = $('<div>').addClass('meal_top');
						const mealName = $('<div>').addClass('meal_title').append(catMeals[i].Name);
					mealTop.append(mealName);
				mealSnippet.append(mealTop);

					const mealImage = $('<div>').addClass('meal_image');
						const image = $('<img>').attr({ 'src':'/superadmin/getMealImage?image=' + catMeals[i].Image }).css({  'width':'100%', 'height':'200px', 'object-fit':'cover' });
					mealImage.append(image);
				mealSnippet.append(mealImage)

					const mealExtraInfo = $('<div>').addClass('meal_extra_info');
						const byLabel = $('<span>').addClass('by_label').append('By');
					mealExtraInfo.append(byLabel);
					mealExtraInfo.append(' ' + catMeals[i].Restaurant_name);						
				mealSnippet.append(mealExtraInfo);

					const mealPrice = $('<div>').addClass('meal_snippet_price').append(catMeals[i].Price + ' ' + 'ДЕН');
				mealSnippet.append(mealPrice);

				homeMealWrapper.append(mealSnippet)
				allRelevantMealsDiv.append(homeMealWrapper);
			};	

			$('.meal_snippet_wrapper').click(function(event){
				event.preventDefault();

				var findId = this.id;
					// sessionStorage.setItem('mealId', findId);
					location.href = 'meal?mealId=' + findId;
			});
		}
	})
})