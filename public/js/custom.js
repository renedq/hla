/*
 * Flexy HTML5 Multipurpose Theme v1.8
 * Copyright 2015 8Guild.com
 * All custom scripts for Flexy Theme
 */

$(window).on('load', function() {
  Detectizr.detect({
    detectScreen: false
  });
});


$(document).ready(function() {

  if (Modernizr.touch) {
    $('body').removeClass('parallax');
  };

  //Parallax init
  $('.parallax').stellar({
    responsive: true
  });

  // Sticky Header
  var $header = $('.header-animated');

  // $(window).on('load', function() {
  //   $('.header-animated').waypoint('sticky');
  // });

  // Logo header change
  $(window).on('load', function() {
    if ($header.length > 0) {
      var $logoAlt = $header.find('.logo > img').data('logo-alt');
      $header.find('.logo > img').attr('src', $logoAlt);
    }
  });

  $(window).on('scroll', function() {
    var $logoAlt = $header.find('.logo > img').data('logo-alt');
    var $logoDefault = $header.find('.logo > img').data('logo-default');
    if ($(window).scrollTop() > $('.hero-bg').height()) {
      $header.addClass('opaque');
      $header.find('.logo > img').attr('src', $logoDefault);
    } else {
      $header.removeClass('opaque');
      $header.find('.logo > img').attr('src', $logoAlt);
    }
  });


  /* Sticky Header
   *****************************************************/
  $(window).scroll(function() {
    var height = $(window).scrollTop();

    if (height > 50) {
      $('.no-animation').addClass('header-stuck');
    } else {
      $('.no-animation').removeClass('header-stuck');
    }
  });

  // Scroll to top button
  $(window).scroll(function() {
    var height = $(window).scrollTop();

    if (height > $(window).height()) {
      $('.scrollTop-btn').addClass('scrollTop-btn-shown');
    } else {
      $('.scrollTop-btn').removeClass('scrollTop-btn-shown');
    }
  });

  // Custom radio & checkboxes
  $('input').iCheck({
    checkboxClass: 'icheckbox_minimal-grey',
    radioClass: 'iradio_minimal-grey',
    increaseArea: '20%' // optional
  });

  // To stop playing video on modal close
  $('.modal').each(function() {
    var src = $(this).find('iframe').attr('src');

    $(this).on('show.bs.modal', function() {
      $(this).find('iframe').attr('src', '');
      $(this).find('iframe').attr('src', src);
    }).on('hide.bs.modal', function() {
      $(this).find('iframe').attr('src', '');
    });
  });

  // User quotes carousel
  $("#lightGallery").owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    mouseDrag: false,
    nav: true,
    navText: ['<span class="fa fa-angle-left tab-next-prev"></span>', '<span class="fa fa-angle-right tab-next-prev"></span>'],
    items: 1,
    loop: true,
    animateIn: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,

      },
      768: {
        items: 3,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
      1200: {
        items: 5,
      }
    }
  });

  $("a[class^='prettyPhoto']").prettyPhoto({
    social_tools: false
  });

  // Offcanvas toggle
  $('[data-toggle="offcanvas"]').click(function() {
    $('.row-offcanvas').toggleClass('active')
  });

  $('.nav-toggle').click(function() {
    $(this).toggleClass('open');
  });

  // Auto typing init
  $(".typed").typed({
    strings: ["multifunctional business theme", "Fully responsive", "7 different Landing Pages", "Perfect for sturtups", "Hostings", "Web Apps", "and more..."],
    typeSpeed: 30, // typing speed
    backDelay: 500, // pause before backspacing
    loop: true, // loop on or off (true or false)
    loopCount: false, // number of loops, false = infinite
    callback: function() {} // call function after typing is done
  });

  // Modal vertical alignment
  function adjustModalMaxHeightAndPosition() {
    $('.modal').each(function() {
      if ($(this).hasClass('in') === false) {
        $(this).show();
      }
      var contentHeight = $(window).height() - 60;
      var headerHeight = $(this).find('.modal-header').outerHeight() || 2;
      var footerHeight = $(this).find('.modal-footer').outerHeight() || 2;

      $(this).find('.modal-content').css({
        'max-height': function() {
          return contentHeight;
        }
      });

      $(this).find('.modal-body').css({
        'max-height': function() {
          return contentHeight - (headerHeight + footerHeight);
        }
      });

      $(this).find('.modal-dialog').addClass('modal-dialog-center').css({
        'margin-top': function() {
          return -($(this).outerHeight() / 2);
        },
        'margin-left': function() {
          return -($(this).outerWidth() / 2);
        }
      });
      if ($(this).hasClass('in') === false) {
        $(this).hide();
      }
    });
  }
  if ($(window).height() >= 320) {
    $(window).resize(adjustModalMaxHeightAndPosition).trigger("resize");
  }

  /*Intro Fullscreen Slideshow Initializing*/
  if ($(".web li").length > 0) {
    slider.bgSlider($(".web li").length);
  }

  $('#clock').countdown('2015/10/02', function(event) {
    var $this = $(this).html(event.strftime('' + '<div>%D<span>days</span></div>' + '<div>%H<span>hours</span></div>' + '<div>%M<span>minutes</span></div>' + '<div>%S<span>seconds</span></div>'));
  });


  // Next & Prev buttons for bootstrap tabs (iPhone Gallery)
  //--------------------------------------------------------
  $('#nxt').on('click', function() {
    moveTab("Next");
  });
  $('#prv').on('click', function() {
    moveTab("Previous");
  });


  function moveTab(nextOrPrev) {
    var currentTab = "";
    $('.iphone-tabs li').each(function() {
      if ($(this).hasClass('active')) {
        currentTab = $(this);
      }
    });

    if (nextOrPrev == "Next") {
      if (currentTab.next().length) {
        currentTab.next().find('a').click();
      } else {} // do nothing for now

    } else {
      if (currentTab.prev().length) {
        currentTab.prev().find('a').click();
      } else {} //do nothing for now 
    }
  }

  $('.iphone-tabs li a').on('click', function() {
    var currentSlide = $(this).data("slide-id");
    $(".tab-slide .iphone-slide").removeClass("active");
    $(currentSlide).addClass("active");
  });

  //Initialisation
  $('#digit-animation').waypoint(function(direction) {
    countNumb.init() + 'down';
  }, {
    offset: '65%',
    triggerOnce: true
  });

  $('#progress-circle').waypoint(function(direction) {
    $('.myStat').empty().removeData().circliful() + 'down';
  }, {
    offset: '65%',
    triggerOnce: true
  });

  $('.progress-bars').waypoint(function(direction) {

    $('.progress').each(function() {
      var valeur = 0;
      valeur = $(this).find('.progress-bar').attr('aria-valuenow');
      $(this).find('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
    }) + 'down';
  }, {
    offset: '65%',
    triggerOnce: true
  });

  // Form validation
  $(".form-validate1").validate({});
  $(".form-validate2").validate({});
  $(".form-validate3").validate({});
  $(".form-validate4").validate({});
  $(".form-validate5").validate({});

  // Increment counter

  setInterval(function() {
    var counter = $('.counter');
    // Get string
    var rawNum = counter.text();
    // Cut spaces and convert to number
    var num = parseInt(rawNum.replace(/\s/g, ''), 10);
    // Increment
    num++;
    // Number format
    var n = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    // Renew counter
    counter.text(n);
  }, 2000);


  //Enable Touch / swipe events for carousel 
  $(".carousel-inner").swipe({
    //Generic swipe handler for all directions
    swipeRight: function(event, direction, distance, duration, fingerCount) {
      $(this).parent().carousel('prev');
    },
    swipeLeft: function() {
      $(this).parent().carousel('next');
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold: 0
  });


  // Map HERO trigger
  $('.map-trigger div').on('click', function() {
    $('.map-hero').toggleClass('opened')
  });


  /** Masony Grid (Isotope) + Filtering
   *******************************************************/
  $(window).load(function() {
    if ($('.masonry-grid').length > 0) {
      $('.masonry-grid').isotope({
        itemSelector: '.item',
        masonry: {
          columnWidth: '.grid-sizer',
          gutter: '.gutter-sizer'
        }
      });
    }
    // filter items on button click
    $('#filters').on('click', 'a', function() {
      var filterValue = $(this).attr('data-filter');
      $('.masonry-grid').isotope({
        filter: filterValue
      });

      return false;
    });

    $('#filters').on('click', 'a', function() {
      $('#filters li').removeClass('active');
      $(this).parents('li').addClass('active');
    });

  });

  /** Portfolio item carousel
   *******************************************************/
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsive: {
      0: {
        items: 1
      }
    }
  });


});



// DOCUMENT READY END 
//--------------------------------------------------------









// ANIMATED DIGITS FUNCTION
//---------------------------------------------------------
var countNumb = (function() {
  var that = {};
  that.init = function() {

    $(".digit").each(function() {
      var dataNumber = $(this).attr('data-number');

      $(this).numerator({
        easing: 'swing', // easing options.
        duration: 2500, // the length of the animation.
        delimiter: ' ',
        rounding: 0, // decimal places.
        toValue: dataNumber // animate to this value.
      });
    });
  };

  return that;

})();

// GOOGLE MAPS API
//-----------------------------------------------------------
google.maps.event.addDomListener(window, 'load', init);

function init() {
  var mapOptions = {
    zoom: 13,
    scrollwheel: false,
    center: new google.maps.LatLng(46.483410, 30.722602), // Odessa
    styles: [{
      "featureType": "water",
      "stylers": [{
        "color": "#46bcec"
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "landscape",
      "stylers": [{
        "color": "#f2f2f2"
      }]
    }, {
      "featureType": "road",
      "stylers": [{
        "saturation": -100
      }, {
        "lightness": 45
      }]
    }, {
      "featureType": "road.highway",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#444444"
      }]
    }, {
      "featureType": "transit",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "stylers": [{
        "visibility": "off"
      }]
    }]
  };

  if ($('#map').length > 0) {
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

  }
}


/*Intro Fullscreen Slideshow Function*/
var slider = {
  currentSlide: 0,
  currentTitle: 0,
  timeOut: 3000,
  pred2: true,
  offset: 0,
  selector: '.web',
  currentCls: "current",
  countItems: 0,
  titleSelector: '',
  titleActive: '',

  bgSlider: function(countItems) {
    var me = this;
    me.countItems = countItems || me.countItems;
    me._next();
    me._timeoutId = setTimeout(function() {
      me.bgSlider();
    }, me.timeOut);
  },
  _next: function() {
    var me = this;
    if (me.currentSlide === me.countItems) {
      me.currentSlide = 1;
    } else {
      me.currentSlide++;
    }
    me.doSlide();
  },
  nextSlide: function() {
    var me = this;
    clearTimeout(me._timeoutId);
    me.bgSlider();
  },
  doSlide: function() {
    var me = this;
    // background
    $(me.selector + " li").removeClass(me.currentCls);
    $(me.selector + " li:nth-child(" + me.currentSlide + ")").addClass(me.currentCls);
    // title
    $(me.titleSelector).removeClass(me.titleActive);
    $(me.titleSelector + ":nth-child(" + me.currentSlide + ")").addClass(me.titleActive);
  }
};

////////////////////////////////////////////////////////////
//INTERNAL ANCHOR LINKS SCROLLING (NAVIGATION)
$(".scroll").click(function(event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $(this.hash).offset().top - 120
  }, 1000);
});

/*Scroll Up*/
$('.scroll-up').click(function() {
  $("html, body").animate({
    scrollTop: 0
  }, 1000);
  return false;
});

//SCROLL-SPY
// Cache selectors
var lastId,
  topMenu = $(".header-animated"),
  topMenuHeight = topMenu.outerHeight(),
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// Bind to scroll
$(window).scroll(function() {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight + 200;

  // Get id of current scroll item
  var cur = scrollItems.map(function() {
    if ($(this).offset().top < fromTop)
      return this;
  });
  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
    menuItems
      .parent().removeClass("active")
      .end().filter("[href=#" + id + "]").parent().addClass("active");
  }
});
////////////////////////////////////////////////////////////////////
