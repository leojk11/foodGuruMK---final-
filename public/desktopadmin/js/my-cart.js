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
                
                const cartWrapperDiv = $('<div>').addClass('cart_wrapper');
                    const cartSummaryDiv = $('<div>').addClass('cart_summary');
                        const cartPageTitleDiv = $('<div>').addClass('cart_page_title');
                    cartSummaryDiv.append(cartPageTitleDiv);

                        const cartLabelsDiv = $('<div>').addClass('cart_labels');
                            const cartMealTitle = $('<div>').addClass('cart_meal_title').append(' Оброк');
                            const cartMealQty = $('<div>').addClass('cart_meal_qty').append('Количина');
                            const cartMealPrice = $('<div>').addClass('cart_meal_price').append('Цена');
                        cartLabelsDiv.append(cartMealTitle);
                        cartLabelsDiv.append(cartMealQty);
                        cartLabelsDiv.append(cartMealPrice);
                    cartSummaryDiv.append(cartLabelsDiv);

                        const cartItemsDiv = $('<div>').addClass('cart_items');
                    cartSummaryDiv.append(cartItemsDiv);

                        const deliveryCostDiv = $('<div>').addClass('delivery_cost');
                            const deliveryLabel = $('<div>').addClass('delivery_label').append('Цена на достава');
                            const delivertPriceCart = $('<div>').addClass('delivery_price_cart').append('50 ДЕН');
                        deliveryCostDiv.append(deliveryLabel);
                        deliveryCostDiv.append(delivertPriceCart);
                    cartSummaryDiv.append(deliveryCostDiv);

                        const totalBar = $('<div>').addClass('total_bar');
                            const totalLabel = $('<div>').addClass('total_label').css({ 'padding':'10px' }).append('Вкупно');
                            const totalAmount = $('<div>').addClass('total_amount');
                        totalBar.append(totalLabel);
                        totalBar.append(totalAmount);
                    cartSummaryDiv.append(totalBar);

                cartWrapperDiv.append(cartSummaryDiv);

                    const loggedCartSignUp = $('<div>').addClass('logged-in-cart-signup');
                        const underAddress = $('<div>').addClass('under-address-cart under-address');
                            const deliveryTitle = $('<div>').addClass('delivery_title').append('Одбери адреса за достава').css({ 'padding-top':'8px' });
                            const allAddresses = $('<div>').addClass('all-addresses').css({ 'margin-top':'50px' });
                        underAddress.append(deliveryTitle);
                        underAddress.append(allAddresses);

                            const addNewAddress = $('<div>').addClass('add-new-address').css({ 'display':'none' });
                                const inputLabelCart = $('<div>').addClass('input_label_cart').append('Скратено име');
                                const addressInput = $('<input>').addClass('dest_input').attr({ 'id':'address_name', 'type':'text', 'name':'short_name', 'placeholder':'Пр. Дома' });
                                const brake = $('<br>');
                                const inputLabelCartSecond = $('<div>').addClass('input_label_cart').append('Адреса за достава');
                                const addressLocationInput = $('<input>').addClass('dest_input').attr({ 'id':'address_location', 'type':'text', 'name':'short_name', 'placeholder':'Пр. Гуру Димитров 1' });
                                const chosenAddress = $('<input>').attr({ 'id':'chosen_address', 'type':'hidden' });
                            addNewAddress.append(inputLabelCart)
                            addNewAddress.append(addressInput)
                            addNewAddress.append(brake)
                            addNewAddress.append(inputLabelCartSecond)
                            addNewAddress.append(addressLocationInput)
                            addNewAddress.append(chosenAddress)
                        underAddress.append(addNewAddress);

                            const newAddressDiv = $('<div>').addClass('new_address').attr({ 'id':'open-address-form' }).css({ 'marin':'0 auto' });
                                const plusIcon = $('<img>').attr({ 'src':'desktop/plus-icon' });
                            newAddressDiv.append(plusIcon);
                            newAddressDiv.append('Додади нова адреса');
                        underAddress.append(newAddressDiv);

                            const newAddressSaveDiv = $('<div>').addClass('new_address').attr({ 'id':'save-new-address' }).css({ 'margin':'0 auto', 'display':'none' });
                                const saveIcon = $('<img>').attr({ 'src':'desktop/save-icon' }).css({ 'height':'19px' });
                            newAddressSaveDiv.append(saveIcon);
                            newAddressSaveDiv.append('Зачувај ја оваа адреса');
                        underAddress.append(newAddressSaveDiv);

                            const loggedInOrderButton = $('<a>').attr({ 'id':'loggedin_order_button' });
                                const expressBuyBtn = $('<div>').addClass('express_buy_btn_cart').css({ 'margin-top':'60px' });
                                    const shoppingIcon = $('<img>').attr({ 'src':'desktop/cart-icon' });
                                expressBuyBtn.append(shoppingIcon);
                                expressBuyBtn.append('Нарачај');
                            loggedInOrderButton.append(expressBuyBtn);
                        underAddress.append(loggedInOrderButton);
                        
                    loggedCartSignUp.append(underAddress);
                cartWrapperDiv.append(loggedCartSignUp);

                $('.black_section').append(cartWrapperDiv);

                $('#open-address-form').click(function(){
                    console.log('leo')
                    $('.add-new-address').css({ 'display':'block' })

                    $('#open-address-form').css({ 'display':'none' });

                    $('#save-new-address').css({ 'display':'block' })

                });

                // if user is logged in get user addresses
                $.ajax({
                    url: 'client/my-addresses',
                    success: function(repsonse){
                        const addresses = repsonse.addresses;
                        console.log(addresses)

                        const allAddresses = $('.all-addresses');

                        var i = 0;
                        while(i < addresses.length){
                            const oneRowAddress = $('<div>').addClass('one-row-address');
                                const withOutBin = $('<div>').addClass('without-bin').css({ 'margin':'0 auto', 'width':'100%' });
                                    const imgLocLeft = $('<div>').addClass('img-loc-left');
                                        const whereLocInco = $('<img>').attr('src', 'desktop/pin-icon').css({ 'height':'32px' });
                                    imgLocLeft.append(whereLocInco);
                                withOutBin.append(imgLocLeft);

                                    const whereLoc = $('<div>').addClass('where-loc');
                                        const wherePlace = $('<div>').addClass('where-place').append(addresses[i].name);
                                        const whereName = $('<div>').addClass('where-name').append(addresses[i].location);
                                    whereLoc.append(wherePlace);
                                    whereLoc.append(whereName);
                                withOutBin.append(whereLoc);
                            oneRowAddress.append(withOutBin);
                            
                            allAddresses.append(oneRowAddress);

                            i++;
                        }
                        
                        $('.one-row-address').click(function(){
                            event.preventDefault();
                            
                            $(this).toggleClass('selected_address');

                            const chosenAddress = $(this).find('.where-loc').find('.where-name');
                            const finalAddress = chosenAddress.text().trim();
                            console.log(finalAddress);

                            $('#chosen_address').val(finalAddress);
                    
                        })
                    }
                })

                // add new address
                $('#save-new-address').click(function(){
                    const addressName = $('#address_name').val();
                    const addressLocation = $('#address_location').val();

                    $.ajax({
                        url: 'client/add-address',
                        method: 'post',
                        data: {
                            addressName: addressName,
                            location:addressLocation
                        },
                        success: function(response){
                            if(response.message == 'added'){
                                location.reload();
                            }
                        }
                    })
                });

                // if user is logged in click another button
                $('#loggedin_order_button').click(function(){
                    event.preventDefault();

                    const chosenAddress = $('#chosen_address').val();
                    // make order request
                    $.ajax({
                        url: 'client/make-order',
                        method: 'post',
                        data: {
                            chosenAddress
                        },
                        success: function(response){
                            console.log(response);
                            if(response.message == 'order placed'){
                                const thisOrderId = response.thisOrderId;
                                location.href = 'in-progress?orderId=' + thisOrderId;
                            } else {
                                $('.cart_error_div').css('display', 'block');
                                $('.cart_error_msg').append(response.message);
                            }
                        }
                    })

                    //Send data to restaurant
                    $.ajax({
                        url: 'client/single-cart',
                        success: function(response){
                            const singleCart = response.singleCart;
                            console.log(singleCart)
                            arr = []
                            singleCart.forEach(element => {
                                arr.push(element.rest_name)
                            });
                            console.log(arr)
                            let uniqueRestNames = [...new Set(arr)]
                            console.log(uniqueRestNames)
                            const socket = io()
                            console.log(uniqueRestNames)
                            socket.emit('order', uniqueRestNames)
                        }
                    }) 
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
                

                // not logged cart wrapper
                const cartWrapper = $('<div>').addClass('cart_wrapper');
                    const cartSummary = $('<div>').addClass('cart_summary');
                        const cartPageTitle = $('<div>').addClass('cart_page_title').append('Твојата нарачка');
                    cartSummary.append(cartPageTitle);
                        const cartLabels = $('<div>').addClass('cart_labels');
                            const cartMealTitle = $('<div>').addClass('cart_meal_title').append(' Оброк');
                            const cartMealQty = $('<div>').addClass('cart_meal_qty').append('Количина');
                            const cartMealPrice = $('<div>').addClass('cart_meal_price').append('Цена');
                        cartLabels.append(cartMealTitle);
                        cartLabels.append(cartMealQty);
                        cartLabels.append(cartMealPrice);
                    cartSummary.append(cartLabels);
                        const cartItems = $('<div>').addClass('cart_items');
                    cartSummary.append(cartItems);
                        const deliveryCost = $('<div>').addClass('delivery_cost');
                            const deliveryLabel = $('<div>').addClass('delivery_label').append('Цена за достава');
                            const deliveryPriceCart = $('<div>').addClass('delivery_price_cart').append('50 ДЕН');
                        deliveryCost.append(deliveryLabel);
                        deliveryCost.append(deliveryPriceCart);
                    cartSummary.append(deliveryCost);
                        const totalBar = $('<div>').addClass('total_bar');
                            const totalLabel = $('<div>').addClass('total_label').css({ 'padding':'10px' }).append('Вкупно');
                            const totalAmount = $('<div>').addClass('total_amount');
                        totalBar.append(totalLabel);
                        totalBar.append(totalAmount);
                    cartSummary.append(totalBar);
                cartWrapper.append(cartSummary);
                    const cartSignup = $('<div>').addClass('cart_signup');
                        const deliveryTitle = $('<div>').addClass('delivery_title').append('Внеси податоци за достава');
                    cartSignup.append(deliveryTitle);
                        const destinationDiv = $('<div>').addClass('destination_form');
                            const destinationForm = $('<form>');
                                const nameLabel = $('<div>').addClass('input_label_cart').append('Име и презиме');
                                const nameInput = $('<input>').addClass('dest_input').attr({ 'id':'full_name', 'type':'text', 'name':'Full name', 'placeholder':'Твоето Име и Презиме' });
                            destinationForm.append(nameLabel)
                            destinationForm.append(nameInput)
                                const phoneLabel = $('<div>').addClass('input_label_cart').append('Телефон');
                                const phoneInput = $('<input>').addClass('dest_input').attr({ 'id':'telNumber', 'type':'text', 'name':'Phone number', 'placeholder':'070 123 456' });
                            destinationForm.append(phoneLabel)
                            destinationForm.append(phoneInput)
                                const address = $('<div>').addClass('input_label_cart').append('Адреса за достава');
                                const addressInput = $('<input>').addClass('dest_input').attr({ 'id':'adress', 'type':'text', 'name':'Address', 'placeholder':'Ул. Гуру Димитров бр. 1' });
                                const brakeOne = $('<br>');
                            destinationForm.append(address)
                            destinationForm.append(addressInput)
                            destinationForm.append(brakeOne)
                                const cartError = $('<div>').addClass('cart_error_div').css({ 'width':'100%', 'display':'none' });
                                    const cartErrorMsg = $('<div>').addClass('cart_error_msg').css({ 'text-align':'center', 'background':'#ff0b29', 'color':'white', 'padding':'10px', 'font-size':'15px' });
                                cartError.append(cartErrorMsg);
                            destinationForm.append(cartError);
                                const brakeTwo = $('<br>');
                                const brakeThree = $('<br>');
                            destinationForm.append(brakeTwo);
                            destinationForm.append(brakeThree);
                                const orderBtnLink = $('<a>').attr({ 'id':'order_button' });
                                    const expressBuyBtn = $('<div>').addClass('express_buy_btn_cart');
                                        const cartIconTwo = $('<img>').attr({ 'src':'desktop/cart-icon' });
                                    expressBuyBtn.append(cartIconTwo);
                                    expressBuyBtn.append('Нарачај');
                                orderBtnLink.append(expressBuyBtn);
                            destinationForm.append(orderBtnLink);
                        destinationDiv.append(destinationForm);
                    cartSignup.append(destinationDiv);
                cartWrapper.append(cartSignup);

                $('.black_section').append(cartWrapper);

                // make order, request to server
                $('#order_button').click(function(event){
                    event.preventDefault();
                    const clientFullName = $('#full_name');
                    const clientFullNameVal = clientFullName.val();
                    const clientPhoneNumber = $('#telNumber');
                    const clientPhoneNumberVal = clientPhoneNumber.val();

                    $('.destination_form').html('');  

                    const notLoggedMessage = $('<div>').addClass('delivery_label').append('Почитуван ' + clientFullNameVal +  ', да направите нарачка потребно е да се логирате.');
                    $('.destination_form').append(notLoggedMessage);

                    const loginBtnLink = $('<a>').attr({ 'id':'not_logged_login' });
                        const loginBtn = $('<div>').addClass('express_buy_btn_cart').css({ 'margin-top':'40px' });
                        loginBtn.append('Најава');
                    loginBtnLink.append(loginBtn);
                    $('.destination_form').append(loginBtnLink);
                    $('#not_logged_login').click(function(event){
                        $('.login_btn').click();
                    })

                    const signupBtnLink = $('<a>').attr({ 'href':'register?name=' + clientFullNameVal + '&phoneNumber=' + clientPhoneNumberVal });
                        const signupBtn = $('<div>').addClass('express_buy_btn_cart').css({ 'margin-top':'20px' });
                        signupBtn.append('Креирај сметка');
                    signupBtnLink.append(signupBtn);
                    $('.destination_form').append(signupBtnLink);
                        
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

			$('.num_cart_items').append(cartLength)
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

    // get single cart items
    $.ajax({
        url: 'client/single-cart',
        success: function(response){
            const singleCart = response.singleCart;
            // console.log(singleCart)

            const singleCartMealsArray = [];
            const singleCartMealAmountArray = [];
            const excluded = [];
            for(var i = 0; i < singleCart.length; i++){
                const cartMeals = singleCart[i].meal_id;
                singleCartMealsArray.push(cartMeals);

                const mealExcluded = singleCart[i].excluded_ingr;
                excluded.push(mealExcluded);

                const cartMealsAmoun = singleCart[i].meal_amount;
                singleCartMealAmountArray.push(cartMealsAmoun);
            }
            // console.log(singleCartMealsArray)

            const cartItemsDiv = $('.cart_items');

            for(var i = 0; i < singleCartMealsArray.length; i++){
                const mealId = singleCartMealsArray[i];
                const mealAmount = singleCartMealAmountArray[i];
                const excludedIngr = excluded[i];
                // console.log(excludedIngr);

                $.ajax({
                    url: 'client/single-meal?mealId=' + mealId,
                    success: function(response){
                        // console.log(singleMealJson);
                        const singleMeal = response.singleMeal;

                        console.log(excluded[i]);

                        const mealCartInfo = $('<div>').addClass('cart_infos');
                            const mealCartName = $('<div>').addClass('cart_meal_title_info');
                            const mealCartImage = $('<img>').attr('src', 'superadmin/getMealImage?image=' + singleMeal[0].Image);
                            const excludedItems = $('<span>').addClass('excluded_items').append('Excluded:'+  ' ' + excludedIngr);
                            const emptySpace = $('<br>');
                            mealCartName.append(mealCartImage);
                            mealCartName.append(singleMeal[0].Name + ' ' + 'by' + ' ' + singleMeal[0].Restaurant_name);
                            mealCartName.append(emptySpace);
                            mealCartName.append(excludedItems);
                            mealCartInfo.append(mealCartName);
                            // mealCartInfo.append(excludedItems);

                            const mealCartAmount = $('<div>').addClass('cart_meal_qty_info').append(mealAmount);
                            mealCartInfo.append(mealCartAmount);

                            console.log(singleMeal[0].Price * mealAmount)

                            const mealCartPrice = $('<div>').addClass('cart_meal_price_info').append(singleMeal[0].Price * mealAmount + ' ' + 'ДЕН');
                            mealCartInfo.append(mealCartPrice);

                            const mealCartDeleteDiv = $('<div>').addClass('delete_icon');
                            console.log(singleCart[0].ID);
                                const mealCartDeleteIcon = $('<img>').addClass('delete_button').attr({'src':'desktop/delete-icon', 'id':singleCart[0].ID});
                                // mealCartDeleteIcon.attr('id', singleCart[0].id);
                            mealCartDeleteDiv.append(mealCartDeleteIcon);
                            mealCartInfo.append(mealCartDeleteDiv);

                        cartItemsDiv.append(mealCartInfo);

                        deleteFromCart();
                    }
                })
            }

            // get cart summary
            $.ajax({
                url: 'client/cart-summary',
                success: function(response){
                    $('.total_amount').html('').append(response.finalPrice + 'ДЕН');

                }
            })
        }
    })
    function deleteFromCart(){
        $('.delete_button').click(function(event){
            event.preventDefault();

            const cartItemId = this.id;

            $.ajax({
                url: 'client/delete-from-cart?cartItemId=' + cartItemId,
                method: 'patch',
                success: function(response){
                    location.reload();
                }
            })
        })
    };

;
});
