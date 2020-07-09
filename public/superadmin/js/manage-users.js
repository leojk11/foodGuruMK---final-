$(document).ready(function(){
	const domainName = 'http://localhost:3000';

	// get all users
	fetch('/admin/users')
		.then((response) => { return response.json() })
		.then((usersJson) => {
			console.log(usersJson);
			const users = usersJson.users;
			const allOrdersDiv = document.querySelector('#all_orders');


			for(var i = 0; i < users.length; i++) {
				const usersSnippetDiv = document.createElement('div');
					usersSnippetDiv.classList.add('order_snippet');
					const userDateRegisteredDiv = document.createElement('div');
						userDateRegisteredDiv.classList.add('order_time');
							userDateRegisteredDiv.append(users[i].signup_date);
					usersSnippetDiv.append(userDateRegisteredDiv);

					const userIdDiv = document.createElement('div');
						userIdDiv.classList.add('order_id');
							userIdDiv.append(users[i].user_id);
					usersSnippetDiv.append(userIdDiv);

					const userFullNameDiv = document.createElement('div');
						userFullNameDiv.classList.add('user_name');
							userFullNameDiv.append(users[i].user_full_name);
					usersSnippetDiv.append(userFullNameDiv);

					const userStatusDiv = document.createElement('div');
						userStatusDiv.classList.add('order_id');
							userStatusDiv.append(users[i].userStatus);
					usersSnippetDiv.append(userStatusDiv);

					const editUserButtonLink = document.createElement('div');
						editUserButtonLink.href = 'edit-user.php';
							const editOrderLinkButtonDiv = document.createElement('div');
								editOrderLinkButtonDiv.classList.add('orders_view');
									const editUserButtonImage = document.createElement('IMG');
										editUserButtonImage.src = 'superadmin/icon/editIcon';
					editOrderLinkButtonDiv.append(editUserButtonImage);
					editUserButtonLink.append(editOrderLinkButtonDiv);
					usersSnippetDiv.append(editUserButtonLink);


				allOrdersDiv.append(usersSnippetDiv);
			}
		})


	$('#search_box').on('keypress', event => {
		if(event.which == 13){

			const userInfo = document.querySelector('#search_box');

			let url = new URL(domainName + '/admin/single-user');
			url.search = new URLSearchParams({ userInfo: userInfo.value });
			const options = { headers: { 'Content-Type':'application/json' }, params: userInfo };

			fetch(url, options)
				.then((response) => { return response.json() })
				.then((userJson) => {
					const allUsersSnippetDiv = document.querySelector('#all_orders');
					allUsersSnippetDiv.innerHTML = '';

					const usersSnippetLabel = document.createElement('div');
						usersSnippetLabel.classList.add('order_snippet_label');
						const searchedUserRegTimeLabel = document.createElement('div');
							searchedUserRegTimeLabel.classList.add('user_time');
							searchedUserRegTimeLabel.style.backgroundColor = '#f6f7f9';
							searchedUserRegTimeLabel.append('Singup date');
						usersSnippetLabel.append(searchedUserRegTimeLabel);
						const searchedUserIdDivLabel = document.createElement('div');
							searchedUserIdDivLabel.classList.add('order_id');
							searchedUserIdDivLabel.append('User ID');
						usersSnippetLabel.append(searchedUserIdDivLabel);
						const searchedUserNameDivLabel = document.createElement('div');
							searchedUserNameDivLabel.classList.add('user_name');
							searchedUserNameDivLabel.append('User Full Name');
						usersSnippetLabel.append(searchedUserNameDivLabel);
						const userStatusDivLabel = document.createElement('div');
							userStatusDivLabel.classList.add('order_id');
							userStatusDivLabel.append('User Status');
						usersSnippetLabel.append(userStatusDivLabel);
						const userOrdersDivLabel = document.createElement('div');
							userOrdersDivLabel.classList.add('user_orders');
							userOrdersDivLabel.append('Edit User');
						usersSnippetLabel.append(userOrdersDivLabel);
					allUsersSnippetDiv.append(usersSnippetLabel);

					const users = userJson.user;

					for(var i = 0; i < users.length; i++){
						const usersSnippetDiv = document.createElement('div');
						usersSnippetDiv.classList.add('order_snippet');
						const userDateRegisteredDiv = document.createElement('div');
							userDateRegisteredDiv.classList.add('order_time');
								userDateRegisteredDiv.append(users[i].Registration_date);
						usersSnippetDiv.append(userDateRegisteredDiv);

						const userIdDiv = document.createElement('div');
							userIdDiv.classList.add('order_id');
								userIdDiv.append(users[i].ID);
						usersSnippetDiv.append(userIdDiv);

						const userFullNameDiv = document.createElement('div');
							userFullNameDiv.classList.add('user_name');
								userFullNameDiv.append(users[i].Firstname + ' ' + users[i].Lastname);
						usersSnippetDiv.append(userFullNameDiv);

						const userStatusDiv = document.createElement('div');
							userStatusDiv.classList.add('order_id');
								userStatusDiv.append(users[i].Status);
						usersSnippetDiv.append(userStatusDiv);

						const editUserButtonLink = document.createElement('div');
							editUserButtonLink.href = 'edit-user.php';
								const editOrderLinkButtonDiv = document.createElement('div');
									editOrderLinkButtonDiv.classList.add('orders_view');
										const editUserButtonImage = document.createElement('IMG');
											editUserButtonImage.src = 'icons/edit.png';
						editOrderLinkButtonDiv.append(editUserButtonImage);
						editUserButtonLink.append(editOrderLinkButtonDiv);
						usersSnippetDiv.append(editUserButtonLink);

						allUsersSnippetDiv.append(usersSnippetDiv);
					}

			});
		}
	});
});