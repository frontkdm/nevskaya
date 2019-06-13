"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.split");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

$(function () {
  var headerSearch = $('.header-search'); // <== Кешируем ноду

  $('.header-search-button').click(function (e) {
    if (!headerSearch.hasClass('expanded')) {
      e.preventDefault(); // <== Превентим сабмит на первый клип по иконке

      headerSearch.addClass('expanded');
      $('.header-search-field').focus();
    } else {
      headerSearch.submit();
    }
  });
  $('.select-lang').click(function () {
    $(this).addClass('expanded');
  });
  $('body').click(function (e) {
    var target = e.target.classList[0];

    if (target !== 'header-search-button') {
      headerSearch.removeClass('expanded');
    }

    if (target !== 'filter-hidden') {
      $('.filter-hidden').each(function () {
        $(this).prop('checked', false);
      });
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
  $('.filter-options-item').click(function (e) {
    var label = $(this).parent().siblings('label');
    label.text(e.target.innerHTML); // TODO Ajax call
  });

  if ($('.reviews-slider-item').length > 2) {
    $('.simple-slider').slick({
      arrows: false,
      dots: true,
      slidesToShow: 2,
      lazyLoad: 'ondemand',
      appendDots: '.simple-slider-wrapper',
      dotsClass: 'slider-dots simple-slider-dots',
      responsive: [{
        breakpoint: 1280,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  }

  var aboutSlider = $('.about-slider'); // <== Кешируем слайдер

  aboutSlider.slick({
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand'
  });
  $('.slider-btn').click(function () {
    var dir = $(this).data('dir');
    aboutSlider.slick('slick' + dir);
  });
  var allowHeaderToScroll = true;

  function detectVerticalScroll(e) {
    if (e.target.classList[0] === 'filter-options-item') return;
    if (e.target.classList[0] === 'modal-wrapper') return;
    if (e.target.classList[0] === 'modal') return;

    if (allowHeaderToScroll) {
      e.originalEvent.deltaY >= 0 ? $('.page-header').addClass('hide-up') : $('.page-header').removeClass('hide-up');
    }
  }

  $('body').on('wheel mousewheel', detectVerticalScroll);
  $('.close-modal').click(function () {
    $('.modal-wrapper').removeClass('show');
    $('body').removeClass('noflow');
  });
  $('.call-modal').click(function () {
    var vacancy = $(this).siblings('.card-big-title').text();
    $('body').addClass('noflow');
    $('.modal-wrapper').addClass('show');
    $('.input-vacancy').attr('value', vacancy);
    $('.resume-modal form input[name="vacancy-name"]').focus();
  });
  $('.resume-modal form').submit(function (e) {
    e.preventDefault();
    var data = $(this).serialize(); // TODO Ajax call
  });
  $('.mailing-form').submit(function (e) {
    e.preventDefault();
    $('body').addClass('noflow');
    $('.modal-wrapper').removeClass('review show');
    $('.modal-wrapper').addClass('subscription show');
  });
  $('.review-form').submit(function (e) {
    e.preventDefault();
    $('body').addClass('noflow');
    $('.modal-wrapper').removeClass('subscription show');
    $('.modal-wrapper').addClass('review show');
  });
  $('.mobile-burger').click(function () {
    allowHeaderToScroll = !allowHeaderToScroll;
    $(this).toggleClass('is-active');
    $('body').toggleClass('noflow');
    $('.mobile-menu-wrapper').toggleClass('move-left');
  });
  var svgPath = document.querySelector('.letters');
  var svgPath2 = document.querySelector('.background');
  var tl = anime.timeline({
    easing: 'easeInOutQuad',
    direction: 'alternate',
    duration: 2500,
    loop: true
  });
  tl.add({
    targets: svgPath2,
    loop: false,
    fill: ['rgba(255, 255, 255, 0)', '#d24a43'],
    easing: 'easeInOutQuad',
    duration: 800
  }).add({
    targets: svgPath,
    loop: true,
    stroke: '#fff' // duration: 2000

  }).add({
    targets: svgPath,
    loop: true,
    direction: 'normal',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutQuad' // duration: 2000

  }).add({
    targets: svgPath,
    fill: ['rgba(255, 255, 255, 0)', '#fff'],
    direction: 'normal',
    easing: 'linear',
    duration: 300,
    delay: function delay(el, i) {
      return i * 5000;
    }
  }).add({
    duration: 1500
  }).add({
    duration: 1500
  });

  if (window.matchMedia('(max-width: 1280px)').matches) {
    $('.timeline').slick({
      slidesToScroll: 1,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      speed: 800
    });
  } else {
    if ($('.timeline').hasClass('animated')) {
      $('.timeline').removeClass('animated');
    }

    ;
  }

  console.log('The main script is ready');
});

(function () {
  // --------------------------------------
  //
  // Юзаем Intersection Observer API для 
  // ленивой загрузки изображений
  //
  // --------------------------------------
  var images = document.querySelectorAll('.olazy');
  var options = {
    rootMargin: '50px 0px',
    threshold: 0.01
  };

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0) {
          var target = entry.target;
          var src = target.dataset.src;
          target.src = src;

          target.onload = function () {
            this.classList.add('loaded');

            if (this.parentNode.querySelector('.spinner') !== null) {
              this.parentNode.querySelector('.spinner').remove();
            }

            io.unobserve(target);
          };
        }
      });
    }, options);
    images.forEach(function (image) {
      io.observe(image);
    });
  } else {
    images.forEach(function (image) {
      var src = image.dataset.src;
      image.src = src;

      image.onload = function () {
        this.classList.add('loaded');

        if (this.parentNode.querySelector('.spinner') !== null) {
          this.parentNode.removeChild(this.parentNode.querySelector('.spinner')); // this.parentNode.querySelector('.spinner').remove()
        }
      };
    });
  }

  console.log('Lazyload is ready');
})();

(function () {
  // --------------------------------------
  // 
  // Юзаем Intersection Observer API для 
  // разных взаимодействий при попадании элемента в viewport
  // (анимации и п.р)
  //
  // --------------------------------------
  var observables = document.querySelectorAll('.observables');
  var options = {
    marginRoot: '50px 0',
    threshold: 0.01
  };

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          target.classList.add('fade-down');
          io.unobserve(target);
        }
      });
    }, options);
    observables.forEach(function (observable) {
      return io.observe(observable);
    });
  } else {
    observables.forEach(function (obs) {
      return obs.classList.add('fade-down');
    });
  }

  console.log('Observable is ready');
})();

!function (a, b) {
  "function" == typeof define && define.amd ? define([], function () {
    return a.svg4everybody = b();
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = b() : a.svg4everybody = b();
}(void 0, function () {
  function a(a, b, c) {
    if (c) {
      var d = document.createDocumentFragment(),
          e = !b.hasAttribute("viewBox") && c.getAttribute("viewBox");
      e && b.setAttribute("viewBox", e);

      for (var f = c.cloneNode(!0); f.childNodes.length;) {
        d.appendChild(f.firstChild);
      }

      a.appendChild(d);
    }
  }

  function b(b) {
    b.onreadystatechange = function () {
      if (4 === b.readyState) {
        var c = b._cachedDocument;
        c || (c = b._cachedDocument = document.implementation.createHTMLDocument(""), c.body.innerHTML = b.responseText, b._cachedTarget = {}), b._embeds.splice(0).map(function (d) {
          var e = b._cachedTarget[d.id];
          e || (e = b._cachedTarget[d.id] = c.getElementById(d.id)), a(d.parent, d.svg, e);
        });
      }
    }, b.onreadystatechange();
  }

  function c(c) {
    function e() {
      for (var c = 0; c < o.length;) {
        var h = o[c],
            i = h.parentNode,
            j = d(i),
            k = h.getAttribute("xlink:href") || h.getAttribute("href");

        if (!k && g.attributeName && (k = h.getAttribute(g.attributeName)), j && k) {
          if (f) if (!g.validate || g.validate(k, j, h)) {
            i.removeChild(h);
            var l = k.split("#"),
                q = l.shift(),
                r = l.join("#");

            if (q.length) {
              var s = m[q];
              s || (s = m[q] = new XMLHttpRequest(), s.open("GET", q), s.send(), s._embeds = []), s._embeds.push({
                parent: i,
                svg: j,
                id: r
              }), b(s);
            } else a(i, j, document.getElementById(r));
          } else ++c, ++p;
        } else ++c;
      }

      (!o.length || o.length - p > 0) && n(e, 67);
    }

    var f,
        g = Object(c),
        h = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
        i = /\bAppleWebKit\/(\d+)\b/,
        j = /\bEdge\/12\.(\d+)\b/,
        k = /\bEdge\/.(\d+)\b/,
        l = window.top !== window.self;
    f = "polyfill" in g ? g.polyfill : h.test(navigator.userAgent) || (navigator.userAgent.match(j) || [])[1] < 10547 || (navigator.userAgent.match(i) || [])[1] < 537 || k.test(navigator.userAgent) && l;
    var m = {},
        n = window.requestAnimationFrame || setTimeout,
        o = document.getElementsByTagName("use"),
        p = 0;
    f && e();
  }

  function d(a) {
    for (var b = a; "svg" !== b.nodeName.toLowerCase() && (b = b.parentNode);) {
      ;
    }

    return b;
  }

  return c;
});