$(document).ready(function(){
    // get all carriers
    $.ajax({
        url: 'admin/cariers',
        success: function(response){
            const allCarriersDiv = $('#all_carriers');

            const carrier = response.cariers;

            for(var i = 0; i < carrier.length; i++){
                const carrierInfoWapper = $('<div>').addClass('bigmeal_single');

                    const singleCarrierImgDiv = $('<div>').addClass('singlemeal_img');
						const singleCarrierImg = $('<img>').attr('src', '/superadmin/getCarrierImage?image=' + carrier[i].image);                       
                        singleCarrierImgDiv.append(singleCarrierImg);
                    carrierInfoWapper.append(singleCarrierImgDiv);

                    const carrierTrippleInfoBox = $('<div>').addClass('tripleinfobox').css({ 'width':'220px' });
                        const singleCarrierName = $('<div>').addClass('single_mealtitle').append(carrier[i].fistname + ' ' + carrier[i].lastname);
                        carrierTrippleInfoBox.append(singleCarrierName);

                        const singleCarrierPhoneNumber = $('<div>').addClass('single_mealdesc');
                            const singleCarrierPhoneNumberLabelSpan = $('<span>').addClass('smalliconlabel');
                                const singleCarrierPhoneNumberIcon = $('<img>').attr('src', 'superadmin/phoneIcon');
                                singleCarrierPhoneNumberLabelSpan.append(singleCarrierPhoneNumberIcon);
                            singleCarrierPhoneNumber.append(singleCarrierPhoneNumberLabelSpan);
                            singleCarrierPhoneNumber.append(carrier[i].phoneNumber);
                        carrierTrippleInfoBox.append(singleCarrierPhoneNumber);

                        const singleCarrierLocationsDiv = $('<div>').addClass('single_ingredients');
                            const singleCarrierLocationSpan = $('<div>').addClass('single_ing').append(carrier[i].city);
                            singleCarrierLocationsDiv.append(singleCarrierLocationSpan);
                        carrierTrippleInfoBox.append(singleCarrierLocationsDiv);

                        const singleCarrierWorkingHoursDiv = $('<div>').addClass('byrestaurantlabel');
                            const singleCarrierWorkingHoursLabelSpan = $('<div>').addClass('smalliconlabel');
                                const singleCarrierWorkingHoursIcon = $('<image>').attr('src', 'superadmin/clockIcon');
                                singleCarrierWorkingHoursLabelSpan.append(singleCarrierWorkingHoursIcon);
                        singleCarrierWorkingHoursDiv.append(singleCarrierWorkingHoursLabelSpan);
                        singleCarrierWorkingHoursLabelSpan.append(carrier[i].hoursAvailable);
                    carrierTrippleInfoBox.append(singleCarrierWorkingHoursDiv);
                carrierInfoWapper.append(carrierTrippleInfoBox);

                    const carrierRevenue = $('<div>').addClass('carrier-revenue');
                        const revenueTitle = $('<span>').append('Заработка од');
                    carrierRevenue.append(revenueTitle);
                        const selectDay = $('<select>').addClass('select-day').attr({ 'id':carrier[i].id });
                            const pleaseSelectOption = $('<option>').attr({ 'value':'0' }).append('Choose day');
                            const thisDayOption = $('<option>').attr({ 'id':'today_revenue', 'value':'1' }).append('Овој ден');
                            const thisWeekOption = $('<option>').attr({ 'value':'2' }).append('Оваа седмица');
                            const thisMonthOption = $('<option>').attr({ 'value':'3' }).append('Овој месец');
                        selectDay.append(pleaseSelectOption);
                        selectDay.append(thisDayOption);
                        selectDay.append(thisWeekOption);
                        selectDay.append(thisMonthOption);
                    carrierRevenue.append(selectDay);
                        const revenueLabel = $('<label>').attr({ 'id':'carr-revenue'+carrier[i].id }).addClass('carr-revenue');
                            // const revenueLabelSmall = $('<small>');
                        // revenueLabel.append(revenueLabelSmall);
                    carrierRevenue.append(revenueLabel);
                carrierInfoWapper.append(carrierRevenue);

                    const catPositionDiv = $('<div>').addClass('cat_position');
                        const posNumDiv = $('<div>').addClass('pos_num');
                            const sliderDiv = $('<div>').addClass('slider_switch');
                                const liveIconDiv = $('<div>').addClass('live_icon');
                            sliderDiv.append(liveIconDiv);
                        posNumDiv.append(sliderDiv);
                    catPositionDiv.append(posNumDiv);
                        const onlineStatusDiv = $('<div>').addClass('mid_label').append(carrier[i].onlineStatus.toUpperCase());
                            if(carrier[i].onlineStatus == 'Offline'){
                                liveIconDiv.css({ 'background-color':'red' });
                                onlineStatusDiv.css({ 'color':'red' });
                            }
                    catPositionDiv.append(onlineStatusDiv);
                carrierInfoWapper.append(catPositionDiv);


                    const carrierEditRemoveButtons = $('<div>').addClass('cat_stats');
                        const editButtonDiv = $('<div>').addClass('cat_edits edit_button').attr('id', carrier[i].id);
                            const editButtonLink = $('<a>');
                                // editButtonLink.href = 'superadmin/edit-carrier';
                                const editButtonIconDiv = $('<div>').addClass('cat_icon');
                                    const editButtonIcon = $('<img>').attr('src', 'superadmin/icon/editIcon');
                                editButtonIconDiv.append(editButtonIcon);
                            editButtonLink.append(editButtonIconDiv);
                        editButtonDiv.append(editButtonLink);
                    carrierEditRemoveButtons.append(editButtonDiv);
                        const removeButtonDiv = $('<div>').addClass('cat_edits remove_button').attr({ 'id': carrier[i].id });
                            const removeButtonIconDiv = $('<div>').addClass('cat_icon');
                                const removeButtonIcon = $('<img>').attr({'src':'superadmin/icon/binIcon'});
                            removeButtonIconDiv.append(removeButtonIcon);
                        removeButtonDiv.append(removeButtonIconDiv);
                    carrierEditRemoveButtons.append(removeButtonDiv);
                carrierInfoWapper.append(carrierEditRemoveButtons);

                allCarriersDiv.append(carrierInfoWapper);
            }
            
            
            $('.edit_button').click(function(event){
				event.preventDefault()
                var carrierId = this.id;

                location.href = 'superadmin/edit-carrier?carrierId=' + carrierId;
			})

            $('.remove_button').click(function(event){
                event.preventDefault();
                var carrierId = this.id

                $.ajax({
                    url: 'admin/delete-carrier?carrierId=' + carrierId,
                    method: 'delete',
                    success: function(response){
                        if(response.message == 'carrier removed'){
                            location.reload();
                        }
                    }
                })
            })

            $('.select-day').change(function(){
                const val = this.value;
                const carrierId = this.id;
                // console.log(carrierId);

                $.ajax({
                    url: 'admin/carrier-revenue?carrierId=' + carrierId,
                    data: { value: val },
                    success: function(response){
                        // console.log(response);
                        $('#carr-revenue'+carrierId).html(' ');
                        $('#carr-revenue'+carrierId).append(response.finalRevenue + ' ден.');
                    }
                })
                
            })

            $(".search_box").on('keypress', async e =>{
                if(e.which == 13){
                    e.preventDefault();
                    // console.log(event.target.value)

                    const carrInfo = event.target.value;

                    $.ajax({
                        url: 'admin/search-carriers?carrInfo=' + carrInfo,
                        success: function(response){
                            // console.log(response);

                            const carrier = response.carriers;

                            $('.bigmeal_single').css({ 'display':'none' });

                            for(var i = 0; i < carrier.length; i++){
                                const carrierInfoWapper = $('<div>').addClass('bigmeal_single');
                
                                    const singleCarrierImgDiv = $('<div>').addClass('singlemeal_img');
                                        const singleCarrierImg = $('<img>').attr('src', '/superadmin/getCarrierImage?image=' + carrier[i].image);                       
                                        singleCarrierImgDiv.append(singleCarrierImg);
                                    carrierInfoWapper.append(singleCarrierImgDiv);
                
                                    const carrierTrippleInfoBox = $('<div>').addClass('tripleinfobox');
                                        const singleCarrierName = $('<div>').addClass('single_mealtitle').append(carrier[i].fistname + ' ' + carrier[i].lastname);
                                        carrierTrippleInfoBox.append(singleCarrierName);
                
                                        const singleCarrierPhoneNumber = $('<div>').addClass('single_mealdesc');
                                            const singleCarrierPhoneNumberLabelSpan = $('<span>').addClass('smalliconlabel');
                                                const singleCarrierPhoneNumberIcon = $('<img>').attr('src', 'superadmin/phoneIcon');
                                                singleCarrierPhoneNumberLabelSpan.append(singleCarrierPhoneNumberIcon);
                                            singleCarrierPhoneNumber.append(singleCarrierPhoneNumberLabelSpan);
                                            singleCarrierPhoneNumber.append(carrier[i].phoneNumber);
                                        carrierTrippleInfoBox.append(singleCarrierPhoneNumber);
                
                                        const singleCarrierLocationsDiv = $('<div>').addClass('single_ingredients');
                                            const singleCarrierLocationSpan = $('<div>').addClass('single_ing').append(carrier[i].city);
                                            singleCarrierLocationsDiv.append(singleCarrierLocationSpan);
                                        carrierTrippleInfoBox.append(singleCarrierLocationsDiv);
                
                                        const singleCarrierWorkingHoursDiv = $('<div>').addClass('byrestaurantlabel');
                                            const singleCarrierWorkingHoursLabelSpan = $('<div>').addClass('smalliconlabel');
                                                const singleCarrierWorkingHoursIcon = $('<image>').attr('src', 'superadmin/clockIcon');
                                                singleCarrierWorkingHoursLabelSpan.append(singleCarrierWorkingHoursIcon);
                                        singleCarrierWorkingHoursDiv.append(singleCarrierWorkingHoursLabelSpan);
                                        singleCarrierWorkingHoursLabelSpan.append(carrier[i].hoursAvailable);
                                    carrierTrippleInfoBox.append(singleCarrierWorkingHoursDiv);
                                carrierInfoWapper.append(carrierTrippleInfoBox);
                
                                    const catPositionDiv = $('<div>').addClass('cat_position');
                                        const posNumDiv = $('<div>').addClass('pos_num');
                                            const sliderDiv = $('<div>').addClass('slider_switch');
                                                const liveIconDiv = $('<div>').addClass('live_icon');
                                            sliderDiv.append(liveIconDiv);
                                        posNumDiv.append(sliderDiv);
                                    catPositionDiv.append(posNumDiv);
                                        const onlineStatusDiv = $('<div>').addClass('mid_label').append(carrier[i].onlineStatus.toUpperCase());
                                            if(carrier[i].onlineStatus == 'Offline'){
                                                liveIconDiv.css({ 'background-color':'red' });
                                                onlineStatusDiv.css({ 'color':'red' });
                                            }
                                    catPositionDiv.append(onlineStatusDiv);
                                carrierInfoWapper.append(catPositionDiv);
                
                
                                    const carrierEditRemoveButtons = $('<div>').addClass('cat_stats');
                                        const editButtonDiv = $('<div>').addClass('cat_edits edit_button').attr('id', carrier[i].id);
                                            const editButtonLink = $('<a>');
                                                // editButtonLink.href = 'superadmin/edit-carrier';
                                                const editButtonIconDiv = $('<div>').addClass('cat_icon');
                                                    const editButtonIcon = $('<img>').attr('src', 'superadmin/icon/editIcon');
                                                editButtonIconDiv.append(editButtonIcon);
                                            editButtonLink.append(editButtonIconDiv);
                                        editButtonDiv.append(editButtonLink);
                                    carrierEditRemoveButtons.append(editButtonDiv);
                                        const removeButtonDiv = $('<div>').addClass('cat_edits remove_button').attr({ 'id': carrier[i].id });
                                            const removeButtonIconDiv = $('<div>').addClass('cat_icon');
                                                const removeButtonIcon = $('<img>').attr({'src':'superadmin/icon/binIcon'});
                                            removeButtonIconDiv.append(removeButtonIcon);
                                        removeButtonDiv.append(removeButtonIconDiv);
                                    carrierEditRemoveButtons.append(removeButtonDiv);
                                carrierInfoWapper.append(carrierEditRemoveButtons);
                
                                allCarriersDiv.append(carrierInfoWapper);
                            }

                        }
                    })
                }
            })
   
        } 
    })
});