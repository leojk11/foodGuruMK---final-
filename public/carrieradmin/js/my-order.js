$(document).ready(function(){
	// get order id from url
	var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    const orderId = data.orderId;

	// get logged in carrier names
	$.ajax({
		url: 'carrier/loggedInUserName',
		success: function(response){
			$('#logo_text').append('Добредојде' + ',' + ' ' + response.loggedInUser + '!')
		}
	})


	// show dropdown menu
	$("#show_menu").click( function() { $("#dropped_menu").slideToggle(); });
                

	// logout function       
    $('#log_out_button').click(function(){
		$.ajax({
			url: 'carrier/logout',
			success: function(response){
				if(response.message == 'logged out'){
					location.href = '/carrier'
				}
			}
		});
	});


    // get single order info, request to server
	const content = $('#content');

	$.ajax({
		url: 'carrier/single-order?orderId=' + orderId,
		success: function(response){
			const singleOrder = response.singleOrder;
			const singleOrderMealsAndRest = response.mealsAndRests;
			const fullOrder = response.singleOrder;

			for(var i = 0; i < singleOrder.length; i++) {
				const orderBox = $('<div>').addClass('orderbox');

				const orderHeader = $('<div>').addClass('order_header');
				const orderHeaderId = $('<div>').addClass('order_header_id').append('#' + fullOrder[0].ID);
					orderHeader.append(orderHeaderId);
				const orderHeaderTimepast = $('<div>').addClass('order_timepast').append(fullOrder[0].Time_ordered);
					orderHeader.append(orderHeaderTimepast);
				orderBox.append(orderHeader);

				const orderFromDiv = $('<div>').addClass('order_from');
				for(var j = 0; j < singleOrderMealsAndRest.length; j++){
					fromLocationTitleLink = $('<a>').attr({
						'href': 'https://maps.google.com/?q=' + singleOrderMealsAndRest[j].rest,
						'target' : '_blank'
					});

					const mealTitleDiv = $('<div>').addClass('location_title').append(singleOrderMealsAndRest[j].meal);
						orderFromDiv.append(mealTitleDiv);
					const fromLabelDiv = $('<div>').addClass('fromto_label').append('ОД').css({ 'padding-bottom':'0', 'border-top':'none' });
						orderFromDiv.append(fromLabelDiv);
						const test = 'Од';
					const fromLocationTitleDiv = $('<div>').addClass('location_title restaurants').attr('id', 'restaurant_name').append(singleOrderMealsAndRest[j].rest).css({'color':'blue', 'text-decoration':'underline', 'border-bottom':'1px solid #dede'});
						fromLocationTitleLink.append(fromLocationTitleDiv);
						orderFromDiv.append(fromLocationTitleLink);
					orderBox.append(orderFromDiv);
				}	

				const orderToDiv = $('<div>').addClass('order_to');
				const toLabel = $('<div>').addClass('fromto_label').append('ДО').css({ 'border-top':'none' });
					orderToDiv.append(toLabel);
				const toLocationTitleLink = $('<a>').attr({
					'href': 'https://maps.google.com/?q=' + fullOrder[0].Location,
					'target' : '_blank'
				});
				const toLocationTitleDiv = $('<div>').addClass('location_title').attr('id', 'final_destination').append(fullOrder[0].Location).css({'color':'blue', 'text-decoration':'underline'});
					toLocationTitleLink.append(toLocationTitleDiv)
					orderToDiv.append(toLocationTitleLink);
				orderBox.append(orderToDiv);

				const customerDetailsLabelDiv = $('<div>').addClass('fromto_label').append('Детали за корисникот');
				orderBox.append(customerDetailsLabelDiv);

				const orderUserInfo = $('<div>').addClass('order_user_info');
				const userFullName = $('<div>').addClass('order_user_name').append(fullOrder[0].Client_name);
					orderUserInfo.append(userFullName);
					
				const userPhoneNumberLink = $('<a>').attr('href', 'tel:' + fullOrder[0].Phone_number);
				const userPhoneNumber = $('<div>').addClass('order_user_tel').append(fullOrder[0].Phone_number).css({'color':'blue', 'text-decoration':'underline'});;
					userPhoneNumberLink.append(userPhoneNumber);
					orderUserInfo.append(userPhoneNumberLink);
				orderBox.append(orderUserInfo);

				const paymentDetailsLabel = $('<div>').addClass('fromto_label').append('Начин на плаќање');
				orderBox.append(paymentDetailsLabel);

				const paymentDetails = $('<div>').addClass('payment_details');
				const paymentMethod = $('<div>').addClass('payment_method').append('Во готово');
					paymentDetails.append(paymentMethod);
				const totalAmount = $('<div>').addClass('total_amount').append(fullOrder[0].Price + ' ' + 'ДЕН');
					paymentDetails.append(totalAmount);
				orderBox.append(paymentDetails);

				if(fullOrder[0].Order_status == 'Accepted by carrier'){
					const completeOrderLink = $('<a>');
					const completedOrderButton = $('<div>').addClass('pickup_order_btn').attr('id', fullOrder[0].ID).append('Подигини нарачка');
						completeOrderLink.append(completedOrderButton);
					orderBox.append(completeOrderLink);
				} else {
					const completeOrderLink = $('<a>');
					const completedOrderButton = $('<div>').addClass('accept_order_btn').attr('id', fullOrder[0].ID).append('Заврши нарачка');
						completeOrderLink.append(completedOrderButton);
					orderBox.append(completeOrderLink);

					const cancelOrderButtonLink = $('<a>');
					const cancelOrderButton = $('<div>').addClass('cancel_order_btn').attr('id', fullOrder[0].ID).append('Откажи нарачка');
						cancelOrderButtonLink.append(cancelOrderButton)
					orderBox.append(cancelOrderButtonLink);
				}
				

				content.append(orderBox);
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
				})
			};
			// cancel order function
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