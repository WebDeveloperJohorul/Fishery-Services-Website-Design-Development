/** ==========================================================================================

  Project :   Aqovo - Responsive Multi-purpose HTML5 Template
  Author :    Themetechmount

========================================================================================== */

/** ===============

 .. Preloader
 .. header_search
 .. Fixed-header
 .. Menu
 .. Number rotator
 .. Skillbar
 .. Tab
 .. Accordion
 .. Isotope
 .. Prettyphoto
 .. Slick_slider
 .. Back to top 

 =============== */


jQuery(function($) {

    "use strict";


    /*------------------------------------------------------------------------------*/
    /* Preloader
    /*------------------------------------------------------------------------------*/
    // makes sure the whole site is loaded
    $(window).on("load", function() {
        $(".loader-blob").fadeOut(), $("#preloader").delay(300).fadeOut("slow", function() {
            $(this).remove()
        })
    })


    /*------------------------------------------------------------------------------*/
    /* header_search
    /*------------------------------------------------------------------------------*/

    $(".header_search").each(function() {
        $(".search_btn", this).on("click", function(e) {
            e.preventDefault();
            $(".header_search_content").toggleClass("on");
        });

        $(".header_search_content_inner .close_btn").on("click", function(e) {
            e.preventDefault();
            $(".header_search_content").removeClass("on");
        });
    });


    /*------------------------------------------------------------------------------*/
    /* Fixed-header
    /*------------------------------------------------------------------------------*/

    $(window).on("scroll", function() {
        if (matchMedia('only screen and (min-width: 1200px)').matches) {
            if ($(window).scrollTop() >= 50) {

                $('.ttm-stickable-header').addClass('fixed-header');
            } else {

                $('.ttm-stickable-header').removeClass('fixed-header');
            }
        }
    });


    /*------------------------------------------------------------------------------*/
    /* Menu
    /*------------------------------------------------------------------------------*/

    var menu = {
        initialize: function() {
            this.Menuhover();
        },

        Menuhover: function() {
            var getNav = $("nav.main-menu"),
                getWindow = $(window).width(),
                getHeight = $(window).height(),
                getIn = getNav.find("ul.menu").data("in"),
                getOut = getNav.find("ul.menu").data("out");

            if (matchMedia('only screen and (max-width: 1200px)').matches) {

                // Enable click event
                $("nav.main-menu ul.menu").each(function() {

                    // Dropdown Fade Toggle
                    $("a.mega-menu-link", this).on('click', function(e) {
                        e.preventDefault();
                        var t = $(this);
                        t.toggleClass('active').next('ul').toggleClass('active');
                    });

                    // Megamenu style
                    $(".megamenu-fw", this).each(function() {
                        $(".col-menu", this).each(function() {
                            $(".title", this).off("click");
                            $(".title", this).on("click", function() {
                                $(this).closest(".col-menu").find(".content").stop().toggleClass('active');
                                $(this).closest(".col-menu").toggleClass("active");
                                return false;
                                e.preventDefault();

                            });

                        });
                    });

                });
            }
        },
    };


    $('.btn-show-menu-mobile').on('click', function(e) {
        $(this).toggleClass('is-active');
        $('.menu-mobile').toggleClass('show');
        return false;
        e.preventDefault();
    });

    // Initialize
    $(document).ready(function() {
        menu.initialize();

    });



    var $bannerSlider = jQuery('.banner_slider');
    var $bannerFirstSlide = $('div.slide:first-child');

    $bannerSlider.on('init', function(e, slick) {
        var $firstAnimatingElements = $bannerFirstSlide.find('[data-animation]');
        slideanimate($firstAnimatingElements);
    });
    $bannerSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('div.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        slideanimate($animatingElements);
    });
    $bannerSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        dots: false,
        swipe: true,
        adaptiveHeight: true,
        responsive: [

            {
                breakpoint: 1200,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: false,
                    autoplaySpeed: 4000,
                    swipe: true
                }
            }
        ]
    });

    function slideanimate(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });

            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }


    /*------------------------------------------------------------------------------*/
    /* Animation on scroll: Number rotator
    /*------------------------------------------------------------------------------*/

    $("[data-appear-animation]").each(function() {
        var self = $(this);
        var animation = self.data("appear-animation");
        var delay = (self.data("appear-animation-delay") ? self.data("appear-animation-delay") : 0);

        if ($(window).width() > 959) {
            self.html('0');
            self.waypoint(function(direction) {
                if (!self.hasClass('completed')) {
                    var from = self.data('from');
                    var to = self.data('to');
                    var interval = self.data('interval');
                    self.numinate({
                        format: '%counter%',
                        from: from,
                        to: to,
                        runningInterval: 2000,
                        stepUnit: interval,
                        onComplete: function(elem) {
                            self.addClass('completed');
                        }
                    });
                }
            }, {
                offset: '85%'
            });
        } else {
            if (animation == 'animateWidth') {
                self.css('width', self.data("width"));
            }
        }
    });



    /*------------------------------------------------------------------------------*/
    /* Skillbar
    /*------------------------------------------------------------------------------*/

    $('.ttm-progress-bar').each(function() {
        $(this).find('.progress-bar').width(0);
    });

    $('.ttm-progress-bar').each(function() {

        $(this).find('.progress-bar').animate({
            width: $(this).attr('data-percent')
        }, 2000);
    });


    // Part of the code responsible for loading percentages:

    $('.progress-bar-percent[data-percentage]').each(function() {

        var progress = $(this);
        var percentage = Math.ceil($(this).attr('data-percentage'));

        $({
            countNum: 0
        }).animate({
            countNum: percentage
        }, {
            duration: 2000,
            easing: 'linear',
            step: function() {
                // What todo on every count
                var pct = '';
                if (percentage === "0") {
                    pct = Math.floor(this.countNum) + '%';
                } else {
                    pct = Math.floor(this.countNum + 1) + '%';
                }
                progress.text(pct);
            }
        });
    });


    jQuery(".ttm-circle-box").each(function() {

        var circle_box = jQuery(this);
        var fill_val = circle_box.data("fill");
        var emptyFill_val = circle_box.data("emptyfill");
        var thickness_val = circle_box.data("thickness");
        var linecap_val = circle_box.data("linecap")
        var fill_gradient = circle_box.data("gradient");
        var startangle_val = (-Math.PI / 4) * 1.5;
        if (fill_gradient != "") {
            fill_gradient = fill_gradient.split("|");
            fill_val = {
                gradient: [fill_gradient[0], fill_gradient[1]]
            };
        }
        if (typeof jQuery.fn.circleProgress == "function") {
            var digit = circle_box.data("digit");
            var before = circle_box.data("before");
            var after = circle_box.data("after");
            var digit = Number(digit);
            var short_digit = digit / 100;
            var size_val = circle_box.data("size");
            jQuery(".ttm-circle", circle_box)
                .circleProgress({
                    value: 0,
                    duration: 8000,
                    size: size_val,
                    startAngle: startangle_val,
                    thickness: thickness_val,
                    linecap: linecap_val,
                    emptyFill: emptyFill_val,
                    fill: fill_val
                })
                .on("circle-animation-progress", function(event, progress, stepValue) {

                    circle_box.find(".ttm-fid-number").html(before + Math.round(stepValue * 100) + after);
                });
        }
        circle_box.waypoint(
            function(direction) {

                if (!circle_box.hasClass("completed")) {
                    if (typeof jQuery.fn.circleProgress == "function") {
                        jQuery(".ttm-circle", circle_box).circleProgress({
                            value: short_digit
                        });
                    }
                    circle_box.addClass("completed");
                }
            }, {
                offset: "90%"
            }
        );
    });


    jQuery(document).ready(function($) {
        aqovo_logMarginPadding_content();
    });

    function aqovo_logMarginPadding_content() {
        jQuery(".ttm-expandcontent-yes").each(function() {
            var ttm_column_div = '';
            var scrren_size = jQuery(window).width();
            var box_size = jQuery(this).parent().width();
            var extra_size = (scrren_size - box_size) / 2;

            if (jQuery(this).hasClass('ttm-right-span')) {
                ttm_column_div = ', .ttm-expandcontent_column > .ttm-expandcontent_wrapper ';
                jQuery('.ttm-expandcontent_column > div' + ttm_column_div, jQuery(this)).css('margin-right', '-' + extra_size + 'px');
            } else if (jQuery(this).hasClass('ttm-left-span')) {
                ttm_column_div = ', .ttm-expandcontent_column > .ttm-expandcontent_wrapper ';
                jQuery('.ttm-expandcontent_column > div' + ttm_column_div, jQuery(this)).css('margin-left', '-' + extra_size + 'px');
            }

        });
    }
    jQuery(window).resize(function() {
        aqovo_logMarginPadding_content();
    });


    /*------------------------------------------------------------------------------*/
    /* Tab
    /*------------------------------------------------------------------------------*/

    $('.ttm-tabs > .tabs').children('li').on('click', function(e) {

        var tab = $(this).closest('.ttm-tabs > .tabs > .tab'),

            index = $(this).closest('.ttm-tabs > .tabs > li').index();

        $(this).parents('.ttm-tabs').children('.tabs').children('li.active ').removeClass('active');

        $(this).addClass('active');
        $(this).addClass('active').parents('.ttm-tabs').children('.content-tab').find('.content-inner').not('.content-inner:eq(' + index + ')').slideUp();
        $(this).addClass('active').parents('.ttm-tabs').children('.content-tab').find('.content-inner:eq(' + index + ')').slideDown();

        e.preventDefault();
    });


    /*------------------------------------------------------------------------------*/
    /* Accordion
    /*------------------------------------------------------------------------------*/

    var allPanels = $('.accordion > .toggle').children('.toggle-content').hide();

    $('.toggle-title').on('click', function(e) {

        e.preventDefault();
        var $this = $(this);
        $this.parent().parent().find('.toggle .toggle-title a').removeClass('active');

        if ($this.next().hasClass('show')) {

            $this.next().removeClass('show');
            $this.next().slideUp('easeInExpo');

        } else {
            $this.parent().parent().find('.toggle .toggle-content').removeClass('show');
            $this.parent().parent().find('.toggle .toggle-content').slideUp('easeInExpo');
            $this.next().toggleClass('show');
            $this.next().removeClass('show');
            $this.next().slideToggle('easeInExpo');
            $this.next().parent().children().children().addClass('active');

        }

    });



    /*------------------------------------------------------------------------------*/
    /* Isotope
    /*------------------------------------------------------------------------------*/

    $(function() {

        if ($().isotope) {
            var $container = $('.isotope-project');
            $container.imagesLoaded(function() {
                $container.isotope({
                    itemSelector: '',
                    transitionDuration: '1s',
                });
            });

            $('.portfolio-filter li').on('click', function() {
                var selector = $(this).find("a").attr('data-filter');
                $('.portfolio-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({
                    filter: selector
                });
                return false;
            });
        };

    });



    /*------------------------------------------------------------------------------*/
    /* Prettyphoto
    /*------------------------------------------------------------------------------*/
    $(function() {

        // Normal link
        jQuery('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]').each(function() {
            if (jQuery(this).attr('target') != '_blank' && !jQuery(this).hasClass('prettyphoto')) {
                var attr = $(this).attr('rel');
                if (typeof attr !== typeof undefined && attr !== false && attr != 'prettyPhoto') {
                    jQuery(this).attr('data-rel', 'prettyPhoto');
                }
            }
        });

        jQuery('a[data-rel^="prettyPhoto"]').prettyPhoto();
        jQuery('a.ttm_prettyphoto').prettyPhoto();
        jQuery('a[rel^="prettyPhoto"]').prettyPhoto();
    });
   /* $(document).ready(function() {
        var e = '<div class="prt_floting_customsett">' +
            '<a href="https://support.preyantechnosys.com/" class="tmtheme_fbar_icons"><i class="fa fa-headphones"></i><span>Support</span></a>' +
            '<a href="https://preyantechnosys.com/" class="tmtheme_fbar_icons"><i class="themifyicon themifyicon ti-pencil"></i><span>Customization</span></a>' +
            '<a href="https://1.envato.market/LP2bzO" class="tmtheme_fbar_icons"><i class="themifyicon ti-shopping-cart"></i><span class="buy_link">Buy<span></span></span></a>' +
            '<div class="clearfix"></div>' +
            '</div>';

        $('body').append(e);
    });*/



    $(window).on('load', function() {

        function gridMasonry() {
            var grid = $(".masonry-grid")
            if (grid.length) {

                grid.isotope({
                    itemSelector: '.masonry-grid-item',
                    percentPosition: true,
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.grid-sizer',
                    },
                });

            }
        }
        gridMasonry();
    });

    /*------------------------------------------------------------------------------*/
    /* Slick_slider
    /*------------------------------------------------------------------------------*/
    $(".slick_slider").slick({
        speed: 1000,
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: false,
        centerMode: false,

        responsive: [{

                breakpoint: 1360,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    /*------------------------------------------------------------------------------*/
    /* Back to top
    /*------------------------------------------------------------------------------*/

    // ===== Scroll to Top ==== 
    jQuery('#totop').hide();

    $(window).on("scroll", function() {
        if (jQuery(this).scrollTop() >= 500) { // If page is scrolled more than 50px
            jQuery('#totop').fadeIn(200); // Fade in the arrow
            jQuery('#totop').addClass('top-visible');
        } else {
            jQuery('#totop').fadeOut(200); // Else fade out the arrow
            jQuery('#totop').removeClass('top-visible');
        }
    });

    jQuery('#totop').on("click", function() { // When arrow is clicked
        jQuery('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
        return false;
    });



});