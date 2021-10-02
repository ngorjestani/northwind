$(function(){
    var toast = new Audio('../media/toast.wav');
    
    $('.code').on('click', function(e) {
        e.preventDefault();
        
        toast.pause();
        
        toast.currentTime = 0;
        
        toast.play();

        let product = $(this).data('product');
        let discountCode = $(this).data('code');

        $('#product').html(product);
        $('#code').html(discountCode);

        $('#toast').toast({ autohide: false }).toast('show');
    });
});

$(document).on('keydown', (e) => {
    if (e.key === 'Escape') {
        $('#toast').toast('hide');
    }
});