$(document).ready(function(){
	// get online carriers number
	$.ajax({
		url: 'admin/online-carriers',
		success: function(response){
			const onlineCarriersNumber = response.onlineCariersNumber;
			$('#online_carriers_numb').append(onlineCarriersNumber);
		}
	})

	// get busy carriers number
	$.ajax({
		url: 'admin/busy-carriers',
		success: function(response){
			const busyCarriersNumber = response.busyCariersNumber;
			$('#busy_carriers_numb').append(busyCarriersNumber);
		}
	})


	// get pending orders number
	$.ajax({
		url: 'admin/pending-orders',
		success: function(response){
			const pendingOrdersNumber = response.ordersNumber;
			$('#pending_orders_number').append(pendingOrdersNumber);
		}
	})


	// list all orders
	const allOrdersDiv = document.querySelector('#all_orders');

		fetch('/admin/orders')
			.then((response) => { return response.json() })
			.then((allOrdersJson) => { 
				const allOrders = allOrdersJson.orders;
				// console.log(allOrders);

				for(var i = 0; i < allOrders.length; i++){
					// const orderSnippetDiv = document.createElement('div');
					// 	orderSnippetDiv.classList.add('order_snippet');
					// 	orderSnippetDiv.classList.add('show_full_order');
					// 	orderSnippetDiv.id = 'show_full_order';
					const orderSnippetDiv = $('<div>').addClass('order_snippet show_full_order').attr({ 'id':'show_full_order' });

						const orderTimeDiv = $('<div>').addClass('order_time').append(allOrders[i].Time_ordered);
						orderSnippetDiv.append(orderTimeDiv);

						const userWaitingTimeDiv = document.createElement('div');
							userWaitingTimeDiv.classList.add('order_stopwatch');
							userWaitingTimeDiv.classList.add('user-orders-mobile');
								userWaitingTimeDiv.append('17 Min 34 Seconds');
						orderSnippetDiv.append(userWaitingTimeDiv);

						const orderIdDiv = document.createElement('div');
							orderIdDiv.classList.add('order_id');
								orderIdDiv.append(allOrders[i].ID);
						orderSnippetDiv.append(orderIdDiv);

						const orderPriceDiv = document.createElement('div');
							orderPriceDiv.classList.add('order_amount');
								orderPriceDiv.append(allOrders[i].Price + ' ' + 'ДЕН');
						orderSnippetDiv.append(orderPriceDiv);

						const orderStatusDiv = document.createElement('div');
							orderStatusDiv.classList.add('order_status');
							
								orderStatusDiv.append(allOrders[i].Order_status);
								if(allOrders[i].Order_status == 'Delivered'){
									orderStatusDiv.classList.add('delivered');
								} 
								else if (allOrders[i].Order_status == 'In Progress'){
									orderStatusDiv.classList.add('inprogress');
								}
						orderSnippetDiv.append(orderStatusDiv);
					allOrdersDiv.append(orderSnippetDiv);

					const fullOrderDiv = document.createElement('div');
						fullOrderDiv.classList.add('full_order');
						fullOrderDiv.id = 'full_order';
							const fullOrderSnippetLabelDiv = document.createElement('div');
								fullOrderSnippetLabelDiv.classList.add('order_snippet_label');

					allOrdersDiv.append(fullOrderDiv);
				}

			})
});