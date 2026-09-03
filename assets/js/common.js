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
      '  <a class="brand" href="index.html">' +
      '    <span class="brand-zh">' + s.labName.zh + '</span>' +
      '    <span class="brand-en">' + s.labName.en + '</span>' +
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
      '<div class="wrap">' +
      '  <span>' + s.footer.zh + '</span>' +
      '  <span>' + s.footer.en + '</span>' +
      '</div>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
  });
})();
