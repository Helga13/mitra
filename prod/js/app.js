$(document).ready(function () {
  
  'use strict'
  
  // select
  
  $('.js-category').select2({
    minimumResultsForSearch: Infinity,
    placeholder: 'Выберите категорию'
  }).val('').trigger('change');
  
  $('.js-amount').select2({
    minimumResultsForSearch: Infinity,
    placeholder: 'Выберите объем'
  }).val('').trigger('change');
  
  $('.js-material').select2({
    minimumResultsForSearch: Infinity,
    placeholder: 'Выберите материал'
  }).val('').trigger('change');
  
  $('.js-size').select2({
    tags: true,
    minimumResultsForSearch: Infinity,
    placeholder: 'Выберите стандарт горла',
    maximumSelectionLength: 5,
    createSearchChoice : function(term){
      return false;
    }
  });
  $('.js-size').on('select2:open', function (e) {
    $('.select2-search input').prop('focus',false);
  });
  
  $('select').on('select2:open', function(e){
    $('.select2-results__options').scrollbar().parent().addClass('scrollbar-inner');
  });
  
  // slider
  
  $('.js-news').slick({
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    appendDots: $('.news_dots')
  });
  
  var dotsWidth = $('.slick-dots').width();
//  console.log(dotsWidth);
  $('.news_slider time').css({'padding-left': dotsWidth + 15});
  
  $('.slider_nav .prev').on('click', function() {
    $('.js-news').slick('slickPrev');
  });
  
  $('.slider_nav .next').on('click', function() {
    $('.js-news').slick('slickNext');
  });
  
  $('.js-about').slick({
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000  
  });
  
  // portfolio gallery
  
  $(function() {
  $(".img-w").each(function() {
    $(this).wrap("<div class='img-c'></div>")
    let imgSrc = $(this).find("img").attr("src");
     $(this).css('background-image', 'url(' + imgSrc + ')');
  });
  
  $(".img-c").click(function() {
    let w = $(this).outerWidth()
    let h = $(this).outerHeight()
    let x = $(this).offset().left
    let y = $(this).offset().top
    
    
    $(".active").not($(this)).remove()
    let copy = $(this).clone();
    copy.insertAfter($(this)).height(h).width(w).delay(500).addClass("active")
    $(".active").css('top', y - 8);
    $(".active").css('left', x - 8);
    
    setTimeout(function() {
      copy.addClass("positioned")
    }, 0)
    
  }); 
  
  

  
})

$(document).on("click", ".img-c.active", function() {
  let copy = $(this)
  copy.removeClass("positioned active").addClass("postactive")
  setTimeout(function() {
    copy.remove();
  }, 500)
})
  
  
// end document ready
});

var $nav = $('.greedy');
var $btn = $('.greedy .more');
var $vlinks = $('.greedy .links');
var $hlinks = $('.greedy .hidden_links');

var breaks = [];

function updateNav() {

  var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() + 8;

  // The visible list is overflowing the nav
  if($vlinks.width() > availableSpace) {

    // Record the width of the list
    breaks.push($vlinks.width());

    // Move item to the hidden list
    $vlinks.children().last().prependTo($hlinks);

    // Show the dropdown btn
    if($btn.hasClass('hidden')) {
      $btn.removeClass('hidden');
    }

  // The visible list is not overflowing
  } else {

    // There is space for another item in the nav
    if(availableSpace > breaks[breaks.length-1]) {

      // Move the item to the visible list
      $hlinks.children().first().appendTo($vlinks);
      breaks.pop();
    }

    // Hide the dropdown btn if hidden list is empty
    if(breaks.length < 1) {
      $btn.addClass('hidden');
      $hlinks.addClass('hidden');
    }
  }

  // Keep counter updated
  $btn.attr("count", breaks.length);

  // Recur if the visible list is still overflowing the nav
  if($vlinks.width() > availableSpace) {
    updateNav();
  }
}

// Window listeners

$(window).resize(function() {
    updateNav();
});

$btn.on('click', function(e) {
  e.preventDefault();
  $hlinks.toggleClass('hidden');
});

updateNav();

// map 

if (document.getElementById('map')) {
  //console.log('Map exist');
  $(function () {})
  var styles = [
    {
      "featureType": "all"
      , "elementType": "geometry"
      , "stylers": [
        {
          "color": "#e5eef4"
            }
        ]
    }
    , {
      "featureType": "all"
      , "elementType": "labels.icon"
      , "stylers": [
        {
          "visibility": "off"
            }
        ]
    }
    , {
      "featureType": "poi"
      , "elementType": "geometry.fill"
      , "stylers": [
        {
          "color": "#c2e2d9"
            }
        ]
    }
    , {
      "featureType": "road"
      , "elementType": "geometry.fill"
      , "stylers": [
        {
          "color": "#d3d3d3"
            }
        ]
    }
    , {
      "featureType": "water"
      , "elementType": "all"
      , "stylers": [
        {
          "lightness": -20
            }
        , {
          "color": "#97d0d4"
            }
        ]
    }
];
  var markers = [];

  function initMap() {
    var myOptions = {
      zoom: 12
      , center: new google.maps.LatLng(53.906279, 27.453984)
      , scrollwheel: false
      , mapTypeControl: false
      , streetViewControl: false
      , zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
        , position: google.maps.ControlPosition.LEFT_TOP
      }
      , mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
      }
      , fullscreenControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    };
    var map = new google.maps.Map(document.getElementById('map'), myOptions);
    var mapType = new google.maps.StyledMapType(styles, {
      name: "Grayscale"
    });
    map.mapTypes.set('tehgrayz', mapType);
    map.setMapTypeId('tehgrayz');
    setMarkers(map);
  }
  var beaches = [];
  $('.maps').each(function (index) {
    var cur_coords = [];
    cur_coords[0] = $(this).data('longitude');
    cur_coords[1] = $(this).data('latitude');
    cur_coords[2] = $(this).find('.marker_popup').html();
    beaches[index] = cur_coords;
  });
  var contentString = beaches[2];

  function setMarkers(map) {
    var image = {
      url: '../img/icons/i_map.png'
      , size: new google.maps.Size(26, 40)
      , origin: new google.maps.Point(0, 0)
      , anchor: new google.maps.Point(13, 40)
    };
    var infowindow = new google.maps.InfoWindow({
      content: ''
      , maxWidth: 260
        //maxHeight: 275,
      , pixelOffset: new google.maps.Size(0,15)
    });

    function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }
    var markersBounds = new google.maps.LatLngBounds();
    for (var i = 0; i < beaches.length; i++) {
      var beach = beaches[i];
      var markerPosition = new google.maps.LatLng(beach[0], beach[1]);
      markersBounds.extend(markerPosition);
      var marker = new google.maps.Marker({
        position: markerPosition
        , map: map
        , icon: image
        , info: '<div class="marker_popup">' + beach[2] + '</div>'
      });
      (function (marker, i) {
        google.maps.event.addListener(marker, 'click', function () {
          //				map.panTo(marker.getPosition()); // с анимацией
          infowindow.setContent(this.info);
          infowindow.open(map, marker);
        });
        google.maps.event.addListener(infowindow, 'closeclick', function () {
          marker.setIcon(image);
        });
        markers.push(marker);
      })(marker, i);
    }
  };
  initMap();
}