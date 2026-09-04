// common.js — renders the shared header/footer from data/site.js on every page.
// To rename the lab, change wording, or edit nav items: edit data/site.js only.
(function () {
  function renderHeader() {
    var mount = document.getElementById("site-header");
    if (!mount || !window.SITE_DATA) return;
    var s = window.SITE_DATA;
    var current = document.body.getAttribute("data-page");

    mount.innerHTML =
      '<div class="header-inner">' +
      '  <a class="brand mvplab-site-brand mvplab-site-brand--header" href="index.html" aria-label="' + s.labName.zh + ' / ' + s.labName.en + '">' +
      '    <img src="assets/brand/header/mvplab-header-compact-light.svg" alt="' + s.labName.zh + ' — ' + s.labName.en + '">' +
      '  </a>' +
      '  <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">☰</button>' +
      '  <nav class="main-nav" id="mainNav"><ul>' +
      s.nav.map(function (item) {
        return '<li><a class="' + (item.key === current ? "active" : "") + '" href="' + item.href + '">' + item.zh + '</a></li>';
      }).join("") +
      '  </ul></nav>' +
      '</div>';

    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        nav.classList.toggle("open");
      });
    }
  }

  function renderFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount || !window.SITE_DATA) return;
    var s = window.SITE_DATA;
    mount.innerHTML =
      '<div class="wrap footer-inner">' +
      '  <div class="footer-brand mvplab-site-brand mvplab-site-brand--footer">' +
      '    <img src="assets/brand/footer/mvplab-footer-open-dark.svg" alt="Maritime Visual Perception Lab — I-Shou University">' +
      '  </div>' +
      '  <div class="footer-meta">' +
      '    <span>' + s.footer.zh + '</span>' +
      '    <span>' + s.footer.en + '</span>' +
      '  </div>' +
      '</div>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
  });
})();
