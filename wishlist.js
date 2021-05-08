
let list;
let listAdd;
let itemCount;
let totalPrice;

let emailWishlist = sessionStorage.getItem('email')+2; //gets the users email from sessionStorage

getWishlist(emailWishlist);

function getWishlist($emailWishlist) {
    $.ajax({
        url: Url + 'GetCart',
        type: 'get',
        dataType: 'json',
        data: {"email":$emailWishlist},
        contentType: 'text/plain',
        success: function (data) {

            list = '';
            listAdd = '';
            itemCount = 0;
            totalPrice = 0;

            $.each(data['data']['List'], function (i, item) {
                listAdd = '<div class="row main align-items-center">\n' +
                    '                        <div class="col-2"><img class="img-fluid" src="' + item['image'] + '"></div>\n' +
                    '                        <div class="col">\n' +
                    '                            <div class="row text-muted">' + item['operating_system'] + '</div>\n' +
                    '                            <div class="row">' + item['title'] + item['code'] + '</div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col"> <a class="border">1</a></div>\n' +
                    '                        <div class="col">&dollar; ' + item['money_price'] + ' <a onclick="deleteItem(' + item['id'] + ')" type="button">&#10005;</a></div>\n' +
                                             ' <a onclick="moveToCart(' + item['id'] + ')" type="button">Move to Cart</a></div>\n' +
                    '                    </div>';
                list = list + listAdd;
                itemCount++;
                totalPrice += parseInt(item['money_price']);
            });

            $('#cart-list').html(list);
            $('#item-count').html(itemCount + ' items');
            $('#item-total').html(itemCount + ' items');
            $('#item-price').html('&dollar; ' + totalPrice);

        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}

function deleteItem($id) {

    //TODO complete implementation using the product id
    $.ajax({
        url: Url + 'Cart/' + $id,
        type: 'delete',
        dataType: 'json',
        contentType: 'text/plain',
        success: function (data) {
            alert("Deleted item successfully");
        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}

function moveToCart($id) {

    email=sessionStorage.getItem('email');
    addToCart($id);
    deleteItem($id);
    
}