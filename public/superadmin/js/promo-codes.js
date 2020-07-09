$(document).ready(function(){
    const allPromosDiv = document.querySelector('#all_promos');

    fetch('http://localhost:3000/admin/promotions')
        .then((response) => { return response.json() })
        .then((promosJson) => {
            
            const allPromos = promosJson.promotions;
            console.log(allPromos)
             
            for(var i = 0; i < allPromos.length; i++) {
                const promoCodeBoxDiv = $('<div>').addClass('promo_code_box table2');
                
                    const dateCreatedDiv = $('<div>').addClass('date-created');
                        const dateCreatedLabel = $('<div>').append(allPromos[i].Date_created)
                    dateCreatedDiv.append(dateCreatedLabel);
                    promoCodeBoxDiv.append(dateCreatedDiv);
                    
                    const promoTypeDiv = $('<div>').addClass('type-table');
                        const promoTypeLabel = $('<label>').append(allPromos[i].Promo_type);
                    promoTypeDiv.append(promoTypeLabel);
                    promoCodeBoxDiv.append(promoTypeDiv);
                    
                    const userStarticksDiv = $('<div>').addClass('user-starstic');
                    const userStarticksLabel = $('<label>');
                    if(allPromos[i].Promo_type == 'Freebly'){
                        userStarticksLabel.append(allPromos[i].Promo_freebly);
                    } else if(allPromos[i].Promo_type == 'Discount'){
                        userStarticksLabel.append(allPromos[i].Promo_discount);
                    }
                    userStarticksDiv.append(userStarticksLabel);
                    promoCodeBoxDiv.append(userStarticksDiv);
                    
                    const promoLimitDiv = $('<div>').addClass('limit-table');
                        const promoLimitLabel = $('<div>').append(allPromos[i].Limitt);
                    promoLimitDiv.append(promoLimitLabel);
                    promoCodeBoxDiv.append(promoLimitDiv);
                    
                    const exDateDiv = $('<div>').addClass('exp-date');
                        const exDateLabel = $('<div>').append(allPromos[i].ex_date);
                    exDateDiv.append(exDateLabel);
                    promoCodeBoxDiv.append(exDateDiv);
                    
                    const editDeleteButtonsDiv = $('<div>').addClass('edit-delete').attr({ 'id': allPromos[i].ID });
                    const editPromoLink = $('<a>').attr({ 'href':'superadmin/edit-promo-code' });
                    const editPromoIcon = $('<img>').addClass('far fa-edit edit').attr({ 'id': allPromos[i].ID, 'src':'superadmin/icon/editIcon' }).css({ 'width': '15px' });
                    editPromoLink.append(editPromoIcon);
                    editDeleteButtonsDiv.append(editPromoLink);
                    
                    const removePromoLink = $('<a>');
                    const removePromoIcon = $('<img>').addClass('far fa-trash-alt delete').attr({ 'id': allPromos[i].ID, 'src':'superadmin/icon/binIcon' }).css({ 'width': '15px' });
                    removePromoLink.append(removePromoIcon);
                    editDeleteButtonsDiv.append(removePromoLink);
                    
                promoCodeBoxDiv.append(editDeleteButtonsDiv)
                $('.wrap').append(promoCodeBoxDiv)
                // allPromosDiv.append(promoCodeBoxDiv);
            }
            $(".edit").on("click", (e) =>{
                sessionStorage.setItem("promoCodeId", JSON.stringify(e.target.id))
            });
            $(".delete").on("click", (e) => {
                const promoId = e.target.id

                $.ajax({
                    url: 'admin/delete-promotion?promoId=' + promoId,
                    method: 'delete',
                    success: function(response){
                        if(response.message == 'promo deleted'){
                            location.reload();
                        }
                    }
                })

            })
        })
})



$(".search_box").on('keypress', async e =>{
if(e.which == 13){
    e.preventDefault();
    console.log(event.target.value)
    let promoType = $(e.target).val()
    $('.wrap').html('')
    $(document).ready(function(){
    // alert('leo')
    const allPromosDiv = document.querySelector('#all_promos');
    

    let url = new URL('http://localhost:3000/admin/single-promotion-type');
    url.search = new URLSearchParams({ promoType: promoType });
    const options = { headers: { 'Content-Type':'application/json' }, params: promoType };
    fetch(url, options)
        .then((response) => { return response.json() })
        .then((promosJson) => {
            const allPromos = promosJson.promo;
            console.log(allPromos)
            for(var i = 0; i < allPromos.length; i++) {
                const promoCodeBoxDiv = document.createElement('div');
                    promoCodeBoxDiv.classList.add('promo_code_box');
                    promoCodeBoxDiv.classList.add('table2');

                    const dateCreatedDiv = document.createElement('div');
                        dateCreatedDiv.classList.add('date-created');
                        const dateCreatedLabel = document.createElement('LABEL');
                            dateCreatedLabel.append(allPromos[i].Date_created);
                    dateCreatedDiv.append(dateCreatedLabel);
                    promoCodeBoxDiv.append(dateCreatedDiv);

                    const promoTypeDiv = document.createElement('div');
                        promoTypeDiv.classList.add('type-table');
                        const promoTypeLabel = document.createElement('LABEL');
                            promoTypeLabel.append(allPromos[i].Promo_type);
                    promoTypeDiv.append(promoTypeLabel);
                    promoCodeBoxDiv.append(promoTypeDiv);

                    const userStarticksDiv = document.createElement('div');
                        userStarticksDiv.classList.add('user-starstic');
                        const userStarticksLabel = document.createElement('LABEL');
                            if(allPromos[i].Promo_type == 'Freebly'){
                                userStarticksLabel.append(allPromos[i].Promo_freebly);
                            } else if(allPromos[i].Promo_type == 'Discount'){
                                userStarticksLabel.append(allPromos[i].Promo_discount);
                            }
                    userStarticksDiv.append(userStarticksLabel);
                    promoCodeBoxDiv.append(userStarticksDiv);

                    const promoLimitDiv = document.createElement('div');
                        promoLimitDiv.classList.add('limit-table');
                        const promoLimitLabel = document.createElement('LABEL');
                            promoLimitLabel.append(allPromos[i].Limitt);
                    promoLimitDiv.append(promoLimitLabel);
                    promoCodeBoxDiv.append(promoLimitDiv);

                    const exDateDiv = document.createElement('div');
                        exDateDiv.classList.add('exp-date');
                        const exDateLabel = document.createElement('LABEL');
                            exDateLabel.append(allPromos[i].ex_date);
                    exDateDiv.append(exDateLabel);
                    promoCodeBoxDiv.append(exDateDiv);

                    const editDeleteButtonsDiv = document.createElement('div');
                    
                        editDeleteButtonsDiv.classList.add('edit-delete');
                        const editPromoLink = document.createElement('a');
                            editPromoLink.href = 'superadmin/edit-promo-code';
                                const editPromoIcon = document.createElement('IMG');
                                editPromoIcon.id = allPromos[i].ID;
                                    editPromoIcon.setAttribute('src', 'superadmin/icon/editIcon');
                                    editPromoIcon.style.width = '15px'
                                    editPromoIcon.classList.add('far');
                                    editPromoIcon.classList.add('fa-edit');
                                    editPromoIcon.classList.add('edit');
                        editPromoLink.append(editPromoIcon);
                        editDeleteButtonsDiv.append(editPromoLink);
                        

                        const removePromoLink = document.createElement('a');
                            removePromoLink.href = 'superadmin/edit-promo-code';
                                const removePromoIcon = document.createElement('IMG');
                                    removePromoIcon.setAttribute('src', 'superadmin/icon/binIcon');
                                    removePromoIcon.style.width = '15px';
                                    removePromoIcon.classList.add('far');
                                    removePromoIcon.classList.add('fa-trash-alt');
                                    removePromoIcon.classList.add('delete');
                        removePromoLink.append(removePromoIcon);
                        editDeleteButtonsDiv.append(removePromoLink);

                    promoCodeBoxDiv.append(editDeleteButtonsDiv)
                    $('.wrap').append(promoCodeBoxDiv)
                // allPromosDiv.append(promoCodeBoxDiv);
            }
            $(".edit-delete").on("click", (e) =>{
                sessionStorage.setItem("promoCodeId", JSON.stringify(e.target.id))
            })
            
            
        })
        
})
    

}
})