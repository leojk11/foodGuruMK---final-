$(document).ready(function(){ 
    const domainName = 'http://localhost:3000';

    const promoId = JSON.parse(sessionStorage.getItem('promoCodeId'));

    $.ajax({
        url: 'admin/single-promotion',
        method: 'get',
        data: {
            promoId: promoId
        },
        success: function(response){
            console.log(response);
        }
    })

    let url = new URL(domainName + '/admin/single-promotion');
    url.search = new URLSearchParams({ promoId: promoId });
    const options = { headers: { 'Content-Type':'application/json' }, params: promoId };

    fetch(url, options)
        .then((response) => { return response.json() })
        .then((promoIdJson) => {
            $("#ex-date").attr('value', promoIdJson.promotion[0].ex_date);
            $("#limit").attr('value', promoIdJson.promotion[0].Limitt);
            $("#code").attr('value', promoIdJson.promotion[0].Code);
            if(promoIdJson.promotion[0].Promo_type == "Discount"){
                $("#disc_price").attr('value', promoIdJson.promotion[0].Promo_discount);
            } else if(promoIdJson.promotion[0].Promo_type == "Freebly"){
                $("#freebly_type").attr('value', promoIdJson.promotion[0].Promo_freebly);
            }
            
            const promoValues = () => {
                let Promo_type = $("#selectmen").val();
                let data = {
                    ex_date: $("#ex-date").val(),
                    Limitt: $("#limit").val(),
                    Code: $("#code").val(),
                    Promo_discount: $("#disc_price").val(),
                    Promo_freebly: $("#freebly_type").val()
                }
                if(Promo_type == '1'){
                    data.Promo_discount = $("#disc_price").val()
                    data.Promo_type = 'Discount'
                    data.Promo_freebly = null;
                }else if(Promo_type == '2'){
                    Promo_freebly = $("#freebly_type").val();
                    data.Promo_type = 'Freebly'
                    data.Promo_discount = null;
                }

                return data;
            }

            $("#promo-save-button").on("click", (e) => {
                e.preventDefault();
                let data = promoValues();

                let url = new URL(domainName + '/admin/edit-promo');
                url.search = new URLSearchParams({ promoId: promoId });
                const options = {method: 'PUT', headers: { 'Content-Type':'application/json' }, params: promoId, body: JSON.stringify(data) };
                fetch(url, options)
                .then((response) => { return response.json() })
                .then((responseJson => { 
                    if(responseJson.message == 'promo edited'){
                        location.href = "http://localhost:3000/superadmin/promo-codes";
                    }
                
            }));
            
            })
        })

})