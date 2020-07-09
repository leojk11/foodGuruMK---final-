$(document).ready(function(){
	// get all today users numb
	$.ajax({
		url: 'admin/today-users',
		success: function(response){
			$('#todays_users').append(response.todaysUsersNumb)
		}
	})

	// get overall users numb
	$.ajax({
		url: 'admin/users',
		success: function(response){
			$('#total_users').append(response.usersNumber);
		}
	})

	$('#search_box').on('keypress', event => {
		if(event.which == 13){
			event.preventDefault();
			// console.log(event.target.value)

			const userInfo = event.target.value;

			$.ajax({
				url: 'admin/search-users?info=' + userInfo,
				success: function(response){
					// console.log(response);
					const users = response.searchedUser;

					allOrdersDiv.html("");

					var i = 0;
					while(i < users.length){
						const orderSnippetDiv = $('<div>').addClass('order_snippet');

							const dateRegisteredDiv = $('<div>').addClass('order_time').append(users[i].Registration_date);
						orderSnippetDiv.append(dateRegisteredDiv);
							const userIdDiv = $('<div>').addClass('order_id').append('#' + users[i].ID);
						orderSnippetDiv.append(userIdDiv);
							const userNameDiv = $('<div>').addClass('user_name').append(users[i].Firstname + ' ' + users[i].Lastname);
						orderSnippetDiv.append(userNameDiv);
							const userOrdersDiv = $('<div>').addClass('user_orders user-orders-mobile').append(users[i].Completed_orders);
						orderSnippetDiv.append(userOrdersDiv);

							const orderViewDiv = $('<div>').addClass('orders_view user-orders-mobile');
							const orderViewButtonDiv = $('<div>').addClass('view_orders_btn').attr({ 'id':'view_all_orders' }).append('View orders');
						orderViewDiv.append(orderViewButtonDiv);
						orderSnippetDiv.append(orderViewDiv);
					
						allOrdersDiv.append(orderSnippetDiv)

						i++;
					}
				}
			})
		}
	});

	const allOrdersDiv = $('#all_orders');

	$.ajax({
		url: 'admin/users',
		success: function(response){
			const users = response.users;

			var i = 0;
			while(i < users.length){
				const orderSnippetDiv = $('<div>').addClass('order_snippet');

					const dateRegisteredDiv = $('<div>').addClass('order_time').append(users[i].signup_date);
				orderSnippetDiv.append(dateRegisteredDiv);
					const userIdDiv = $('<div>').addClass('order_id').append('#' + users[i].user_id)
				orderSnippetDiv.append(userIdDiv);
					const userNameDiv = $('<div>').addClass('user_name').append(users[i].user_full_name);
				orderSnippetDiv.append(userNameDiv);
					const userOrdersDiv = $('<div>').addClass('user_orders user-orders-mobile').append(users[i].completedOrders);
				orderSnippetDiv.append(userOrdersDiv);

					const orderViewDiv = $('<div>').addClass('orders_view user-orders-mobile');
					const orderViewButtonDiv = $('<div>').addClass('view_orders_btn').attr({ 'id':'view_all_orders' }).append('View orders');
				orderViewDiv.append(orderViewButtonDiv);
				orderSnippetDiv.append(orderViewDiv);
			
				allOrdersDiv.append(orderSnippetDiv)

				i++;
			}
		}
	})
});