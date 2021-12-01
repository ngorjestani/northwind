$(function () {
    filterProducts(getCheckedItem());
    
    function getCheckedItem() {
        var checkedItem = $('input[type="radio"]:checked').val();
        return checkedItem;
    }
    
    function filterProducts(checkedOption) {
        switch (checkedOption) {
            case '1':
                getInStockProducts();
                break;
            case '2':
                getLowStockProducts();
                break;
            case '3':
                getNoStockProducts();
                break;
            default:
                getAllProducts();
                break;
        }
    }
    
    function checkLowStock(item) {
        return item.unitsInStock <= item.reorderLevel ? 'low-stock ' : '';
    }
    
    function loopThroughProducts(response) {
        $('#product_rows').html("");
        for (var i = 0; i < response.length; i++){
            var row = "<tr class=\"" + checkLowStock(response[i]) + "\"" + " data-id=\"" +
                response[i].productId + "\" data-name=\""
                + response[i].productName + "\" data-price=\""
                + response[i].unitPrice + "\">"
                + "<td>" + response[i].productName + "</td>"
                + "<td class=\"text-right\">$" + response[i].unitPrice.toFixed(2) + "</td>"
                + "<td class=\"text-right\">" + response[i].unitsInStock + "</td>"
                + "<td class=\"text-right\">" + response[i].reorderLevel +  "</td>"
                + "</tr>";
            $('#product_rows').append(row);
        }
    }
    
    function getAllProducts() {
        $.getJSON({
            url: "../../api/product/discontinued/false",
            success: function(response, textStatus, jqXhr) {
                loopThroughProducts(response);                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                console.log("The following error occured: " + textStatus, errorThrown);
            }
        })
    }

    function getInStockProducts() {
        $.getJSON({
            url: "../../api/product/inventory/in_stock/true",
            success: function(response, textStatus, jqXhr) {
                loopThroughProducts(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                console.log("The following error occured: " + textStatus, errorThrown);
            }
        })
    }

    function getLowStockProducts() {
        $.getJSON({
            url: "../../api/product/inventory/low_stock",
            success: function(response, textStatus, jqXhr) {
                loopThroughProducts(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                console.log("The following error occured: " + textStatus, errorThrown);
            }
        })
    }

    function getNoStockProducts() {
        $.getJSON({
            url: "../../api/product/inventory/in_stock/false",
            success: function(response, textStatus, jqXhr) {
                $('#product_rows').html("");
                loopThroughProducts(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                console.log("The following error occured: " + textStatus, errorThrown);
            }
        })
    }
    
    $('input[type="radio"][name="stock-select"]').on('change', function(){
        filterProducts(getCheckedItem());
    });
});