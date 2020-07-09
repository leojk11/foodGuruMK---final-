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

	$.ajax({
		url: 'carrier/live-orders',
		success: function(response){
			
			const contentDiv = $('#content');
			const liveOrders = response.order;
			// console.log(liveOrders);
			// const restNames = myJson.restaurants;
			// console.log(restNames);

			if(liveOrders.length < 1) {
			    const noOrdersErrorDiv = $('<div>').addClass('error_div').css('text-align', 'center').append('Во моментов нема тековни нарачки');
			    contentDiv.append(noOrdersErrorDiv);
			};
			
			for(i = 0; i < liveOrders.length; i++) {
				const orderBoxDiv = $('<div>').addClass('orderbox');

				// order header
				const orderHeaderDiv = $('<div>').addClass('order_header');
					const orderHeaderId = $('<div>').addClass('order_header_id').append("#" + liveOrders[i].orderId);
				orderHeaderDiv.append(orderHeaderId);
					const orderTimepast = $('<div>').addClass('order_timepast').append(liveOrders[i].orderTime);
				orderHeaderDiv.append(orderTimepast);
				orderBoxDiv.append(orderHeaderDiv);
				
				// from location
				const orderFromDiv = $('<div>').addClass('order_from');
					const fromLabelDiv = $('<div>').addClass('fromto_label').append('ОД');
				orderFromDiv.append(fromLabelDiv);

				const restName = liveOrders[i].orderRestaurant.split(',');
				const restaurants = [ ...new Set(restName) ];
				// console.log(restaurants)
				if(restaurants.length < 2){
					const fromLocationDiv = $('<div>').addClass('location_title').append(restaurants);
						orderFromDiv.append(fromLocationDiv);
					orderBoxDiv.append(orderFromDiv);
				} else {
					const fromLocationDiv = $('<div>').addClass('location_title').append(restaurants + ',');
						orderFromDiv.append(fromLocationDiv);
					orderBoxDiv.append(orderFromDiv);
				}

				// final destination
				const orderToDiv = $('<div>').addClass('order_to');
					const toLabelDiv = $('<div>').addClass('fromto_label').append('ДО')
				orderToDiv.append(toLabelDiv);
					const locationTitleDiv = $('<div>').addClass('location_title').append(liveOrders[i].orderDeliveryAdress);
				orderToDiv.append(locationTitleDiv);
				orderBoxDiv.append(orderToDiv);
					
				// accept button
				const acceptOrderLink	 = $('<a>'); /* acceptOrderLink.href = '/carrier/get-clicked-order-info'*/;
					const acceptOrderButton = $('<div>').addClass('accept_order_btn').append('Прифати').attr('id', liveOrders[i].orderId);
				acceptOrderLink.append(acceptOrderButton);
				orderBoxDiv.append(acceptOrderLink);

				contentDiv.append(orderBoxDiv);
			};

			window.setInterval(function(){
				// get all live orders in certain time
				$.ajax({
					url:'carrier/live-orders',
					success: function(response){
						const contentDiv = $('#content');
						contentDiv.html('');
						const liveOrders = response.order;
						// console.log(liveOrders);

						if(liveOrders.length < 1) {
						    const noOrdersErrorDiv = $('<div>').addClass('error_div').css('text-align', 'center').append('Во моментов нема тековни нарачки');
						    contentDiv.append(noOrdersErrorDiv);
						};
						
						for(i = 0; i < liveOrders.length; i++) {
							// const restNames = myJson.restaurants;

							const orderBoxDiv = $('<div>').addClass('orderbox');
							// const orderRestaurantName = myJson.restNamesArray;

							// order header
							const orderHeaderDiv = $('<div>').addClass('order_header');
								const orderHeaderId = $('<div>').addClass('order_header_id').append("#" + liveOrders[i].orderId);
							orderHeaderDiv.append(orderHeaderId);
								const orderTimepast = $('<div>').addClass('order_timepast').append(liveOrders[i].orderTime);
							orderHeaderDiv.append(orderTimepast);
							orderBoxDiv.append(orderHeaderDiv);
							
							// from location
							const orderFromDiv = $('<div>').addClass('order_from');
								const fromLabelDiv = $('<div>').addClass('fromto_label').append('ОД');
							orderFromDiv.append(fromLabelDiv);

							const restName = liveOrders[i].orderRestaurant.split(',');
							const restaurants = [ ...new Set(restName) ];
							// console.log(restaurants)
							if(restaurants.length < 2){
								const fromLocationDiv = $('<div>').addClass('location_title').append(restaurants);
									orderFromDiv.append(fromLocationDiv);
								orderBoxDiv.append(orderFromDiv);
							} else {
								const fromLocationDiv = $('<div>').addClass('location_title').append(restaurants + ',');
									orderFromDiv.append(fromLocationDiv);
								orderBoxDiv.append(orderFromDiv);
							}

							// final destination
							const orderToDiv = $('<div>').addClass('order_to');
								const toLabelDiv = $('<div>').addClass('fromto_label').append('ДО')
							orderToDiv.append(toLabelDiv);
								const locationTitleDiv = $('<div>').addClass('location_title').append(liveOrders[i].orderDeliveryAdress);
							orderToDiv.append(locationTitleDiv);
							orderBoxDiv.append(orderToDiv);
								
							// accept button
							const acceptOrderLink	 = $('<a>'); /* acceptOrderLink.href = '/carrier/get-clicked-order-info'*/;
								const acceptOrderButton = $('<div>').addClass('accept_order_btn').append('Прифати').attr('id', liveOrders[i].orderId);
							acceptOrderLink.append(acceptOrderButton);
							orderBoxDiv.append(acceptOrderLink);

							contentDiv.append(orderBoxDiv);
						};

						$('.accept_order_btn').click(function(event){
							var orderId = this.id;

							$.ajax({
								url: 'carrier/accept-order?orderId=' + orderId,
								method: 'patch',
								success: function(response){
									if(response.message == 'order accepted'){
										$.ajax({
											url: 'carrier/change-status',
											method: 'patch',
											success: function(response){
												console.log(response);
											}
										})

										location.href = '/carrier/get-clicked-order-info?orderId=' + orderId;
									} else {
										// location.reload();
										alert('Order has already been accepted');
									}
								}

							})
						});
					}
				})
		}, 10000);

		$('.accept_order_btn').click(function(event){
			var orderId = this.id;

			$.ajax({
				url: 'carrier/accept-order?orderId=' + orderId,
				method: 'patch',
				success: function(response){
					if(response.message == 'order accepted'){
						$.ajax({
							url: 'carrier/change-status',
							method: 'patch',
							success: function(response){
								console.log(response);
							}
						})

						location.href = '/carrier/get-clicked-order-info?orderId=' + orderId;
					} else {
						// location.reload();
						alert('Order has already been accepted');
					}
				}

			})
		});
		}
	})

	window.setInterval(function(){
		location.reload();
	}, 60000);

	
})