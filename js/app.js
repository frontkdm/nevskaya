if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

$(function() {

  const headerSearch = $('.header-search'); // <== Кешируем ноду

  $('.header-search-button').click(function(e) {
    if ( !headerSearch.hasClass('expanded') ) {
      e.preventDefault(); // <== Превентим сабмит на первый клип по иконке
      headerSearch.addClass('expanded');
      $('.header-search-field').focus();
    } else {
      headerSearch.submit();
    }
  });

  $('.select-lang').click(function() {
    $(this).addClass('expanded');
  });

  $('body').click(function(e) {
    const target = e.target.classList[0];
    if (target !== 'header-search-button') {
      headerSearch.removeClass('expanded');
    }

    if (target !== 'filter-hidden') {
      $('.filter-hidden').each(function() {
        $(this).prop('checked', false);
      })
    }

    if (target !== 'select-lang-selected') {
      $('.select-lang').removeClass('expanded');
    }

    if (target === 'modal-wrapper') {
      $('.modal-wrapper').removeClass('show');
      $('body').removeClass('noflow');
    }
    
  });

  $('.page-slider').slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: '.slider-dots-wrapper',
    dotsClass: 'slider-dots',
    cssEase: 'ease',
    fade: true,
    lazyload: 'ondemand'
  });

  $('.filter-options-item').click(function(e) {
    const label = $(this).parent().siblings('label');
    label.text(e.target.innerHTML);

    // TODO Ajax call
  });

  if ( $('.reviews-slider-item').length > 2 ) {
    $('.simple-slider').slick({
      arrows: false,
      dots: true,
      slidesToShow: 2,
      lazyLoad: 'ondemand',
      appendDots: '.simple-slider-wrapper',
      dotsClass: 'slider-dots simple-slider-dots',
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    })
  }

  const aboutSlider = $('.about-slider'); // <== Кешируем слайдер

  aboutSlider.slick({
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand'
  })

  $('.slider-btn').click(function() {
    const dir = $(this).data('dir');
    aboutSlider.slick('slick'+dir);
  })

  let allowHeaderToScroll = true;

  function detectVerticalScroll(e) {
    if (e.target.classList[0] === 'filter-options-item') return;
    if (e.target.classList[0] === 'modal-wrapper') return;
    if (e.target.classList[0] === 'modal') return;

    if(allowHeaderToScroll) {
      e.originalEvent.deltaY >= 0 ?  
        $('.page-header').addClass('hide-up') :
        $('.page-header').removeClass('hide-up');
    }

    
  }

  $('body').on('wheel mousewheel', detectVerticalScroll);

  $('.close-modal').click(function() {
    $('.modal-wrapper').removeClass('show');
    $('body').removeClass('noflow');
  })

  $('.call-modal').click(function() {
    const vacancy = $(this).siblings('.card-big-title').text();

    $('body').addClass('noflow');
    $('.modal-wrapper').addClass('show');

    $('.input-vacancy').attr('value', vacancy)
    $('.resume-modal form input[name="vacancy-name"]').focus();

  })

  $('.resume-modal form').submit(function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    // TODO Ajax call
  });

  $('.mailing-form').submit(function(e) {
    e.preventDefault();
    $('body').addClass('noflow');
    $('.modal-wrapper').removeClass('review show');
    $('.modal-wrapper').addClass('subscription show');
  });

  $('.review-form').submit(function(e) {
    e.preventDefault();
    $('body').addClass('noflow');
    $('.modal-wrapper').removeClass('subscription show');
    $('.modal-wrapper').addClass('review show');
  });

  $('.mobile-burger').click(function() {
    allowHeaderToScroll = !allowHeaderToScroll;
    $(this).toggleClass('is-active')
    $('body').toggleClass('noflow');
    $('.mobile-menu-wrapper').toggleClass('move-left') 

  })


  if ( window.matchMedia('(max-width: 1280px)').matches ) {

    $('.timeline').slick({
      slidesToScroll: 1,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      speed: 800
    });

  } else {
    if ( $('.timeline').hasClass('animated') ) { $('.timeline').removeClass('animated'); };
  }

  console.log('The main script is ready')
});