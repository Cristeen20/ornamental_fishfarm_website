/* Quality Ornamental Fish Farm — site behaviour
   Plain ES2019, no dependencies. Everything degrades gracefully without JS. */

(function () {
  'use strict';

  /* ---------- mobile navigation ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- highlight the section you are reading ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- fish gallery filter ---------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.fish-card'));

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.dataset.filter;

      chips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-selected', String(active));
      });

      cards.forEach(function (card) {
        var show = filter === 'all' || card.dataset.type === filter;
        card.classList.toggle('is-hidden', !show);
        // cards revealed by a filter should not stay faded out
        if (show) card.classList.add('is-visible');
      });
    });
  });

  /* ---------- enquiry form → email ---------- */
  var form = document.getElementById('enquiryForm');
  var note = document.getElementById('formNote');
  var ENQUIRY_EMAIL = 'qualityornamentalfishfarm@gmail.com';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.elements.name.value.trim();
      if (!name) {
        form.elements.name.classList.add('is-invalid');
        form.elements.name.focus();
        if (note) note.textContent = 'Please tell us your name first.';
        return;
      }
      form.elements.name.classList.remove('is-invalid');

      var lines = [
        'Hello Quality Ornamental Fish Farm,',
        '',
        'Name: ' + name,
        'Looking for: ' + form.elements.interest.value,
        'Quantity / tank size: ' + (form.elements.qty.value.trim() || '—'),
        'Message: ' + (form.elements.message.value.trim() || '—')
      ];

      var subject = 'Guppy enquiry from ' + name;
      var mailto = 'mailto:' + ENQUIRY_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = mailto;

      if (note) note.textContent = 'Opening your email app with your enquiry…';
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
