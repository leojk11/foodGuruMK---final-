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

    // get my today revenue
	$.ajax({
		url: 'carrier/my-today-revenue',
		success: function(response){
			$('#today_revenue').append(response.finalRevenue + 'МКД');
		}
	})

	// get my weekly revenue
	$.ajax({
		url: 'carrier/this-week-revenue',
		success: function(response){
			$('#this_week_revenue').append(response.finalRevenue + 'МКД');
		}
	})

	// get my this month revenue
	$.ajax({
		url: 'carrier/this-month-revenue',
		success: function(response){
			$('#this_mounth_revenue').append(response.finalRevenue + 'МКД');
		}
	})

	// get my overall revenue
	$.ajax({
		url: 'carrier/my-revenue',
		success: function(response){
			$('#overall_revenue').append(response.finalRevenue + 'МКД');
		}
	})
});