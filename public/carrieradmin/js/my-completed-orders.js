$(document).ready(function(){
    // get logged in carrier name, request to server
	$.ajax({
		url: 'carrier/loggedInUserName',
		success: function(response){
			$('#logo_text').append('Добредојде' + ',' + ' ' + response.loggedInUser + '!')
		}
	})

    // show dropdown menu
    $("#show_menu").click( function() { 
        $("#dropped_menu").slideToggle();
    });

    // logout function       
    $('#log_out_button').click(function(){
		$.ajax({
			url: 'carrier/logout',
			success: function(response){
				if(response.message == 'logged out'){
					location.href = '/carrier'
				}
			}
		})
	});

	// get all my completed orders
	$.ajax({
		url: 'carrier/my-completed-orders',
		success: function(response){
			// console.log(myJson)
			const contentDiv = $('#content');
			const activeOrders = response.myActiveOrders;
			const activeOrdersMeals = response.cartItems;

			for(var i = 0; i < activeOrders.length; i++) {
				const orderBox = $('<div>').addClass('orderbox');

				const orderHeader = $('<div>').addClass('order_header');
				const orderHeaderId = $('<div>').addClass('order_header_id').append('#' + activeOrders[i].ID);
					orderHeader.append(orderHeaderId);
				const orderHeaderTimepast = $('<div>').addClass('order_timepast').append(activeOrders[i].Time_ordered);
					orderHeader.append(orderHeaderTimepast);
				orderBox.append(orderHeader);

				const orderFromDiv = $('<div>').addClass('order_from');

				const mealsOfOrders = activeOrdersMeals[i];
				for(var j = 0; j < mealsOfOrders.length; j++){
					fromLocationTitleLink = $('<a>').attr({
						'href': 'https://maps.google.com/?q=' + mealsOfOrders[j].rest_name,
						'target' : '_blank'
					}).css({'color':'blue', 'text-decoration':'underline', 'border-bottom':'1px solid #dede'});
	
					const mealTitleDiv = $('<div>').addClass('location_title').append(mealsOfOrders[j].meal_name);
						orderFromDiv.append(mealTitleDiv);
						const test = $('<b>').append('Од ').css({ 'text-decoration':'none' });
					const fromLocationTitleDiv = $('<div>').addClass('location_title restaurants').attr('id', 'restaurant_name').append(test, mealsOfOrders[j].rest_name);
					fromLocationTitleLink.append(fromLocationTitleDiv);
						orderFromDiv.append(fromLocationTitleLink);
					orderBox.append(orderFromDiv);
				}

				const orderToDiv = $('<div>').addClass('order_to');
				const toLabel = $('<div>').addClass('fromto_label').append('ДО').css({ 'border-top':'none' });
					orderToDiv.append(toLabel);
				const toLocationTitleLink = $('<a>').attr({
					'href': 'https://maps.google.com/?q=' + activeOrders[i].Location,
					'target' : '_blank'
				});
				const toLocationTitleDiv = $('<div>').addClass('location_title').attr('id', 'final_destination').append(activeOrders[i].Location).css({'color':'blue', 'text-decoration':'underline'});
					toLocationTitleLink.append(toLocationTitleDiv)
					orderToDiv.append(toLocationTitleLink);
				orderBox.append(orderToDiv);

				const customerDetailsLabelDiv = $('<div>').addClass('fromto_label').append('Детали за корисникот');
				orderBox.append(customerDetailsLabelDiv);

				const orderUserInfo = $('<div>').addClass('order_user_info');
				const userFullName = $('<div>').addClass('order_user_name').append(activeOrders[i].Client_name);
					orderUserInfo.append(userFullName);
					
				const userPhoneNumberLink = $('<a>').attr('href', 'tel:' + activeOrders[i].Phone_number);
				const userPhoneNumber = $('<div>').addClass('order_user_tel').append(activeOrders[i].Phone_number).css({'color':'blue', 'text-decoration':'underline'});;
					userPhoneNumberLink.append(userPhoneNumber);
					orderUserInfo.append(userPhoneNumberLink);
				orderBox.append(orderUserInfo );

				const paymentDetailsLabel = $('<div>').addClass('fromto_label').append('Начин на плаќање');
				orderBox.append(paymentDetailsLabel);

				const paymentDetails = $('<div>').addClass('payment_details');
				const paymentMethod = $('<div>').addClass('payment_method').append('Во готово');
					paymentDetails.append(paymentMethod);
				const totalAmount = $('<div>').addClass('total_amount').append(activeOrders[i].Price + ' ' + 'ДЕН');
					paymentDetails.append(totalAmount);
				orderBox.append(paymentDetails);

				const completeOrderLink = $('<a>');
				const completedOrderButton = $('<div>').addClass('order_status_delivered').append(activeOrders[i].Order_status);
					completeOrderLink.append(completedOrderButton);
				orderBox.append(completeOrderLink);

				contentDiv.append(orderBox);
			}
		}
	})
})