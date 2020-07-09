$(document).ready(function(){
    const exDate = document.querySelector('#ex_date');
    const limit = document.querySelector('#limit');
    const code = document.querySelector('#code');

    const selectMenu = document.querySelector('#selectmen');

    const discountInput = document.querySelector('.discount');
    const freeblyInput = document.querySelector('.freebly');

    $('#add_promo_btn').click(function(event){
        event.preventDefault();
        let promo_type;
        let data = {
            ex_date: exDate.value,
            limit: limit.value,
            code: code.value
        };
        if(selectMenu.value == 1) {
            promoType = 'Discount';
            data.promo_discount = discountInput.value;
            data.promo_type = promoType;
        } else if (selectMenu.value == 2) {
            promoType = 'Freebly'
            data.promo_freebly = freeblyInput.value;
            data.promo_type = promoType;
        }

        const options = { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(data) }
        
        fetch('/admin/new-promo', options)
            .then((response) => { return response.json() })
            .then((promoJson) => { 
                if(promoJson.message == 'promo added'){
                    location.href = "superadmin/promo-codes";
                }
            });
    })
})