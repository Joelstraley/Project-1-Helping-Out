$('.burger').on('click', function() {
    $(this).toggleClass('active');
    $('.overlay').toggleClass('burger-open');
});


$('nav a').on('click', function() {
    $('.burger').removeClass('active');
    $('overlay').removeClass('burger-open');
});
