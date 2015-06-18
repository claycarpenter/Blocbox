$(document).ready(function () {
    // Enable dropdown menus.
    $('.menu').dropit();

    // Small-screen nav menu.
    $('#smallNav').click(function () {
        console.log('up');
        $('#left-nav').toggleClass('open', 200);
    });
});
