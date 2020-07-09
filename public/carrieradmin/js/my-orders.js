$(document).ready(function(){
	// get logged in user firstname, request to server
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
			url: 'carrier/logour',
			success: function(response){
				if(response.message == 'logged out'){
					location.href = '/carrier'
				}
			}
		})
	});

	// list all my orders
	$.ajax({
		url: 'carrier/my-active-orders',
		success: function(response){
			const contentDiv = $('#content');
			// console.log(myJson);
			const activeOrders = response.myActiveOrders;
			const activeOrdersMeals = response.cartItems;
			console.log(activeOrders);
			// console.log(activeOrdersMeals);


			for(var i = 0; i < activeOrders.length; i++) {
				const orderBox = $('<div>').addClass('orderbox');

				const orderHeader = $('<div>').addClass('order_header');
				const orderHeaderId = $('<div>').addClass('order_header_id').append('#' + activeOrders[i].ID);
					orderHeader.append(orderHeaderId);
				const orderHeaderTimepast = $('<div>').addClass('order_timepast').append(activeOrders[i].Time_ordered);
					orderHeader.append(orderHeaderTimepast);
				orderBox.append(orderHeader);

				const orderFromDiv = $('<div>').addClass('order_from');

				// console.log(activeOrdersMeals[i]);
				const mealsOfOrders = activeOrdersMeals[i];
				for(var j = 0; j < mealsOfOrders.length; j++){
					console.log(mealsOfOrders[j].meal_name);

					fromLocationTitleLink = $('<a>').attr({
						'href': 'https://maps.google.com/?q=' + mealsOfOrders[j].rest_name,
						'target' : '_blank'
					}).css({'color':'blue', 'text-decoration':'underline', 'border-bottom':'1px solid #dede'});
	
					const mealTitleDiv = $('<div>').addClass('location_title').append(mealsOfOrders[j].meal_name);
						orderFromDiv.append(mealTitleDiv);
						const test = $('<b>').append('Од ').css({ 'text-decoration':'none' });
					// const fromLabelDiv = $('<div>').addClass('fromto_label').append('ОД').css({ 'padding-bottom':'0', 'border-top':'none' });
						// orderFromDiv.append(fromLabelDiv);
					const fromLocationTitleDiv = $('<div>').addClass('location_title restaurants').attr('id', 'restaurant_name').append(test, mealsOfOrders[j].rest_name);
					fromLocationTitleLink.append(fromLocationTitleDiv);
						// fromLocationTitleDiv.append(fromLocationTitleLink);
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
				
				// const orderDetailsLabel = $('<div>').addClass('fromto_label').append('Детали за нарачката');
				// orderBox.append(orderDetailsLabel);

				// const orderDetails = $('<div>').addClass('order_details').append(singleOrder[0].Meals);
				// orderBox.append(orderDetails);

				const paymentDetailsLabel = $('<div>').addClass('fromto_label').append('Начин на плаќање');
				orderBox.append(paymentDetailsLabel);

				const paymentDetails = $('<div>').addClass('payment_details');
				const paymentMethod = $('<div>').addClass('payment_method').append('Во готово');
					paymentDetails.append(paymentMethod);
				const totalAmount = $('<div>').addClass('total_amount').append(activeOrders[i].Price + ' ' + 'ДЕН');
					paymentDetails.append(totalAmount);
				orderBox.append(paymentDetails);

				console.log(activeOrders[i].Status)

				if(activeOrders[i].Order_status == 'Accepted by carrier'){
					const completeOrderLink = $('<a>');
					// .attr('href', '/carrier/home');
					const completedOrderButton = $('<div>').addClass('pickup_order_btn').attr('id', activeOrders[i].ID).append('Подигни нарачка');
						completeOrderLink.append(completedOrderButton);
					orderBox.append(completeOrderLink);
				} else {
					const completeOrderLink = $('<a>')
					// .attr('href', '/carrier/home');
					const completedOrderButton = $('<div>').addClass('accept_order_btn').attr('id', activeOrders[i].ID).append('Заврши нарачка');
						completeOrderLink.append(completedOrderButton);
					orderBox.append(completeOrderLink);

					const cancelOrderButtonLink = $('<a>')
					// .attr('href', '/carrier/home');
					const cancelOrderButton = $('<div>').addClass('cancel_order_btn').attr('id', activeOrders[i].ID).append('Откажи нарачка');
						cancelOrderButtonLink.append(cancelOrderButton)
					orderBox.append(cancelOrderButtonLink);
				}

				contentDiv.append(orderBox);
			}

			orderDelivered();
			pickuUpOrder();
			cancelOrder();
				
			// pickup order
			function pickuUpOrder(){
				$('.pickup_order_btn').click(function(){
					const orderId = this.id;

					$.ajax({
						url: 'carrier/pickup-order?orderId=' + orderId,
						method: 'patch',
						success: function(response){
							if(response.mess == 'order picked up'){
								alert('Нарачката е подигната.');
								
								window.setTimeout(function(){
									location.reload();
								}, 500);
							}
						}
					})
				})
			}
			// order delivered
			function orderDelivered() { 
				$('.accept_order_btn').on('click', function(){
					var orderId = this.id

					$.ajax({
						url: 'carrier/deliver-order?orderId=' + orderId,
						method: 'patch',
						success: function(response){
							if(response.message == 'Order delivered'){
								alert('Order has been delivered.');
								
								window.setTimeout(function(){
									$.ajax({
										url: 'carrier/change-status',
										method: 'patch',
										success: function(response){
											if(response.message == 'status changed'){
												location.href = '/carrier/home';
											}
										}
									})
								}, 2000);
							}
						}
					})
					// })
				// });
				})
			};
			// cancel order
			function cancelOrder(){
				$('.cancel_order_btn').click(function(){ 
		    		var orderId = this.id;
					
					$.ajax({
						url: 'carrier/cancelOrder?orderId=' + orderId,
						method: 'patch',
						success: function(response){
							alert('order canceled');
						}
					})
		    	})
			}
			
		}
	})
});