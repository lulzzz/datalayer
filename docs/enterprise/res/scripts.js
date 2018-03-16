(function($) {

    "use strict";

    $('body').scrollspy({
        target: '.fixed-top',
        offset: 120
    });

    new WOW().init();
    
    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('#collapsingNavbar li a').click(function() {
        /* always close responsive nav after click */
        $('.navbar-toggler:visible').click();
    });

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr("src",$(e.relatedTarget).data("src"));
    });

    $(document).ready(function(){
        var scroll_pos = 0;
        $(".nav-link").css('color', 'white');
        $(document).scroll(function() {
            scroll_pos = $(this).scrollTop();
            if(scroll_pos > 210) {
                $(".nav-link").css("color", "black");
                $(".fixed-top").css("background-color", "white");
                $("#datalayer-logo").attr("src", "img/logo-datalayer-horizontal.png")
            } else {
                $(".nav-link").css("color", "white");
                $(".fixed-top").css("background-color", "transparent");
                $("#datalayer-logo").attr("src", "img/logo-datalayer-horizontal-white.png")
            }
        });
    })

})(jQuery);
