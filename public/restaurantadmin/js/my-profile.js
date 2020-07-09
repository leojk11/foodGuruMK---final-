//Profile info
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        const restaurantName = myProfile.singleRestInfo[0].restName
        const restaurantLogoName = myProfile.singleRestInfo[0].restLogo
        const restLogo = $('#rest-logo').attr('src', '/restaurants/rest-logo?image=' +
            restaurantLogoName);
        $('#rest_name').text(restaurantName)
    }
})
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        const restaurantName = myProfile.singleRestInfo[0].restName
        const restaurantLogoName = myProfile.singleRestInfo[0].restLogo
        $('#rest_name-mob').text(restaurantName)
    }
})
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        const restaurantName = myProfile.singleRestInfo[0].restName
        const restaurantLogoName = myProfile.singleRestInfo[0].restLogo
        const restLogo = $('#rest-logo-mob').attr('src', '/restaurants/rest-logo?image=' +
            restaurantLogoName);
        $('#rest_name-mob').text(restaurantName)
    }
})
$(".mobile-btn").click(function () {
    $(".mobile-menu").slideToggle();
    $(".mobile-menu").css("background-color", "#4a4a4a")
});

    $.ajax({
        url: 'restaurant/my-profile',
        success: function(myProfileJson){
            const myProfile = myProfileJson.singleRestInfo;
            console.log(myProfile[0])
            const restName = $('#my_profile_name').append(myProfile[0].restName);
            const restAdress = $('#my_profile_adress').attr('value', myProfile[0]
                .restAdress);
            const restPhoneNumber = $('#my_profile_phNumber').attr('value', myProfile[0]
                .restPhoneNumber);
            const restOpeninggHour = $('#my_profile_openHr').attr('value', myProfile[0]
                .restOpeningTime);
            const restClosingHours = $('#my_profile_closeHr').attr('value', myProfile[0]
                .restClosingTime);
            const restStatus = $('.slider').attr('value', myProfile[0].restStatus)
            const restLogo = $('#addssimg').attr('src', '/restaurants/rest-logo?image=' +
                myProfile[0].restLogo);
            if (restStatus.val() == 'Offline') {
                restStatus[0].checked = true
            }
            else if (restStatus.val() == 'Online') {
                restStatus[0].checked = false
            }
            $.ajax({
                url: 'restaurant/my-work-days',
                success: function(myWorkDays){
                    const workDayData = myWorkDays.workingDaysData[0]
                    const test = $('.changeWorkDay')
                    for (let i = 0; i < test.length; i++) {
                        if (workDayData[test[i].nextSibling.innerText] == 1) {
                            test[i].checked = true
                        }
                    }
                }
            })
            
            $(document).ready(function () {
                $('#save').click(() => {
                    const test = $('.changeWorkDay')
                    let workDaysData = {}
                    for (let i = 0; i < test.length; i++) {
                        if (test[i].checked == true) {
                            workDaysData[test[i].nextSibling.innerText] = 1;
                        } else if (test[i].checked == false) {
                            workDaysData[test[i].nextSibling.innerText] = 0;
                        }
                    }
                    $.ajax({
                        url: 'restaurant/edit-restaurant-workdays',
                        method: 'put',
                        data: workDaysData,
                        success: function(){}
                    })

                    const data = {
                        restaurantLocation: restAdress.val(),
                        restaurantPhoneNumber: restPhoneNumber.val(),
                        restaurantOpens: restOpeninggHour.val(),
                        restaurantCloses: restClosingHours.val()
                    };
                    if (restStatus[0].checked == false) {
                        data.restaurantStatus = 'Online'
                    } else if (restStatus[0].checked == true) {
                        data.restaurantStatus = 'Offline'
                    }
                    if (myProfile[0].restLogo == undefined) {
                        var input = $('#real-file')[0];
                        var file = input.files[0];
                        var imageName = file.name;
                        data.restaurantImage = imageName;
                    } else {
                        data.restaurantImage = myProfile[0].restLogo
                    }
                    $.ajax({
                        url: 'restaurant/edit-restaurant-info',
                        method: 'put',
                        data: data,
                        success: function(){location.reload(true);}
                    })        
                })
            })
        }
    })
    


function clickimg() {
    document.querySelector('#real-file').click();
}
function addimg(e) {
    var input = $('#real-file')[0];
    var file = input.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        $('#addssimg').attr('src', e.target.result);
    }
}