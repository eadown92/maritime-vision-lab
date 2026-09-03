document.addEventListener("DOMContentLoaded", function () {
  var s = window.SITE_DATA, r = window.RESEARCH_DATA, pubs = window.PUBLICATIONS_DATA;

  // Hero
  var hero = document.getElementById("hero");
  if (hero && s) {
    hero.innerHTML =
      '<div class="hero-inner">' +
      '  <h1>' + s.labName.zh + '</h1>' +
      '  <p class="hero-en">' + s.labName.en + '</p>' +
      '  <p class="lead">' + s.homeIntro.zh + '</p>' +
      '  <p class="lead-en">' + s.homeIntro.en + '</p>' +
      '</div>';
  }

  // Research preview
  var rp = document.getElementById("research-preview");
  if (rp && r) {
    rp.innerHTML = r.areas.map(function (a) {
      return '<div class="card">' +
        '<span class="role-tag">' + a.role + '</span>' +
        '<h3>' + a.name_zh + '</h3>' +
        '<p class="en">' + a.name_en + '</p>' +
        '<p class="desc">' + a.desc_zh + '</p>' +
        '</div>';
    }).join("");
  }

  // Recent publications (top 5 by declared order = newest first)
  var rpub = document.getElementById("recent-pubs");
  if (rpub && pubs) {
    var items = pubs.journalArticles.slice(0, 5);
    rpub.innerHTML = items.map(function (p) {
      return '<div class="pub-item">' +
        '<div class="pub-year">' + p.year + '</div>' +
        '<div class="pub-body">' +
        '  <div class="pub-title">' + p.title + '</div>' +
        '  <div class="pub-meta">' + p.venue + '</div>' +
        '</div></div>';
    }).join("");
  }
});
