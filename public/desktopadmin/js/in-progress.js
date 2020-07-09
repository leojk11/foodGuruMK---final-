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


    // get cart length
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
	});
        

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

	// get just ordered order details
	var url = document.location.href,
		params = url.split('?')[1].split('&'),
		data = {}, tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('=');
		data[tmp[0]] = tmp[1];
	}

	const orderId = data.orderId;

	console.log(orderId);

	$.ajax({
		url: 'client/single-order?orderId=' + orderId,
		success: function(response){
			// console.log(response);
			const order = response.singleOrder;
			console.log(order[0].Order_status);


			const progressBox = $('<div>').addClass('progress_box_first');
				if(order[0].Order_status == 'Waiting restaurant confirmation'){
					const wrapper = $('<div>').addClass('c100 p10 big');
						const orderStatusSpan = $('<span>').append('Нарачката е примена');
					wrapper.append(orderStatusSpan);
						const sliceDiv = $('<div>').addClass('slice');
							const barDiv = $('<div>').addClass('bar');
							const fillDiv = $('<div>').addClass('fill');
						sliceDiv.append(barDiv);
						sliceDiv.append(fillDiv);
					wrapper.append(sliceDiv);

					progressBox.append(wrapper);

					$('.black_section').append(progressBox);

				} else if(order[0].Order_status == 'Canceled'){
					const wrapper = $('<div>').addClass('c100 p0 big');
						const orderStatusSpan = $('<span>').append('Нарачката е откажана');
					wrapper.append(orderStatusSpan);
						const sliceDiv = $('<div>').addClass('slice');
							const barDiv = $('<div>').addClass('bar');
							const fillDiv = $('<div>').addClass('fill');
						sliceDiv.append(barDiv);
						sliceDiv.append(fillDiv);
					wrapper.append(sliceDiv);

					progressBox.append(wrapper);

					$('.black_section').append(progressBox);

				} else if (order[0].Order_status == 'In progress'){
					const wrapper = $('<div>').addClass('c100 p30 big');
						const orderStatusSpan = $('<span>').append('Прифатена од ресторан');
					wrapper.append(orderStatusSpan);
						const sliceDiv = $('<div>').addClass('slice');
							const barDiv = $('<div>').addClass('bar');
							const fillDiv = $('<div>').addClass('fill');
						sliceDiv.append(barDiv);
						sliceDiv.append(fillDiv);
					wrapper.append(sliceDiv);

					progressBox.append(wrapper);

					$('.black_section').append(progressBox);

				} else if (order[0].Order_status == 'Accepted by carrier'){
					const progressBoxWithCarrier = $('<div>').addClass('progress-with-carrier');
						const wrapper = $('<div>').addClass('c100 p50 big');
							const orderStatusSpan = $('<span>').append('Прифатена од доставувач');
						wrapper.append(orderStatusSpan);
							const sliceDiv = $('<div>').addClass('slice');
								const barDiv = $('<div>').addClass('bar');
								const fillDiv = $('<div>').addClass('fill');
							sliceDiv.append(barDiv);
							sliceDiv.append(fillDiv);
						wrapper.append(sliceDiv);
					progressBoxWithCarrier.append(wrapper);
								
					$.ajax({
						url: 'client/order-carrier?carrierId=' + order[0].Carrier_id,
						success: function(response){
							console.log(response);
							const carrier = response.carrier;

							const carrierInfoDiv = $('<div>').addClass('carrier-info');
								const carrierInfo = $('<h1>').append('Доставувач:');
								const carrierImg = $('<img>').attr({ 'src': '/superadmin/getCarrierImage?image=' + carrier[0].Image });
								const carrierLabel = $('<label>').append(carrier[0].Firstname + ' ' + carrier[0].Lastname);
								const carrierPhoneSpan = $('<span>').append(carrier[0].Phone_number);
							carrierInfoDiv.append(carrierInfo);
							carrierInfoDiv.append(carrierImg);
							carrierInfoDiv.append(carrierLabel);
							carrierInfoDiv.append(carrierPhoneSpan);
									
							progressBoxWithCarrier.append(carrierInfoDiv);
						}
					})

					$('.black_section').append(progressBoxWithCarrier);
				} else if (order[0].Order_status == 'Picked up'){
					const progressBoxWithCarrier = $('<div>').addClass('progress-with-carrier').css({ 'padding-top':'40px' });;
						const wrapper = $('<div>').addClass('c100 p80 big')
							const orderStatusSpan = $('<span>').append('Нарачката е на пат');
						wrapper.append(orderStatusSpan);
							const sliceDiv = $('<div>').addClass('slice');
								const barDiv = $('<div>').addClass('bar');
								const fillDiv = $('<div>').addClass('fill');
							sliceDiv.append(barDiv);
							sliceDiv.append(fillDiv);
						wrapper.append(sliceDiv);
					progressBoxWithCarrier.append(wrapper);
								
					$.ajax({
						url: 'client/order-carrier?carrierId=' + order[0].Carrier_id,
						success: function(response){
							console.log(response);
							const carrier = response.carrier;

							const carrierInfoDiv = $('<div>').addClass('carrier-info');
								const carrierInfo = $('<h1>').append('Доставувач:');
								const carrierImg = $('<img>').attr({ 'src': '/superadmin/getCarrierImage?image=' + carrier[0].Image });
								const carrierLabel = $('<label>').append(carrier[0].Firstname + ' ' + carrier[0].Lastname);
								const carrierPhoneSpan = $('<span>').append(carrier[0].Phone_number);
							carrierInfoDiv.append(carrierInfo);
							carrierInfoDiv.append(carrierImg);
							carrierInfoDiv.append(carrierLabel);
							carrierInfoDiv.append(carrierPhoneSpan);
									
							progressBoxWithCarrier.append(carrierInfoDiv);
						}
					})

					$('.black_section').append(progressBoxWithCarrier);
				} else if (order[0].Order_status == 'Delivered'){
					const progressBoxWithCarrier = $('<div>').addClass('progress-with-carrier');
						const wrapper = $('<div>').addClass('c100 p100 big');
							const orderStatusSpan = $('<span>').append('Нарачката е доставена');
						wrapper.append(orderStatusSpan);
							const sliceDiv = $('<div>').addClass('slice');
								const barDiv = $('<div>').addClass('bar');
								const fillDiv = $('<div>').addClass('fill');
							sliceDiv.append(barDiv);
							sliceDiv.append(fillDiv);
						wrapper.append(sliceDiv);
					progressBoxWithCarrier.append(wrapper);
								
					$.ajax({
						url: 'client/order-carrier?carrierId=' + order[0].Carrier_id,
						success: function(response){
							console.log(response);
							const carrier = response.carrier;

							const carrierInfoDiv = $('<div>').addClass('carrier-info');
								const carrierInfo = $('<h1>').append('Доставувач:');
								const carrierImg = $('<img>').attr({ 'src': '/superadmin/getCarrierImage?image=' + carrier[0].Image });
								const carrierLabel = $('<label>').append(carrier[0].Firstname + ' ' + carrier[0].Lastname);
								const carrierPhoneSpan = $('<span>').append(carrier[0].Phone_number);
							carrierInfoDiv.append(carrierInfo);
							carrierInfoDiv.append(carrierImg);
							carrierInfoDiv.append(carrierLabel);
							carrierInfoDiv.append(carrierPhoneSpan);
									
							progressBoxWithCarrier.append(carrierInfoDiv);
						}
					})

					$('.black_section').append(progressBoxWithCarrier);
				}
		}
	})
})