jQuery(window).scroll(function () {
  jQuery(this).scrollTop() > 200 ? jQuery(".header_main_container").addClass("sticky") : jQuery(".header_main_container").removeClass("sticky");
});

//////MOBILE MENIU//////

jQuery('document').ready(function() {
  var screenHeight = jQuery(window).height();
    var screenWidth = jQuery(window).width();
    var navHeight = jQuery('#main-nav').height();
    var contentHeight = screenHeight - navHeight;
  
  var delay = 300;
    jQuery('.nav-item').each(function() {
        jQuery(this).css('transition-delay', delay + 'ms');
        delay = delay + 100;
    });
  
    jQuery('.nav-item').each(function() {
        if (jQuery(this).next().is('.sub-nav')) {
            jQuery(this).addClass('arrowed');
        } else {};
    });
    jQuery('#bun').click(function() {
        closeOut()
    });
    jQuery('#spun').click(function() {
      closeOut()
  });
    jQuery('#content').click(function() {
        if (jQuery('#container').hasClass('body-slide')) {
            closeOut()
        } else {};
    });
    jQuery('.arrowed').click(function() {
        jQuery(this).toggleClass('selected');
        jQuery(this).siblings().removeClass("selected");
        jQuery('.sub-nav').each(function() {
            jQuery(this).slideUp("slow");
        });
        if (jQuery(this).next('.sub-nav').is(':visible')) {
            jQuery(this).next('.sub-nav').slideUp('slow');
        } else {
            jQuery(this).next('.sub-nav').slideDown('slow');
        };
    });
});

function closeOut() {
    jQuery('body').toggleClass('scroll-jam');
    jQuery('#sidebar').toggleClass('nav-slide');
    jQuery('#container').toggleClass('body-slide');
    jQuery('.nav-item').toggleClass('item-slide');
    jQuery('.nav-item').removeClass('selected');
    jQuery('.sub-nav').each(function() {
        jQuery(this).hide();
    });
    triangleRezise()
}

function triangleRezise(){
  if(jQuery('#container').hasClass('body-slide')) {
    jQuery('.triangle').css('transition', '300ms ease');
    var screenHeight = jQuery(window).height();
    var screenWidth = jQuery(window).width();
    var navHeight = jQuery('#main-nav').height();
    var triangleHeight = screenHeight - navHeight;
    var triangleWidth = screenWidth - 300;
    var triangleWidth = triangleWidth / 3;
    var triangleWidth = triangleWidth * 2;
    var triangleHeight = triangleHeight * 2;
    var triangleHeight = "" + triangleHeight + "px ";
    var triangleWidth = "" + triangleWidth + "px ";
    var triangle = triangleHeight + triangleWidth + "0px 0px";
    jQuery('.triangle').css("border-width", triangle);
  }
  else{
    var screenHeight = jQuery(window).height();
    var screenWidth = jQuery(window).width();
    var navHeight = jQuery('#main-nav').height();
    var triangleHeight = screenHeight - navHeight;
   var triangleWidth = screenWidth / 3;
    var triangleWidth = triangleWidth * 2;
    var triangleHeight = triangleHeight * 2;
    var triangleHeight = "" + triangleHeight + "px ";
    var triangleWidth = "" + triangleWidth + "px ";
    var triangle = triangleHeight + triangleWidth + "0px 0px";
    jQuery('.triangle').css("border-width", triangle);
    setTimeout(function() {
        jQuery('.triangle').css('transition', 'none');
    }, 300);
};
};
triangleRezise();
jQuery(window).resize(function() {
  triangleRezise()
});


// MOBILE NAV

"use strict";

class SideNav {
constructor() {
  this.sideNavEl = document.querySelector(".js-side-nav");
  this.sideNavContainerEl = document.querySelector(".js-side-nav-container");
  this.showButtonEl = document.querySelector(".js-menu-open");
  this.closeButtonEl = document.querySelector(".js-menu-close");

  this.openSideNav = this.openSideNav.bind(this);
  this.closeSideNav = this.closeSideNav.bind(this);
  this.blockClicks = this.blockClicks.bind(this);
  this.onTransitionEnd = this.onTransitionEnd.bind(this);

  this.addEventListeners();
}

addEventListeners() {
  this.showButtonEl.addEventListener("click", this.openSideNav);
  this.closeButtonEl.addEventListener("click", this.closeSideNav);
  this.sideNavEl.addEventListener("click", this.blockClicks);
  this.sideNavContainerEl.addEventListener("click", this.closeSideNav);
}

blockClicks(evt) {
  evt.stopPropagation();
}

onTransitionEnd(evt) {
  this.sideNavContainerEl.classList.remove("side-nav-animatable");
  this.sideNavContainerEl.removeEventListener(
    "transitionend",
    this.onTransitionEnd
  );
}

openSideNav() {
  this.sideNavContainerEl.classList.add("side-nav-animatable");
  this.sideNavContainerEl.classList.add("side-nav-visible");
  this.sideNavContainerEl.addEventListener(
    "transitionend",
    this.onTransitionEnd
  );
}

closeSideNav() {
  this.sideNavContainerEl.classList.add("side-nav-animatable");
  this.sideNavContainerEl.classList.remove("side-nav-visible");
  this.sideNavContainerEl.addEventListener(
    "transitionend",
    this.onTransitionEnd
  );
}
}

new SideNav();


// STICKY SIDEBAR
//STICKY SYDEBAR
jQuery(function() {
	jQuery('.sticky_sydebar').StickySidebar({
       // Settings
       additionalMarginTop: 130
     });
});


(function ($) {
    $.fn.StickySidebar = function (options) {
        var defaults = {
            'containerSelector': '',
            'additionalMarginTop': 0,
            'additionalMarginBottom': 0,
            'updateSidebarHeight': true,
            'minWidth': 0,
            'disableOnResponsiveLayouts': true,
            'sidebarBehavior': 'modern'
        };
        options = $.extend(defaults, options);

        // Validate options
        options.additionalMarginTop = parseInt(options.additionalMarginTop) || 0;
        options.additionalMarginBottom = parseInt(options.additionalMarginBottom) || 0;

        tryInitOrHookIntoEvents(options, this);

        // Try doing init, otherwise hook into window.resize and document.scroll and try again then.
        function tryInitOrHookIntoEvents(options, $that) {
            var success = tryInit(options, $that);

            if (!success) {
                console.log('TST: Body width smaller than options.minWidth. Init is delayed.');

                jQuery(document).scroll(function (options, $that) {
                    return function (evt) {
                        var success = tryInit(options, $that);

                        if (success) {
                            jQuery(this).unbind(evt);
                        }
                    };
                }(options, $that));
                jQuery(window).resize(function (options, $that) {
                    return function (evt) {
                        var success = tryInit(options, $that);

                        if (success) {
                            jQuery(this).unbind(evt);
                        }
                    };
                }(options, $that))
            }
        }

        // Try doing init if proper conditions are met.
        function tryInit(options, $that) {
            if (options.initialized === true) {
                return true;
            }

            if (jQuery('body').width() < options.minWidth) {
                return false;
            }

            init(options, $that);

            return true;
        }

        // Init the sticky sidebar(s).
        function init(options, $that) {
            options.initialized = true;

            // Add CSS
            jQuery('head').append(jQuery('<style>.StickySidebar:after {content: ""; display: table; clear: both;}</style>'));

            $that.each(function () {
                var o = {};

                o.sidebar = jQuery(this);

                // Save options
                o.options = options || {};

                // Get container
                o.container = jQuery(o.options.containerSelector);
                if (o.container.length == 0) {
                    o.container = o.sidebar.parent();
                }

                // Create sticky sidebar
                o.sidebar.parents().css('-webkit-transform', 'none'); // Fix for WebKit bug - https://code.google.com/p/chromium/issues/detail?id=20574
                o.sidebar.css({
                    'position': 'relative',
                    'overflow': 'visible',
                    // The "box-sizing" must be set to "content-box" because we set a fixed height to this element when the sticky sidebar has a fixed position.
                    '-webkit-box-sizing': 'border-box',
                    '-moz-box-sizing': 'border-box',
                    'box-sizing': 'border-box'
                });

                // Get the sticky sidebar element. If none has been found, then create one.
                o.stickySidebar = o.sidebar.find('.StickySidebar');
                if (o.stickySidebar.length == 0) {
                    o.sidebar.find('script').remove(); // Remove <script> tags, otherwise they will be run again on the next line.
                    o.stickySidebar = jQuery('<div>').addClass('StickySidebar').append(o.sidebar.children());
                    o.sidebar.append(o.stickySidebar);
                }

                // Get existing top and bottom margins and paddings
                o.marginTop = parseInt(o.sidebar.css('margin-top'));
                o.marginBottom = parseInt(o.sidebar.css('margin-bottom'));
                o.paddingTop = parseInt(o.sidebar.css('padding-top'));
                o.paddingBottom = parseInt(o.sidebar.css('padding-bottom'));

                // Add a temporary padding rule to check for collapsable margins.
                var collapsedTopHeight = o.stickySidebar.offset().top;
                var collapsedBottomHeight = o.stickySidebar.outerHeight();
                o.stickySidebar.css('padding-top', 1);
                o.stickySidebar.css('padding-bottom', 1);
                collapsedTopHeight -= o.stickySidebar.offset().top;
                collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight - collapsedTopHeight;
                if (collapsedTopHeight == 0) {
                    o.stickySidebar.css('padding-top', 0);
                    o.stickySidebarPaddingTop = 0;
                }
                else {
                    o.stickySidebarPaddingTop = 1;
                }

                if (collapsedBottomHeight == 0) {
                    o.stickySidebar.css('padding-bottom', 0);
                    o.stickySidebarPaddingBottom = 0;
                }
                else {
                    o.stickySidebarPaddingBottom = 1;
                }

                // We use this to know whether the user is scrolling up or down.
                o.previousScrollTop = null;

                // Scroll top (value) when the sidebar has fixed position.
                o.fixedScrollTop = 0;

                // Set sidebar to default values.
                resetSidebar();

                o.onScroll = function (o) {
                    // Stop if the sidebar isn't visible.
                    if (!o.stickySidebar.is(":visible")) {
                        return;
                    }

                    // Stop if the window is too small.
                    if (jQuery('body').width() < o.options.minWidth) {
                        resetSidebar();
                        return;
                    }

                    // Stop if the sidebar width is larger than the container width (e.g. the theme is responsive and the sidebar is now below the content)
                    if (o.options.disableOnResponsiveLayouts) {
                        var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css('float') == 'none');

                        if (sidebarWidth + 50 > o.container.width()) {
                            resetSidebar();
                            return;
                        }
                    }

                    var scrollTop = jQuery(document).scrollTop();
                    var position = 'static';

                    // If the user has scrolled down enough for the sidebar to be clipped at the top, then we can consider changing its position.
                    if (scrollTop >= o.container.offset().top + (o.paddingTop + o.marginTop - o.options.additionalMarginTop)) {
                        // The top and bottom offsets, used in various calculations.
                        var offsetTop = o.paddingTop + o.marginTop + options.additionalMarginTop;
                        var offsetBottom = o.paddingBottom + o.marginBottom + options.additionalMarginBottom;

                        // All top and bottom positions are relative to the window, not to the parent elemnts.
                        var containerTop = o.container.offset().top;
                        var containerBottom = o.container.offset().top + getClearedHeight(o.container);

                        // The top and bottom offsets relative to the window screen top (zero) and bottom (window height).
                        var windowOffsetTop = 0 + options.additionalMarginTop;
                        var windowOffsetBottom;

                        var sidebarSmallerThanWindow = (o.stickySidebar.outerHeight() + offsetTop + offsetBottom) < jQuery(window).height();
                        if (sidebarSmallerThanWindow) {
                            windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight();
                        }
                        else {
                            windowOffsetBottom = jQuery(window).height() - o.marginBottom - o.paddingBottom - options.additionalMarginBottom;
                        }

                        var staticLimitTop = containerTop - scrollTop + o.paddingTop + o.marginTop;
                        var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o.marginBottom;

                        var top = o.stickySidebar.offset().top - scrollTop;
                        var scrollTopDiff = o.previousScrollTop - scrollTop;

                        // If the sidebar position is fixed, then it won't move up or down by itself. So, we manually adjust the top coordinate.
                        if (o.stickySidebar.css('position') == 'fixed') {
                            if (o.options.sidebarBehavior == 'modern') {
                                top += scrollTopDiff;
                            }
                        }

                        if (o.options.sidebarBehavior == 'stick-to-top') {
                            top = options.additionalMarginTop;
                        }

                        if (o.options.sidebarBehavior == 'stick-to-bottom') {
                            top = windowOffsetBottom - o.stickySidebar.outerHeight();
                        }

                        if (scrollTopDiff > 0) { // If the user is scrolling up.
                            top = Math.min(top, windowOffsetTop);
                        }
                        else { // If the user is scrolling down.
                            top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight());
                        }

                        top = Math.max(top, staticLimitTop);

                        top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight());

                        // If the sidebar is the same height as the container, we won't use fixed positioning.
                        var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar.outerHeight();

                        if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
                            position = 'fixed';
                        }
                        else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o.stickySidebar.outerHeight()) {
                            position = 'fixed';
                        }
                        else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <= options.additionalMarginTop) {
                            // Stuck to the top of the page. No special behavior.
                            position = 'static';
                        }
                        else {
                            // Stuck to the bottom of the page.
                            position = 'absolute';
                        }
                    }

                    /*
                     * Performance notice: It's OK to set these CSS values at each resize/scroll, even if they don't change.
                     * It's way slower to first check if the values have changed.
                     */
                    if (position == 'fixed') {
                        o.stickySidebar.css({
                            'position': 'fixed',
                            'width': o.sidebar.width(),
                            'top': top,
                            'left': o.sidebar.offset().left + parseInt(o.sidebar.css('padding-left'))
                        });
                    }
                    else if (position == 'absolute') {
                        var css = {};

                        if (o.stickySidebar.css('position') != 'absolute') {
                            css.position = 'absolute';
                            css.top = scrollTop + top - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom;
                        }

                        css.width = o.sidebar.width();
                        css.left = '';

                        o.stickySidebar.css(css);
                    }
                    else if (position == 'static') {
                        resetSidebar();
                    }

                    if (position != 'static') {
                        if (o.options.updateSidebarHeight == true) {
                            o.sidebar.css({
                                'min-height': o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom
                            });
                        }
                    }

                    o.previousScrollTop = scrollTop;
                };

                // Initialize the sidebar's position.
                o.onScroll(o);

                // Recalculate the sidebar's position on every scroll and resize.
                jQuery(document).scroll(function (o) {
                    return function () {
                        o.onScroll(o);
                    };
                }(o));
                jQuery(window).resize(function (o) {
                    return function () {
                        o.stickySidebar.css({'position': 'static'});
                        o.onScroll(o);
                    };
                }(o));

                // Reset the sidebar to its default state
                function resetSidebar() {
                    o.fixedScrollTop = 0;
                    o.sidebar.css({
                        'min-height': '1px'
                    });
                    o.stickySidebar.css({
                        'position': 'static',
                        'width': ''
                    });
                }

                // Get the height of a div as if its floated children were cleared. Note that this function fails if the floats are more than one level deep.
                function getClearedHeight(e) {
                    var height = e.height();

                    e.children().each(function () {
                        height = Math.max(height, jQuery(this).height());
                    });

                    return height;
                }
            });
        }
    }
})(jQuery);

// GALLERY
jQuery(document).ready(function () {
    jQuery("#gallery_navigation").append(
      '<div class="info_gll"></div><span class="icon_times fas fa-window-close"></span><div class="arrw"><span class="prev fas fa-chevron-left"></span><span class="next fas fa-chevron-right"></span></div><div class="imT"></div><div class="circles_img"></div>'
    );
  
    var orit = 0;
    var reg = 0;
    var regUrl;
    var numReg = 0;
    var numRegT = 1;
    var $initialImg = jQuery("#work_gallery img");
    var controlCircles = true;
    var showInfoNumber = true;
  
    /*-----------------*/
    $initialImg.each(function () {
      reg++;
      numReg++;
      jQuery(".imT").append('<img src="' + jQuery(this).attr("src") + '">');
  
      if (controlCircles == true) {
        jQuery(".circles_img").append(
          '<span class="fa-solid fa-square"><img src="' +
            jQuery(this).attr("src") +
            '"></span>'
        );
      }
    });
  
    /*-----------*/
  
    var $SpanClick = jQuery(".circles_img span");
    var $SelectImg = jQuery("#gallery_navigation .imT img");
  
    jQuery("#gallery_navigation").css({
      display: "none"
    });
  
    /*---------------*/
  
    $initialImg.on("click", function () {
      $SelectImg.animate({ "max-width": "80%", "max-height": "90%" }, 100);
  
      jQuery("#gallery_navigation").css({ display: "block" });
      regUrl = jQuery(this).attr("src");
      $SelectImg.each(function () {
        if (jQuery(this).attr("src") == regUrl) {
          $SelectImg.removeClass("active");
          jQuery(this).addClass("active");
  
          orit = jQuery(this).index();
          numRegT = jQuery(this).index();
          /*----------------------*/
          if (numRegT <= 0) {
            numRegT++;
          } else {
            numRegT++;
          }
  
          if (showInfoNumber == true) {
            jQuery(".info_gll p").remove();
            jQuery(".info_gll").append("<p>" + numRegT + "/" + numReg + "</p>");
          }
  
          $SpanClick.removeClass("circle_active");
          $SpanClick.eq(orit).addClass("circle_active");
          /*---------------------*/
        }
      });
  
      $SelectImg.css({
        "margin-left": "0px",
        "margin-right": "0px",
        "margin-bottom": "0px"
      });
      $SelectImg.eq(orit).addClass("active");
      jQuery(".active").css({ visibility: "visible", opacity: "1" });
    });
  
    $SpanClick.on("click", function () {
      $SelectImg.css({
        "margin-left": "0px",
        "margin-right": "0px",
        "margin-bottom": "-300px"
      });
      $SelectImg.removeClass("active");
      orit = jQuery(this).index();
      numRegT = jQuery(this).index();
  
      if (numRegT <= 0) {
        numRegT++;
      } else {
        numRegT++;
      }
  
      if (showInfoNumber == true) {
        jQuery(".info_gll p").remove();
        jQuery(".info_gll").append("<p>" + numRegT + "/" + numReg + "</p>");
      }
      $SpanClick.removeClass("circle_active");
      $SpanClick.eq(orit).addClass("circle_active");
      $SelectImg.eq(orit).addClass("active");
  
      jQuery(".active").css({ visibility: "visible" }).animate(
        {
          "margin-bottom": "0px",
          opacity: "1"
        },
        300
      );
  
      $SelectImg.eq(orit).addClass("active");
    });
    /*------------------*/
    jQuery(".prev").on("click", function () {
      $SelectImg.css({
        "margin-left": "-330px",
        "margin-right": "0px",
        "margin-bottom": "0px"
      });
      if (orit <= 0) {
        orit = reg;
      } else if (orit >= reg) {
        orit = 0;
      }
      orit--;
      numRegT--;
  
      if (numRegT < 1) {
        numRegT = numReg;
      }
  
      if (showInfoNumber == true) {
        jQuery(".info_gll p").remove();
        jQuery(".info_gll").append("<p>" + numRegT + "/" + numReg + "</p>");
      }
  
      $SpanClick.removeClass("circle_active");
      $SpanClick.eq(orit).addClass("circle_active");
      jQuery(".active").css({ visibility: "hidden", opacity: "0" });
      $SelectImg.removeClass("active");
      $SelectImg.eq(orit).addClass("active");
  
      jQuery(".active").css({ visibility: "visible" }).animate(
        {
          "margin-left": "0px",
          opacity: "1"
        },
        300
      );
    });
    /*-------------*/
    jQuery(".next").on("click", function () {
      $SelectImg.css({
        "margin-left": "0px",
        "margin-right": "-330px",
        "margin-bottom": "0px"
      });
  
      orit++;
      numRegT++;
  
      if (numRegT > numReg) {
        numRegT = 1;
      } else if (numRegT == 0) {
        numRegT = 1;
      }
  
      if (showInfoNumber == true) {
        jQuery(".info_gll p").remove();
        jQuery(".info_gll").append("<p>" + numRegT + "/" + numReg + "</p>");
      }
  
      if (orit <= 0) {
        orit = reg;
      } else if (orit >= reg) {
        orit = 0;
      }
  
      $SpanClick.removeClass("circle_active");
      $SpanClick.eq(orit).addClass("circle_active");
  
      jQuery(".active").css({ visibility: "hidden", opacity: "0" });
      $SelectImg.removeClass("active");
      $SelectImg.eq(orit).addClass("active");
  
      jQuery(".active").css({ visibility: "visible" }).animate(
        {
          "margin-right": "0px",
          opacity: "1"
        },
        300
      );
    });
    /*----------*/
    jQuery(document).keyup(function (e) {
      if (e.which == 27) {
        $SelectImg.animate(
          { "max-width": "0%", "max-height": "0%" },
          100,
          function () {
            jQuery("#gallery_navigation").css({ display: "none" });
          }
        );
      }
    });
    /*----------------*/
    jQuery(".icon_times").on("click", function () {
      $SelectImg.animate(
        { "max-width": "0%", "max-height": "0%" },
        100,
        function () {
            jQuery("#gallery_navigation").css({ display: "none" });
        }
      );
    });
    /*----------------*/
  });





// Translations object
const translations = {
    en: {
        education_heading: 'EDUCATION',

        education_date_1: '2018-11',
        education_heading_1: '"Vilnius Coding School"',
        education_description_1: 'Web development course',
        education_city_1: 'Vilnius',
        
        education_date_2: '2018-01',
        education_heading_2: '"Code Academy"',
        education_description_2: 'PHP and Web development course',
        education_city_2: 'Vilnius',

        education_date_3: '2013-2017',
        education_heading_3: 'Vilnius Antakalnis gymnasium',
        education_description_3: '',
        education_city_3: 'Vilnius',

        education_date_4: '2005-2013',
        education_heading_4: 'National M.K Čiurlionis art school',
        education_description_4: '',
        education_city_4: 'Vilnius',

        position: "Front-end developer",
        main_heading: "ABOUT ME",
        main_description: "I am a Front-End Developer with over 3 years of experience at EasySEO. I have excellent expertise in CSS, HTML, and WordPress custom theme development, with additional experience in PHP, JavaScript, jQuery, WooCommerce, Photoshop, Bootstrap, Sass. My skill set also includes using popular WordPress builders like Elementor, Avada, and others. Additionally, I possess basic SQL skills for database management.  I am dedicated to delivering visually appealing and functional web solutions that meet clients needs and am committed to staying up-to-date with the latest trends and technologies in the field of web development.",

        experience_heading: "EXPERIENCE",
        job_description_date_1: "2020.03 now",
        job_description_heading_1: 'Web development at "EASYSEO.LT"',
        job_description_1: "My primary responsibilities at EasySEO involve creating custom WordPress themes and developing WooCommerce-based e-shops. I am well-versed in addressing frontend issues on client websites and have a solid foundation in SEO optimization work.",
        job_description_date_2: "2019.03 - 2019.09",
        job_description_heading_2: 'Junior full stack developer at "CODITY"',
        job_description_2: 'I worked as a Full Stack Programmer at "Codity", where my role involved developing and maintaining web applications using PHP, Symfony, HTML, CSS, and JavaScript. I collaborated with the team to add extra functionality to a specific project, ensuring its improved performance and user experience. My responsibilities also included troubleshooting and debugging code, continuously enhancing my programming skills, and adapting to evolving project requirements.',
        job_description_date_3: "2018.02 - 2018.05",
        job_description_heading_3: 'Waitress at Cafe Bar "SAKWA"',
        job_description_3: 'As a waitress at Cafe Bar "SAKWA", I provided excellent customer service, took food and drink orders, delivered orders promptly, and ensured a clean and inviting dining environment for guests.',
        job_description_date_4: "2017.06 - 2017.11",
        job_description_heading_4: 'Cashier at "Skonis ir Kvapas"',
        job_description_4: 'at "Skonis ir Kvapas" stores,  I engaged with customers, providing recommendations and guidance on their purchases, and efficiently operated the cash register.',

        heading_profesional: "Profesional",
        heading_hobbies: "Hobbies",
        heading_driving: "Driving categories",
        heading_languages: "Languages",

        EN_language: "English",
        LT_language: "Lithuanian",

        hobbies_1: "Running",
        hobbies_2: "Rock climbing",
        hobbies_3: "Calisthenics",
        hobbies_4: "Cycling",
        hobbies_5: "Hiking",
        hobbies_6: "Football",
        hobbies_7: "Reading books",
        hobbies_8: "Audio books",
        hobbies_9: "Building websites",
        hobbies_10: "Riding motorcycle",
        hobbies_11: "Making movies",
        hobbies_12: "Building computers",

        gallery_heading: "Several completed",
        gallery_paragraph: "projects",
    },  
    lt: {
        education_heading: 'IŠSILAVINIMAS',

        education_date_1: '2018-11',
        education_heading_1: '"Vilnius Coding School"',
        education_description_1: 'Tinklalapių kūrimo kursai',
        education_city_1: 'Vilnius',
        
        education_date_2: '2018-01',
        education_heading_2: '"Code Academy"',
        education_description_2: 'PHP ir tinklalapių kūrimo kursai',
        education_city_2: 'Vilnius',

        education_date_3: '2013-2017',
        education_heading_3: 'Vilniaus Antakalnio gimnazija',
        education_description_3: '',
        education_city_3: 'Vilnius',

        education_date_4: '2005-2013',
        education_heading_4: 'Nacionalinė Mikalojaus Konstantino Čiurlionio menų mokykla',
        education_description_4: '',
        education_city_4: 'Vilnius',


        position: "Front-end programuotojas",
        main_heading: "APIE MANE",
        main_description: "Aš esu Front-End programuotojas su daugiau nei 3 metų darbo patirtimi EasySEO kompanijoje. Turiu puikų išmanymą CSS, HTML ir WordPress individualių temų kūrimo srityje, taip pat patirties naudojant PHP, JavaScript, jQuery, WooCommerce, Photoshop, Bootstrap, Sass. Mano įgūdžius papildo  mokėjimas naudotis populiariais WordPress kūrėjais, tokiais kaip Elementor, Avada ir kiti. Be to, turiu pagrindinius SQL įgūdžius duomenų bazės valdymui.  Aš esu pasiryžęs teikti vizualiai patrauklius ir funkcionalius interneto sprendimus, atitinkančius klientų poreikius, ir esu įsipareigojęs sekti naujausias tendencijas ir technologijas interneto svetainių kūrimo srityje.",

        experience_heading: "DARBO PATIRTIS",
        job_description_date_1: "2020.03 dabar",
        job_description_heading_1: 'Interneto svetainių kūrimas "EASYSEO.LT"',
        job_description_1: "Mano pagrindinės atsakomybės EasySEO apima individualių WordPress temų kūrimą ir WooCommerce e-parduotuvių plėtojimą. Aš greitai randu klientų tinklapių frontendo problemų sprendimus ir turiu tvirtą pagrindą SEO optimizacijos darbams.",
        job_description_date_2: "2019.03 - 2019.09",
        job_description_heading_2: 'Junior full stack developer at "CODITY"',
        job_description_2: 'Dirbau kaip full stack programuotojas įmonėje "Codity", kurioje mano užduotys apėmė internetinių programų kūrimą ir priežiūrą naudojant PHP, Symfony, HTML, CSS ir JavaScript. Bendradarbiaudamas su komanda, kūriau papildomą funkcionalumą konkrečiam projektui, užtikrindamas jo geresnį veikimą ir sklandesnę vartotojų patirtį. Taip pat buvau atsakingas už programinio kodo gerinimą ir klaidų taisymą, nuolatinį programavimo įgūdžių tobulinimą bei prisitaikymą prie besikeičiančių projektų reikalavimų.',
        job_description_date_3: "2018.02 - 2018.05",
        job_description_heading_3: 'Padavėjas kavinėje "SAKWA"',
        job_description_3: 'Kavinėje - bare "SAKWA" lankytojoms teikiau puikų klientų aptarnavimą, priimdavau maisto ir gėrimų užsakymus, skubiai pristatydavau užsakymus ir užtikrinavau švarią bei jaukią valgomo aplinką.',
        job_description_date_4: "",
        job_description_heading_4: 'Kasininkas parduotuvėje "Skonis ir Kvapas".',
        job_description_4: '"Skonis ir Kvapas" parduotuvėse bendravau su klientais, teikiau rekomendacijas ir patarimus dėl jų pirkinių ir efektyviai dirbau su kasos aparatu.',

        heading_profesional: "Profesionali",
        heading_hobbies: "Pomėgiai",
        heading_driving: "Vairavimo kategorijos",
        heading_languages: "Kalbos",

        EN_language: "Anglų",
        LT_language: "Lietuvių",

        hobbies_1: "Bėgimas",
        hobbies_2: "Laipiojimas",
        hobbies_3: "Kalistenika",
        hobbies_4: "Važinėjimas dviračiu",
        hobbies_5: "Vaikščiojimas",
        hobbies_6: "Futbolas",
        hobbies_7: "Knygų skaitymas",
        hobbies_8: "Klausytis audio knygų",
        hobbies_9: "Svetainių kūrimas",
        hobbies_10: "Važinėjimas motociklu",
        hobbies_11: "Filmų kūrimas",
        hobbies_12: "Kompiuterių surinkimas/taisymas",

        gallery_heading: "Dalis atliktų",
        gallery_paragraph: "projektų",

    }
};

// Function to translate elements
function translateTo(language) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });
}

// Initial translation (you can set a default language)
translateTo('en');

// Event listeners for language buttons
document.getElementById('translate-to-en').addEventListener('click', () => {
    translateTo('en');
});

document.getElementById('translate-to-lt').addEventListener('click', () => {
    translateTo('lt');
});
    