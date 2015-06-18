$(document).ready(function () {
    // Enable dropdown menus.
    $('.menu').dropit();

    // Small-screen nav menu.
    $('#smallNav').click(function () {
        $('#left-nav').toggleClass('open', 200);
    });

    // Prevents mock links from bouncing user view back to
    // the top of the page.
    $('a[href="#"]').click(function (event) {
        event.preventDefault();
    });
});
