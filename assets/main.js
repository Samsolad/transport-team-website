(function () {
  'use strict';

  var COOKIE_NAME = 'tt_cookie_consent';
  var ALLOWED_VALUES = { accepted: true, declined: true };

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getCookie(name) {
    var match = document.cookie.match(
      new RegExp('(?:^|; )' + escapeRegExp(name) + '=([^;]*)')
    );
    return match ? decodeURIComponent(match[1]) : null;
  }

  function setCookie(name, value, days) {
    if (!ALLOWED_VALUES[value]) {
      return;
    }

    var expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    var secure = location.protocol === 'https:' ? '; Secure' : '';

    document.cookie =
      encodeURIComponent(name) +
      '=' +
      encodeURIComponent(value) +
      '; expires=' +
      expires.toUTCString() +
      '; path=/' +
      '; SameSite=Lax' +
      secure;
  }

  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');

  if (banner && acceptBtn && declineBtn) {
    function hideBanner() {
      banner.classList.add('hidden');
    }

    if (getCookie(COOKIE_NAME)) {
      hideBanner();
    } else {
      setTimeout(function () {
        banner.style.display = 'flex';
      }, 800);

      acceptBtn.addEventListener('click', function () {
        setCookie(COOKIE_NAME, 'accepted', 365);
        hideBanner();
      });

      declineBtn.addEventListener('click', function () {
        setCookie(COOKIE_NAME, 'declined', 365);
        hideBanner();
      });
    }
  }

  var revealElements = document.querySelectorAll('.reveal,.reveal-fade,.reveal-stagger');
  if (revealElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -48px 0px' }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add('visible');
    });
  }

  var nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 60) {
          nav.style.padding = '11px 48px';
          nav.style.background = 'rgba(12,26,28,0.97)';
        } else {
          nav.style.padding = '18px 48px';
          nav.style.background = 'rgba(12,26,28,0.85)';
        }
      },
      { passive: true }
    );
  }
})();
