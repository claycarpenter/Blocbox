$(document).ready(function () {
    // Add Item dropdown menu.
    $('.menu').dropit();

    // Small-screen nav menu.
    $('#smallNav').click(function () {
        console.log('up');
        $('#left-nav').toggleClass('open', 200);
    });
});
